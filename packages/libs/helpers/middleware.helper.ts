import { NextFunction, Request, Response } from 'express'
import redisHelper from './redis.helper'
import { Users } from '../models'

const checkLoginSession = async (req: Request, res: Response, next:NextFunction) => {
    try { 
        const user = req.user
        if (user) {
            throw new Error('422 The request was rejected...')
        }
        next()
    } catch (err) {
        next(err)
    }
}

const checkActiveSession = async (req : Request , res: Response, next: NextFunction) => {
    try {
        const currentSessionID = req.sessionID
        const user: any = req.user
        const activeSessionID = await redisHelper.get(`user:${user.email}`)
        if (!activeSessionID || currentSessionID !== activeSessionID) throw new Error('422 The request was reject...')
    } catch (err) {
        next(err)
    }
}

const setActiveSession = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body
    try { 
       const user = await Users.findOne({where: {
            username
       }}) 
       if (!user) throw new Error('404 user not found...')
        await redisHelper.set(`user:${user.email}`, req.sessionID)
       next()
    } catch (err) {
        next(err)
    }
}

export default {
    checkLoginSession,
    checkActiveSession,
    setActiveSession
}