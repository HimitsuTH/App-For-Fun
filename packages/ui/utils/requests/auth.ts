import axios from "axios";
import { setUser } from "ui/store/slices/user.slice";

import Alert, { LoadingAlert } from 'ui/common/Alert'

// ✅ เรียกผ่าน Next.js proxy ทั้งหมด (same-origin)
// → browser รับ session cookie จาก localhost:3000
// → request ถัดไปผ่าน proxy จะส่ง cookie กลับได้ถูกต้อง
const PROXY = '/api'

export const loginRequest = async (data: any, dispatch: any, router: any) => {
    try {
        LoadingAlert()
        const response = await axios.post(`${PROXY}/auth/login`, {
            "username": data.username,
            "password": data.password
        }, {
            withCredentials: true,
        });
        dispatch(setUser(response.data));
        router.replace('/');
    } catch (err: any){
        console.log('error---login-request--->',err)
        Alert({
            data: err?.response
        })
    }
}

export const logoutRequest = async (dispatch: any) => {
    try {
        await axios.post(`${PROXY}/auth/logout`, {}, {
            withCredentials: true,
        });
        console.log('Logout successful');
        dispatch(setUser(null));
    } catch (err) {
        console.error('Logout error:', err);
    }
};
