import { NextFunction, Request, Response } from "express";
import { Categories } from "../models";
import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";
import { ResponseError } from "../types/auth.type";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const data = await Categories.findAll()
        if (!data) {
            const error:ResponseError = new Error('404 Data not founded.')
            error.status = 404;
            throw error
        }

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
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        } 
        const { name, description } = req.body

        const duplicate = await Categories.findOne({
            where: {
                name: name.toLowerCase()
            }
        })

        if (duplicate) {
            const error:ResponseError = new Error('400 Duplicate Category.')
            error.status = 422;
            throw error
        }

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

const deleteCategorise = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        logger.info('------ADD Categories-----')
        const user: any = req.user
        const { items } = req.body
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        } 
        console.log(req.body)

        const itemsMap: {ids: number[], name: string[] } = {
            ids: [],
            name: []
        }

        items.map((data: {
            id: number,
            name: string
        }) => {
           itemsMap.ids.push(data?.id)
           itemsMap.name.push(data?.name)
        })
        console.log('itemIds0---->',itemsMap)
        const itemsDelated = await Categories.destroy({
            where: {
                id: itemsMap.ids,
                name: itemsMap.name
            },
            transaction
        })
        
        if (itemsDelated < 1) {
            const error:ResponseError = new Error('404 Category not found for deleted.')
            error.status = 404;
            throw error
        }

        console.log('itemsDelated---->',itemsDelated)

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
    deleteCategorise
}