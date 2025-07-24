import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import sequelize from "../helpers/sequelize.helper";
import { encryption } from "../helpers/crypto.helper";

import bcrypt from "bcrypt";
import Wallet from "../models/wallet.model";

const localRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transaction = await sequelize.transaction();

  const { email, username, password, role_id = 2 } = req.body;
  try {

    const existsEmail = await User.findOne({
      where: {
        email: encryption(email),
      },
    });
    if (existsEmail) {
      throw new Error("Email alredy exists.")
    }

    const sait = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, sait);

    const user = await User.create(
      {
        username: encryption(username),
        password: hashPassword,
        email: encryption(email),
        role_id: role_id,
        status: "active",
        invalid_password_time: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      { transaction }
    );

    await Wallet.create({
      user_id: user.id
    }, { transaction })

    await transaction.commit();
    next();
  } catch (err) {
    console.log(err)
    await transaction.rollback();
    next(err)
  }
};

export default {
  localRegister,
};
