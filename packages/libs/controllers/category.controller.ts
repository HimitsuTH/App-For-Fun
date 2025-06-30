import { NextFunction, Request, Response } from "express";
import { Categories } from "../models";
import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const data = await Categories.findAll()
        if (!data) throw new Error('404 Data not founded.')

        res.locals.categories = data
        next()
    } catch (err) {
        console.log(err)
        logger.error('Error getCategory can not get data...')
        next(err)
    }
}

const addCategories = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        logger.info('------ADD Categories-----')
        const user: any = req.user
        if (!user) throw new Error('422 The request was rejected.')
        const { name, description } = req.body

        const duplicate = await Categories.findOne({
            where: {
                name: name.toLowerCase()
            }
        })
        console.log(duplicate)
        if (duplicate) throw new Error('400 Duplicate Category.')

        await Categories.create({
            name,
            description,
            created_at: new Date()
        }, { transaction })

        await transaction.commit()
        next()
    } catch (err) {
        logger.info('------CAN NOT ADD CATEGORY-----')
        console.log(err)
        await transaction.rollback()
        next(err)
    }
}

export default {
    getCategory,
    addCategories,
}