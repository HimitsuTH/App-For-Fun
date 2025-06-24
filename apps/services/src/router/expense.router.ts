import express from 'express'
import expensesController from 'libs/controllers/expense.controller'


const router = express.Router()

router.get('/',expensesController.getExpense)
router.post('/',expensesController.addExpense)

export default router