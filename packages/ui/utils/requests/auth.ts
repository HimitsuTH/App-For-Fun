import axios from "axios";
import { setUser } from "ui/store/slices/user.slice";

import Alert, { LoadingAlert } from 'ui/common/Alert'
import Swal from "sweetalert2";

export const loginRequest = async (data: any, dispatch: any, router: any) => {
    try {
        LoadingAlert()
        const response = await axios.post('http://localhost:8000/auth/login', {
            "username": data.username,
            "password": data.password
        }, {
            withCredentials: true,
        });

        console.log('response--------------->', response);
        dispatch(setUser(response.data));
        router.replace('/');
    } catch (err: any){
        console.log('error---login-request--->',err)
        Alert({
            data: err?.response
        })
        // Swal.close()
    }
  
}



export const logoutRequest = async (dispatch:any) => {
    try {
        await axios.post('http://localhost:8000/auth/logout', {}, {
            withCredentials: true,
        });
        console.log('Logout successful');
        dispatch(setUser(null)); // Clear user state on logout
    } catch (err) {
        console.error('Logout error:', err);
    }
};
