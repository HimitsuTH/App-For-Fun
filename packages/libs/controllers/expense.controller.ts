import { NextFunction, Request, Response } from "express";
import { Expenses, Categories, Wallet } from "../models";
import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";
import { validateExpense } from "../utills/validate";
import { ResponseError } from "../types/auth.type";
import dayjs from "../helpers/dayjs.helper";


const getExpense = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const user: any = req.user
        console.log('GET Expense--------------->')
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        }
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
            ],
            order: [
                 ['created_at', 'DESC']
            ]
        })


        const expenses = data.map((d:any)=> {
            let date = dayjs(String(d.date));
            return {
                ...d.dataValues,
                month: date.format('MMM') 
            }
        })

        console.log('expenses----server--->',expenses)

        res.locals.expenses = expenses
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
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        }
        const { name, amount, description, category_id, date, type } = req.body

        console.log('req----------Expense--->',req.body)

        const checkCategorise = Categories.findOne({
            where: {
                name: category_id
            }
        })
        
        if (!checkCategorise) {
            const error:ResponseError = new Error('404 Categorise not found.')
            error.status = 404;
            throw error
        } 

        const validate = validateExpense(req.body)

        if (validate.status == 'error') throw new Error(`400 ${validate.message}`)

        await Expenses.create({
            name,
            amount,
            description: description ? description : "",
            category_id,
            user_id: user.id,
            date,
            type,
            created_at: new Date()
        }, { transaction })
        console.log('---------------------------------------------------------')
        console.log('user.wallet.balance----->',user)

        let balance = Number(user.wallet.balance)


        if ((balance - amount) < 0 && type !== 'INCOME') {
            const error:ResponseError = new Error('402 False Not Enough Money .')
            error.status = 402;
            throw error
        }
        
        await Wallet.update({
            balance: type === 'INCOME' ? balance + Number(amount) : balance - Number(amount)
        }, {
            where: {
                user_id: user.id
            },
            transaction
        })


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