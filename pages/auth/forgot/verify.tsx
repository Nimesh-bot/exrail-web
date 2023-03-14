import { Scanning } from 'iconsax-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import OtpInput from 'react18-input-otp'
import { PrimaryButton, PromiseButton } from '../../../components/Buttons'
import { ErrorToastMessages, SuccessToastMessages } from '../../../lib/toasts/ToastMessages'
import { useVerifyResetPasswordMutation } from '../../../redux/features/auth/authApi.slice'
import { selectUserData } from '../../../redux/features/user/user.slice'
import { useGetUserByEmailQuery } from '../../../redux/features/user/userApi.slice'
import { useAppSelector } from '../../../redux/hooks'

const Verify: NextPage = () => {
    const [otp, setOtp] = useState('')
    const [hasError, setHasError] = useState(false)
    
    const [email, setEmail] = useState('')
    
    const [verifyResetPassword, { isLoading }] = useVerifyResetPasswordMutation();
    const { data: userData } = useGetUserByEmailQuery(email);
    console.log(userData?.user._id)

    const router = useRouter()

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const tempemail = localStorage.getItem('email')
            setEmail(tempemail!)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(otp.length != 4) {
            setHasError(true)
            toast(
                'OTP must be 4 digits',
                {
                    icon: '🚨',
                    style: {
                        borderRadius: '2px',
                        background: '#EB1D36',
                        color: '#f7f7f7',
                    },
                }
            )
        }
        else {
            setHasError(false)
            verifyResetPassword({ _id: userData?.user._id, otp }).unwrap().then(() => {
                SuccessToastMessages('Verified. Please reset your password.')
                router.replace('/auth/forgot/password')
            }).catch((err) => {
                console.debug(err)
            })
        }
    }

    return (
        <div className='w-full flex flex-col justify-center items-center max-h-screen'>
            <div className='w-1/4 h-1/2 flex flex-col gap-y-8'>
                <Scanning 
                    size="63" 
                    color="#00E7FF" 
                    variant="Outline"
                    className='rotate-12 customDropShadow'
                />
            <div>
                <h1>OTP Verification</h1>
                <p>
                    {`Enter your 4 digit OTP code to verify your account. If you haven't received the code, please check your spam folder.`}
                </p>
            </div>

            <OtpInput 
                value={otp} 
                onChange={
                    (enteredValue: string) => setOtp(enteredValue)
                } 
                numInputs={4} 
                containerStyle={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                hasErrored={hasError}
                errorStyle={{
                    color: '#EB1D36',
                    fontSize: '1.5rem',
                }}
                inputStyle={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    backgroundColor: '#1d242d',
                    border: '1px solid #eeeeee15',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    color: '#00E7FF',
                }}
            />
            {
                isLoading ?
                <PromiseButton 
                    text=''
                />
                :
                <PrimaryButton 
                    text='Verify'
                    onClick={onSubmit}
                />
            }

            </div>
        </div>
    )
}

export default Verify
