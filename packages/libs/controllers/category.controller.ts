import { NextFunction, Request, Response } from "express";
import { Categories, Expenses } from "../models";
// import logger from "../helpers/winston.helper";
import sequelize from "../helpers/sequelize.helper";
import { ResponseError } from "../types/auth.type";
import { Op } from "sequelize";
import dayjs from "../helpers/dayjs.helper";

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Categories.findAll()
        if (!data) {
            const error:ResponseError = new Error('404 Data not founded.')
            error.status = 404; throw error
        }
        res.locals.categories = data
        next()
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const addCategories = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        const user: any = req.user
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422; throw error
        }
        const { name, description } = req.body
        const duplicate = await Categories.findOne({ where: { name: name.toLowerCase() } })
        if (duplicate) {
            const error:ResponseError = new Error('400 Duplicate Category.')
            error.status = 422; throw error
        }
        await Categories.create({ name, description, created_at: new Date() }, { transaction })
        await transaction.commit()
        next()
    } catch (err) {
        await transaction.rollback()
        next(err)
    }
}

const deleteCategorise = async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await sequelize.transaction()
    try {
        const user: any = req.user
        const { items } = req.body
        if (!user) {
            const error:ResponseError = new Error('422 The request was rejected.')
            error.status = 422; throw error
        }
        const itemsMap: {ids: number[], name: string[]} = { ids: [], name: [] }
        items.map((data: { id: number, name: string }) => {
            itemsMap.ids.push(data?.id)
            itemsMap.name.push(data?.name)
        })
        const itemsDeleted = await Categories.destroy({
            where: { id: itemsMap.ids, name: itemsMap.name }, transaction
        })
        if (itemsDeleted < 1) {
            const error:ResponseError = new Error('404 Category not found for deleted.')
            error.status = 404; throw error
        }
        await transaction.commit()
        next()
    } catch (err) {
        await transaction.rollback()
        next(err)
    }
}

// ✅ ตั้ง budget limit ต่อหมวดหมู่
const updateBudgetLimit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { budget_limit } = req.body
        const category = await Categories.findByPk(id)
        if (!category) {
            const error:ResponseError = new Error('404 Category not found.')
            error.status = 404; throw error
        }
        await category.update({ budget_limit: budget_limit ?? null })
        next()
    } catch (err) {
        next(err)
    }
}

// ✅ ดึง budget summary เดือนนี้ (ใช้จริง vs limit)
const getBudgetSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: any = req.user
        const startOfMonth = dayjs().startOf('month').toDate()
        const endOfMonth = dayjs().endOf('month').toDate()

        const categories = await Categories.findAll()

        const expenses = await Expenses.findAll({
            where: {
                user_id: user.id,
                type: 'EXPENSE',
                date: { [Op.between]: [startOfMonth, endOfMonth] }
            }
        }) as any[]

        // รวมยอดใช้จริงต่อ category
        const spentMap: Record<number, number> = {}
        expenses.forEach((e: any) => {
            spentMap[e.category_id] = (spentMap[e.category_id] || 0) + Number(e.amount)
        })

        const budgets = (categories as any[]).map(c => ({
            id: c.id,
            name: c.name,
            budget_limit: c.budget_limit ? Number(c.budget_limit) : null,
            spent: spentMap[c.id] || 0,
            percent: c.budget_limit
                ? Math.min(Math.round(((spentMap[c.id] || 0) / Number(c.budget_limit)) * 100), 100)
                : null,
            over: c.budget_limit ? (spentMap[c.id] || 0) > Number(c.budget_limit) : false,
        }))

        res.locals.budgets = budgets
        next()
    } catch (err) {
        next(err)
    }
}

export default { getCategory, addCategories, deleteCategorise, updateBudgetLimit, getBudgetSummary }
