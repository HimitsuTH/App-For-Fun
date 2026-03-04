import axios from "axios";
import Swal from "sweetalert2";
import Alert, { LoadingAlert } from 'ui/common/Alert'

const PROXY = '/api'

export const createExpense = async (data: any, user: any, dispatch: any, router: any) => {
    try {
        LoadingAlert()
        await axios.post(`${PROXY}/expense`, {
            name: data.name, description: data.description,
            amount: data.amount, category_id: data.category.id,
            date: data.date, user_id: user.id, type: data.type.value
        }, { withCredentials: true });
        Swal.close()
        router.replace('/expenses');
    } catch (err: any) {
        Alert({ data: err?.response })
    }
}

// ✅ แก้ไข expense
export const updateExpense = async (id: number, data: any, router: any) => {
    try {
        LoadingAlert()
        await axios.put(`${PROXY}/expense/${id}`, {
            name: data.name, description: data.description,
            amount: data.amount, category_id: data.category_id,
            date: data.date, type: data.type
        }, { withCredentials: true });
        Swal.close()
        router.replace('/expenses');
    } catch (err: any) {
        Alert({ data: err?.response })
    }
}

// ✅ ลบ expense
export const deleteExpense = async (id: number) => {
    try {
        LoadingAlert()
        await axios.delete(`${PROXY}/expense/${id}`, { withCredentials: true });
        Swal.close()
        return true
    } catch (err: any) {
        Alert({ data: err?.response })
        return false
    }
}

export const getExpenses = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(`${PROXY}/expense`, { withCredentials: true })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
