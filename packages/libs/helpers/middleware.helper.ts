import { NextFunction, Request, Response } from 'express'

const checkLoginSession = async (req: Request, res: Response, next:NextFunction) => {
    try { 
        const user = req.user
        if (user) {
            throw new Error('test user has')
        }
        next()
    } catch (err) {
        next(err)
    }
}

export default {
    checkLoginSession,
}