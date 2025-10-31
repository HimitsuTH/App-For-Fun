import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../types/auth.type";
import logger from "../helpers/winston.helper";

import { Wallet } from "../models";

const getWallet = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const user: any = req.user
        const { user_id } = req.body
        console.log('GET Expense--------------->')
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        }

        console.log('user.id : ', user.id, '-----USER_ID: ', user_id, ';;;;',req.body)
        if (user.id !== user_id) {
            const error:ResponseError = new Error('422 User must match')
            error.status = 422;
            throw error
        }

        const data = await Wallet.findOne({
            where: {
                user_id: user_id
            }
        })
        
        if (!data) {
            const error:ResponseError = new Error('404 Wallet not founded.')
            error.status = 404;
            throw error
        }

        res.locals.wallet = data
        next()
    } catch (err) {
        logger.error(err)
        next(err)
    }
}


export default {
    getWallet
}