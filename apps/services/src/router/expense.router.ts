import express from 'express'
import expensesController from 'libs/controllers/expense.controller'


const router = express.Router()

router.get('/', expensesController.getExpense,
     async (req, res, next) => {
        res.locals.body = {
            res_code: '200',
            res_desc: 'success',
            expenses: res.locals.expenses
        }
        res.json(res.locals.body)
        next()
    },
)
router.post('/', expensesController.addExpense,
     async (req, res, next) => {
        res.locals.body = {
            res_code: '201',
            res_desc: 'success',
        }
        res.json(res.locals.body)
        next()
    },
)

export default router