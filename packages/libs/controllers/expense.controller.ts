import { NextFunction, Request, Response } from "express";
import { Expenses, Categories } from "../models";
import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";
import { validateExpense } from "../utills/validate";

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
                    model: Categories,
                    as: 'categories',
                    attributes: [
                        'id',
                        'name',
                        'description'
                    ]
                }
            ]
        })

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
        const { name, amount, description, category_id, date, type } = req.body

        const checkCategorise = Categories.findOne({
            where: {
                id: category_id
            }
        })
        
        if (!checkCategorise) throw new Error('404 Categorise not found.')

        const validate = validateExpense(req.body)

        if (validate.status == 'error') throw new Error(`400 ${validate.message}`)

        await Expenses.create({
            name,
            amount,
            description,
            category_id,
            user_id: user.id,
            date,
            type,
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