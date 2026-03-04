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
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        }
        const data = await Expenses.findAll({
            where: { user_id: user.id },
            include: [{
                model: Categories,
                as: 'categories',
                attributes: ['id', 'name', 'description']
            }],
            order: [['created_at', 'DESC']]
        })

        const expenses = data.map((d:any) => {
            let date = dayjs(String(d.date));
            return { ...d.dataValues, month: date.format('MMM') }
        })

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
        const user: any = req.user
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422;
            throw error
        }
        const { name, amount, description, category_id, date, type } = req.body
        const validate = validateExpense(req.body)
        if (validate.status == 'error') throw new Error(`400 ${validate.message}`)

        await Expenses.create({
            name, amount,
            description: description ? description : "",
            category_id, user_id: user.id, date, type,
            created_at: new Date()
        }, { transaction })

        let balance = Number(user.wallet.balance)
        if ((balance - amount) < 0 && type !== 'INCOME') {
            const error:ResponseError = new Error('402 False Not Enough Money .')
            error.status = 402;
            throw error
        }

        await Wallet.update({
            balance: type === 'INCOME' ? balance + Number(amount) : balance - Number(amount)
        }, { where: { user_id: user.id }, transaction })

        await transaction.commit()
        next()
    } catch (err) {
        await transaction.rollback()
        next(err)
    }
}

// ✅ Feature: แก้ไข expense
const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        const user: any = req.user
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422; throw error
        }

        const { id } = req.params
        const { name, amount, description, category_id, date, type } = req.body

        const existing = await Expenses.findOne({ where: { id, user_id: user.id } }) as any
        if (!existing) {
            const error:ResponseError = new Error('404 Expense not found.')
            error.status = 404; throw error
        }

        // คืน balance เก่าก่อน แล้วค่อยหักใหม่
        const oldAmount = Number(existing.amount)
        const oldType = existing.type
        const newAmount = Number(amount)

        let balance = Number(user.wallet.balance)
        // undo old
        balance = oldType === 'INCOME' ? balance - oldAmount : balance + oldAmount
        // apply new
        if ((balance - newAmount) < 0 && type !== 'INCOME') {
            const error:ResponseError = new Error('402 Not Enough Money.')
            error.status = 402; throw error
        }
        balance = type === 'INCOME' ? balance + newAmount : balance - newAmount

        await existing.update({ name, amount: newAmount, description, category_id, date, type }, { transaction })
        await Wallet.update({ balance }, { where: { user_id: user.id }, transaction })

        await transaction.commit()
        res.locals.expense = existing
        next()
    } catch (err) {
        await transaction.rollback()
        next(err)
    }
}

// ✅ Feature: ลบ expense
const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        const user: any = req.user
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422; throw error
        }

        const { id } = req.params
        const existing = await Expenses.findOne({ where: { id, user_id: user.id } }) as any
        if (!existing) {
            const error:ResponseError = new Error('404 Expense not found.')
            error.status = 404; throw error
        }

        // คืน balance
        const amount = Number(existing.amount)
        let balance = Number(user.wallet.balance)
        balance = existing.type === 'INCOME' ? balance - amount : balance + amount

        await existing.destroy({ transaction })
        await Wallet.update({ balance }, { where: { user_id: user.id }, transaction })

        await transaction.commit()
        next()
    } catch (err) {
        await transaction.rollback()
        next(err)
    }
}

export default { addExpense, getExpense, updateExpense, deleteExpense }
