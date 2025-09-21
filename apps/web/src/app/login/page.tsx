'use client'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from "ui/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "ui/components/Input";

import { TSignInSchema, signInSchema } from 'ui/types/auth/type'
import { loginRequest , logoutRequest } from 'ui/utils/requests/auth'
// import Router from 'next/router'



const Login = () => {
    const { data } = useAppSelector(state => state.user)
    console.log('user---> web test ---->', data)
    const user = data
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [isInitialized, setIsInitialized] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    useEffect(() => {
          axios.get('/api/profile')
            .then((res) => {
                router.replace('/')
            })
            .catch((err: any) => {
                console.log(err)
                setIsInitialized(true)
            })
    }, []);

    const onSubmit = (data: TSignInSchema) => {
        loginRequest(data, dispatch,router) 
    }

    const onLogout = () => {
        logoutRequest(dispatch)
    };

    if (!isInitialized) return null

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px' }}>Login/Logout Test</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Input field="username" register={register} errors={errors}/>
                <Input field="password" type="password" register={register} errors={errors}/>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                >
                    Login
                </button>
            </form>

            <button
                onClick={onLogout}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
            >
                Logout
            </button>

            <button onClick={() => router.replace('/receipts')}>
                Navigate to Test
            </button>
        </div>
    );
};

export default Login;