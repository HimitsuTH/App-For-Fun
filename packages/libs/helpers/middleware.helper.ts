import { NextFunction, Request, Response } from 'express'
import redisHelper from './redis.helper'
import { User, Role } from '../models'
import { Op } from "sequelize";
import logger from './winston.helper';
import { encryption } from './crypto.helper';

const userAuth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('testt------auth------->')
    console.log('0-------auth---------------------------------_>',req.user)
    if (!req.user) throw new Error('401 unauthenlize...')
    next()
  } catch (err) {
    next(err)
  }
}

const checkLoginSession = async (req: Request, res: Response, next:NextFunction) => {
    try { 
        const user = req.user
        console.log('user------>',user)
        if (user) throw new Error('422 The request was rejected...')
        next()
    } catch (err) {
        next(err)
    }
}

const checkActiveSession = async (req : Request , res: Response, next: NextFunction) => {
    try {
        const currentSessionID = req.sessionID
        const user: any = req.user

        console.log('checkActiveSession-->',user, currentSessionID)
        if (!user) throw new Error('404 user not found...')
        const activeSessionID = await redisHelper.get(`userM:${user.username}`)
        if (!activeSessionID || currentSessionID !== activeSessionID) throw new Error('422 The request was reject...')
        next()
    } catch (err) {
        next(err)
    }
}

const setActiveSession = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body
    try { 

       const _username = encryption(username)
       const user = await User.findOne({
            where: {
                [Op.or]: [{ username: _username }, { email: _username }],
            },
       }) 

       if (!user) throw new Error('404 user not found...')
       console.log(`userM:${user.username}`, req.sessionID)
       logger.info('-------------------setActiveSession-------------------------')
       await redisHelper.set(`userM:${user.username}`, req.sessionID)
       next()
    } catch (err) {
        next(err)
    }
}

const checkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('===================== CHECK ROLE =====================')
        const user: any = req.user
        if (!user) throw new Error('422 The request was rejected...')

        const role = user.roles.name
        if (!role) throw new Error('404 user not found...')

        if (role.name !== "admin") {
            throw new Error('422 The request was rejected...')
        }
        next()
    } catch (err) {
        next(err)
    }
    
    
}

export default {
    checkLoginSession,
    checkActiveSession,
    setActiveSession,
    checkRole,
    userAuth
}