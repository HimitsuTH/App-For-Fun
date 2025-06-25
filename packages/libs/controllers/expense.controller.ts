import { NextFunction, Request, Response } from "express";
import { Expenses, Category } from "../models";
import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";

const getExpense = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const user: any = req.user
        if (!user) throw new Error('422 The request was rejected.')
        const data = await Expenses.findAll({
            where: {
                user_id: user.id
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: [
                        'id',
                        'name',
                        'description'
                    ]
                }
            ]
        })
        console.log('---------------------------------------')
        console.log(data)

        res.locals.expenses = data
        next()
    } catch (err) {
        logger.error(err)
        next(err)
    }
}

const addExpense = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        logger.info('------ADD EXPENSE-----')
        const user: any = req.user
        if (!user) throw new Error('422 The request was rejected.')
        const { name, amount, description, category_id, date } = req.body

        await Expenses.create({
            name,
            amount,
            description,
            category_id,
            user_id: user.id,
            date,
            created_at: new Date()
        }, { transaction })

        await transaction.commit()
        next()
    } catch (err) {
        logger.info('------CAN NOT ADD EXPENSE-----',err)
        await transaction.rollback()
        next(err)
    }
}

export default {
    addExpense,
    getExpense,
}