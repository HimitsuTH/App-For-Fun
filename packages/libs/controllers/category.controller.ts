import { NextFunction, Request, Response } from "express";
import { Category } from "../models";
import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const data = await Category.findAll()
        console.log('---------------------------------------')
        console.log(data)

        res.locals.category = data
        next()
    } catch (err) {
        logger.error(err)
    }
}

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        logger.info('------ADD CATEGORY-----')
        const user: any = req.user
        if (!user) throw new Error('422 The request was rejected.')
        const { name, description } = req.body

        await Category.create({
            name,
            description,
            created_at: new Date()
        }, { transaction })

        await transaction.commit()

    } catch (err) {
        logger.info('------CAN NOT ADD CATEGORY-----',err)
        await transaction.rollback()
    }
}

export default {
    getCategory,
    addCategory,
}