import { DirectboxNotif } from 'iconsax-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FlatButton, PrimaryButton, PromiseButton } from '../../../components/Buttons'
import { TextInput } from '../../../components/Inputs'
import { useResetPasswordMutation } from '../../../redux/features/auth/authApi.slice'

const ForgotPassword: NextPage = () => {
    const [email, setEmail] = useState('')
    const [hasError, setHasError] = useState('')
    const router = useRouter()

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const onSubmit = (e: InputEvent) => {
        e.preventDefault();

        if(email === '' || (!/\S+@\S+\.\S+/.test(email)) ) {
            setHasError(email === '' ? 'Email is required' : (/\S+@\S+\.\S+/.test(email) ? 'Invalid' : 'Please provide valid email'))
        }
        else {
            setHasError('')
            if(typeof window !== 'undefined') localStorage.setItem('email', email)
            resetPassword({ email })
            router.push('/auth/forgot/verify')
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center max-h-screen'>
            <div className='w-1/4 h-1/2 flex flex-col gap-y-8'>
            <DirectboxNotif 
                size="63" 
                color="#00E7FF" 
                variant="Outline"
                className='rotate-12 customDropShadow'
            />
            <div>
                <h1>Verify Email</h1>
                <p>
                    Provide your email address and we will send you a link to reset your password. This is necessary to ensure that only you can reset your password.
                </p>
            </div>

            <TextInput 
                label=''
                value={email}
                type='email'
                disabled={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value)
                }}
                additionalClass={hasError ? 'border border-red-500' : ''}
                error={hasError}
            />

            {
                isLoading ?
                <PromiseButton 
                    text=''
                />
                :
                <div className='flex justify-between'>
                    <PrimaryButton 
                        text='Verify'
                        onClick={onSubmit}
                    />
                    <FlatButton 
                        text='Back to Login'
                        onClick={() => {
                            router.push('/auth/login')
                        }}
                    />
                </div>
            }

            </div>
        </div>
    )
}

export default ForgotPassword