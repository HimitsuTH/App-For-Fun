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
  const { email, username, password } = req.body;
  try {
    const hasEmail = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (hasEmail) throw new Error("Email alredy exists.");

    const sait = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, sait);

    await Users.create(
      {
        username: username,
        password: hashPassword,
        email: email,
      },
      { transaction }
    );

    await transaction.commit();
    next();
  } catch (err) {
    await transaction.rollback();
  }
};

export default {
  localRegister,
};
