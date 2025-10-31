import { NextFunction, Request, Response } from "express";
import redisHelper from "./redis.helper";
import { User, Role } from "../models";
import { Op } from "sequelize";
import logger from "./winston.helper";
import { encryption } from "./crypto.helper";

import { ResponseError } from "../types/auth.type";


const userAuth = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("testt------auth------->");
      console.log("0-------auth---------------------------------_>", req.user);
      if (!req.user) {

        const error: ResponseError = new Error("401 unauthenlize...");
        error.status = 400;
      }
      next();
    } catch (err) {
      next(err);
    }
  };

const checkLoginSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    console.log("user------>", user);
    if (user) {
        const error: ResponseError = new Error("422 The request was rejected.1..");
        error.status = 422;
        throw error
    }
    next();
  } catch (err) {
    next(err);
  }
};

const checkActiveSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentSessionID = req.sessionID;
    const user: any = req.user;
    console.log('-----checkActiveSession-',user)
    if (!user) {
      
        const error: ResponseError = new Error("404 user not found..2.");
        error.message = "404 user not found..2."
        error.status = 404;
        throw error
    }
    console.log("---user.username----user.username----", user.username);
    const _username = encryption(user.username);
    const activeSessionID = await redisHelper.get(`userM:${_username}`);
    console.log(
      "checkActiveSession-->",
      user,
      currentSessionID,
      activeSessionID
    );
    if (!activeSessionID || currentSessionID !== activeSessionID){
        const error: ResponseError = new Error("422 The request was rejected.2..");
        error.status = 422;
        throw error
    }
      
    next();
  } catch (err) {
    next(err);
  }
};

const setActiveSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  try {
    const _username = encryption(username);
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: _username }, { email: _username }],
      },
    });

    if (!user){
        const error: ResponseError = new Error("404 user not found..1.");
        error.status = 404;
        throw error
    }
    console.log(`userM:${user.username}`, req.sessionID);
    logger.info("-------------------setActiveSession-------------------------");
    await redisHelper.set(`userM:${user.username}`, req.sessionID);
    next();
  } catch (err) {
    next(err);
  }
};

const checkRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("===================== CHECK ROLE =====================");
    const user: any = req.user;
    if (!user) {
        const error: ResponseError = new Error("422 The request was rejected.3..");
        error.status = 422;
        throw error
    } 

    console.log('user.roles--->',user.roles)
    const role = user.roles.name;
    if (!role){
        const error: ResponseError = new Error("404 user not found...");
        error.status = 404;
        throw error
    }

    if (role !== "admin") {
        const error: ResponseError = new Error("422 The request was rejected.4..");
        error.status = 422;
        throw error
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  checkLoginSession,
  checkActiveSession,
  setActiveSession,
  checkRole,
  userAuth,
};
