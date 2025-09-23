import { ExpenseType } from "../constants/type"
import { isNumericDecimalMaxTwoDigits } from 'ui/utils/regex.util'
export const validateExpense = (item:ExpenseType) => {
    if (!item.name) return { message: "Request Expense name." ,status: 'error' }
    if (!item.amount) return { message: "Request Expense amount." ,status: 'error' }
    if (!isNumericDecimalMaxTwoDigits.test(String(item.amount))) return { message: "inValid type of amount." ,status: 'error' }
    return { message: "Success" , status: "sucess" }
}