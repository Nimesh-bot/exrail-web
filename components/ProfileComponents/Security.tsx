import React, { useState } from 'react'
import { ErrorToastMessages, SuccessToastMessages } from '../../lib/toasts/ToastMessages';
import { unauthorize } from '../../redux/features/auth/auth.slice';
import { useChangePasswordMutation, useGetUserDetailsQuery } from '../../redux/features/user/userApi.slice';
import { useAppDispatch } from '../../redux/hooks';
import { PrimaryButton, PromiseButton } from '../Buttons';
import { PasswordInput } from '../Inputs';

type typePassword = {
    password: string,
    confirmPassword: string
}
type typeHidden = {
    password: boolean,
    confirmPassword: boolean
}

const Security = () => {
    const { data } = useGetUserDetailsQuery();

    const [values, setValues] = useState<typePassword>({
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<typeHidden>({
        password: false,
        confirmPassword: false
    })
    const [hidden, setHidden] = useState<typeHidden>({
        password: true,
        confirmPassword: true
    })

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        const passwordValid = passwordRegex.test(values.password)
        
        if(!passwordValid) {
            setErrors({
                ...errors,
                password: true
            })
        }
        else if(values.password !== values.confirmPassword) {
            setErrors({
                password: false,
                confirmPassword: true
            })
        }
        else {
            setErrors({
                password: false,
                confirmPassword: false
            })
            console.log({
                userId: data?.user?._id!,
                password: values.password
            })
            changePassword({
                userId: data?.user?._id!,
                password: values.password
            }).unwrap().then(() => {
                setValues({
                    password: '',
                    confirmPassword: ''
                })
                SuccessToastMessages("Your password has been updated successfully. You will be logged out in 5 seconds.")
                setTimeout(() => {
                    dispatch(unauthorize());
                }, 5000)
            }).catch((err: any) => {
                console.log(err)
                if(err.originalStatus === 404) {
                    ErrorToastMessages("Request failed. Please contact support.")
                }
                else if(err.originalStatus === 401) {
                    ErrorToastMessages("Your session has expired. Please login again.")
                    dispatch(unauthorize());
                }
                else {
                    ErrorToastMessages("Something went wrong.")
                }
            })
        }
    }

    return (
        <div className='space-y-8'>
            <div>
                <h2>Security</h2>
                <p>We suggest you change your password frequently for better security</p>
            </div>
            <form className='space-y-8'>
                    <div className='w-full flex flex-wrap gap-x-8'>
                        <div className='w-full md:w-1/3 lg:w-1/5'>
                            <label htmlFor='firstName' className='opacity-100'>New Password</label>
                            <PasswordInput
                                show={hidden.password}
                                value={values.password}
                                onChange={(e) => setValues({...values, password: e.target.value})}
                                setShow={() => setHidden({...hidden, password: !hidden.password})}
                            />
                            <p className={`mt-2 ${errors.password && 'text-red-500'}`}>At least 8 characters, 1 uppercase, 1 lowercase and 1 special character</p>
                        </div>
                        <div className='w-full md:w-1/3 lg:w-1/5'>
                            <label htmlFor='firstName' className='opacity-50'>Email</label>
                            <PasswordInput
                                show={hidden.confirmPassword}
                                value={values.confirmPassword}
                                onChange={(e) => setValues({...values, confirmPassword: e.target.value})}
                                setShow={() => setHidden({...hidden, confirmPassword: !hidden.confirmPassword})}
                            />
                            <p className={`mt-2 ${errors.confirmPassword && 'text-red-500'}`}>
                                {
                                    errors.confirmPassword ?
                                    'Passwords do not match' :
                                    'Re-enter your password'
                                }
                            </p>
                        </div>
                    </div>
                    <div className='space-x-8'>
                        {
                            isLoading ? 
                            <PromiseButton
                                text=''
                            /> 
                            :
                            <PrimaryButton
                                text='Update'
                                onClick={handleSubmit}
                            />
                        }    
                    </div>
                </form>
        </div>
    )
}

export default Security