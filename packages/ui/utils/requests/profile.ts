import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'
// import Router from 'next/router'
// import Swal from 'sweetalert2'

interface TypeUser {
    username: string
    email: string
}

export const getProfile = (): Promise<TypeUser> => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/profile', {
            withCredentials: true, 
        }).then(({ data }) => {
            console.log('Profile fetch successful:', data);
            resolve(data);
        }).catch((err) => {
            console.error('Profile fetch error:', err.response ? err.response.data : err.message);
            reject(err);
        });
    });
};