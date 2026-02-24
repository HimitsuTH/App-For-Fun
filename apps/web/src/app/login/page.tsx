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
        control
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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '100%' }}>
            <h2 style={{ marginBottom: '20px' }}>Login/Logout Test</h2>
           <form onSubmit={handleSubmit(onSubmit)} style={{
                marginBottom: '30px', /* Increased spacing below the form */
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px', /* Padding inside the form container */
                backgroundColor: '#ffffff', /* White background for the form area */
                borderRadius: '12px', /* Rounded corners for a softer look */
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', /* Subtle, modern shadow */
                maxWidth: '350px', /* Set a max-width for the form */
                margin: '0 auto' /* Center the form horizontally */
            }}>
                <Input field="username" register={register} errors={errors} control={control} placeholder={'xxx@xxx.xxx'}/>
                <Input field="password" type="password" register={register} errors={errors} control={control}/>

                <button
                    type="submit"
                    style={{
                        width: '100%', /* Full width button */
                        padding: '12px 0', /* Vertical padding */
                        fontSize: '18px',
                        fontWeight: '600', /* Slightly bolder text */
                        backgroundColor: '#007bff', /* A modern blue */
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px', /* Nicely rounded corners */
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', /* Shadow for lift */
                        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#0056b3'; /* Darker blue on hover */
                        e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#007bff';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                    }}
                >
                    Sign In
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

            <button onClick={() => router.replace('/expenses')}>
                Navigate to Test
            </button>
        </div>
    );
};

export default Login;