import { ExpenseType } from "../constants/type"
export const validateExpense = (item:ExpenseType) => {
    if (!item.name) return { message: "Request Expense name." ,status: 'error' }
    if (!item.amount) return { message: "Request Expense amount." ,status: 'error' }
    if (typeof item.amount !== 'number') return { message: "inValid type of amount." ,status: 'error' }
    return { message: "Success" , status: "sucess" }
}