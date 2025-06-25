import { NextFunction, Request, Response } from "express";
import { Users } from "../models";
import sequelize from "../helpers/sequelize.helper";

import bcrypt from "bcrypt";

const localRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();

  const { email, username, password, role_id = 2 } = req.body;
  try {
    const existsEmail = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (existsEmail) {
      throw new Error("Email alredy exists.")
    }

    const sait = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, sait);

    await Users.create(
      {
        username: username,
        password: hashPassword,
        email: email,
        role_id: role_id,
        created_at: new Date()
      },
      { transaction }
    );

    await transaction.commit();
    next();
  } catch (err) {
    await transaction.rollback();
    next(err)
  }
};

export default {
  localRegister,
};
