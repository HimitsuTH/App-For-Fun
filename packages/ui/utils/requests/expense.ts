import axios from "axios";
// import { setUser } from "ui/store/slices/user.slice";
import Swal from "sweetalert2";

import Alert, { LoadingAlert } from 'ui/common/Alert'


export const createExpense = async (data: any, user:any, dispatch: any, router: any) => {
    try {
        LoadingAlert()
        const response = await axios.post('http://localhost:8000/expense', {
            "name": data.name,
            "description": data.description,
            "amount": data.amount,
            "category_id": data.category.id,
            "date": data.date,
            "user_id": user.id,
            "type": data.type.value
        }, {
            withCredentials: true,
        });

        console.log('test--response-createExpense->',response)

        // dispatch(setUser(response.data));
        Swal.close()
        router.replace('/expenses');
    } catch (err: any){
        console.log('error---login-request--->',err)
        Alert({
            data: err?.response
        })
        // Swal.close()
    }
}

export const getExpenses = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/expense', {
        withCredentials: true,
    })
      .then((res) => {
        console.log('get Expese--->',res)
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}