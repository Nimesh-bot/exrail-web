/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLoginMutation } from '../../redux/features/auth/authApi.slice'
import { useGetExpensesQuery } from '../../redux/features/expenses/expensesApi.slice'
import { useAppSelector } from '../../redux/hooks'
import { FlatButton, PrimaryButton, PromiseButton } from '../Buttons'
import { PasswordInput, TextInput } from '../Inputs'

interface ILoginProps {
    handleSwitch: () => void
}

const LoginForn = ({ handleSwitch }: ILoginProps) => {
    const textStyle = 'text-light dark:text-dark'
    const [show, setShow] = useState(false)
    const { isLoggedIn } = useSelector((state: any) => state.auth)
    const router = useRouter();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (e: any, key: string) => {
        setValues({
            ...values, [key]: e.target.value
        })
        setErrors({
            ...errors, [key]: ''
        })
    }

    useEffect(() => {
        if(isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn])
    
    const [login, { isLoading, error }] = useLoginMutation();
    const onSubmit = (e: InputEvent) => {
        e.preventDefault();

        if(values.email === '' || (!/\S+@\S+\.\S+/.test(values.email)) || values.password === '') {
            setErrors({
                ...errors,
                email: values.email === '' ? 'Email is required' : (/\S+@\S+\.\S+/.test(values.email) ? 'Invalid' : 'Please provide valid email'),
                password: values.password === '' ? 'Password is required' : '',
            })
        }
        else {
            login(values)
        }
    }

    return (
        <div className='h-full bg-dark dark:bg-light p-8 flex flex-col gap-y-16 justify-between'>
            <div>
                <h1 className={textStyle}>Welcome Back</h1>
                <p className={textStyle}>Update your daily expenses and never miss on your calculations</p>
            </div>
            <form className='flex flex-col gap-y-4'>
                <TextInput 
                    label='Email'
                    value={values.email}
                    type='email'
                    disabled={false}
                    onChange={(e: any) => onChange(e, 'email')}
                    placeholder='example@gmail.com'
                    additionalClass={`text-light dark:text-dark bg-inputBgDark dark:bg-inputBgLight ${errors.email && 'border border-red-400'}`}
                    additionalLabelClass='text-light dark:text-dark'
                    error={errors.email}
                />
                <PasswordInput
                    label='Password'
                    value={values.password}
                    disabled={false}
                    onChange={(e: any) => onChange(e, 'password')}
                    placeholder='********'
                    additionalClass={`text-light dark:text-dark bg-inputBgDark dark:bg-inputBgLight ${errors.password && 'border border-red-400'}`}
                    additionalLabelClass='text-light dark:text-dark'
                    show={show}
                    setShow={() => setShow((prev) => !prev)}
                    error={errors.password}
                />
                <FlatButton text='Forgot Password?' additionalclassName='text-primary dark:text-primary-500' onClick={() => router.push('/auth/forgot')} />
                {
                    isLoading ?
                    <PromiseButton 
                        text=''
                        additionalclassName='mt-4'
                    />
                    :
                    <PrimaryButton 
                        text='Login' 
                        additionalclassName='mt-4'   
                        onClick={onSubmit}
                    />
                }
            </form>
            
            <p className={textStyle}>
                {"Don't have an account yet? "} 
                <span className='text-primary dark:text-primary-800 font-semibold cursor-pointer hover:text-primary' onClick={handleSwitch}>
                    Sign Up
                </span>
            </p>
        </div>
      )
}

export default LoginForn