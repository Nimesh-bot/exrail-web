import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import { Lock } from 'iconsax-react'
import { PasswordInput } from '../../../components/Inputs'
import { useChangePasswordMutation } from '../../../redux/features/auth/authApi.slice'
import { PrimaryButton, PromiseButton } from '../../../components/Buttons'
import { useRouter } from 'next/router'
import { useGetUserByEmailQuery } from '../../../redux/features/user/userApi.slice'

const Password: NextPage = () => {
    const [show, setShow] = useState({
        new: false,
        confirm: false
    })
    const [values, setValues] = useState({
        new: '',
        confirm: ''
    })
    const [hasError, setHasError] = useState({
        new: '',
        confirm: ''
    })
    
    const router = useRouter()

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const [email, setEmail] = useState('')

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const tempemail = localStorage.getItem('email')
            setEmail(tempemail!)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { data: userData } = useGetUserByEmailQuery(email);

    const onSubmit = (e: InputEvent) => {
        e.preventDefault();

        if(values.new === '' || values.confirm === '' || values.new !== values.confirm) {
            setHasError({
                new: values.new === '' ? 'Please enter your new password' : '',
                confirm: values.confirm === '' ? 'Please re-enter your new password' : values.new !== values.confirm ? 'Passwords do not match' : ''
            })
        }
        else {
            try {
                changePassword({ userId: userData?.user._id ,password: values.new })
                router.push('/auth/login')
                if(typeof window !== 'undefined') {
                    localStorage.removeItem('email')
                }
                setHasError({
                    new: '',
                    confirm: ''
                })
            }
            catch(err) {
                console.debug(err)
            }
        }
    }

    useEffect(() => {
        console.log(userData?.user.passResetVerified)
        if(userData?.user.passResetVerified === false) {
            router.back()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='w-full flex flex-col justify-center items-center max-h-screen'>
            <div className='w-1/4 h-1/2 flex flex-col gap-y-8'>
                <Lock 
                    size="63" 
                    color="#00E7FF" 
                    variant="Outline"
                    className='rotate-12 customDropShadow'
                />
                <div>
                    <h1>New Password</h1>
                    <p>
                        Create a new strong and secure password for your account that you can remember.
                    </p>
                </div>

                <form className='flex flex-col gap-y-4'>
                    <PasswordInput
                        label=''
                        show={show.new}
                        setShow={() => setShow({ ...show, new: !show.new })}
                        value={values.new}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, new: e.target.value })}
                        placeholder='New Password'
                        additionalClass={hasError.new && 'border border-red-500'}
                        error={hasError.new}
                    />
                    <PasswordInput
                        label=''
                        show={show.confirm}
                        setShow={() => setShow({ ...show, confirm: !show.confirm })}
                        value={values.confirm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, confirm: e.target.value })}
                        placeholder='Re-Type Password'
                        additionalClass={hasError.confirm && 'border border-red-500'}
                        error={hasError.confirm}
                    />
                    {
                        isLoading ?
                        <PromiseButton
                            text=''
                            additionalclassName='mt-2'
                        />
                        :
                        <PrimaryButton
                            text='Submit'
                            onClick={onSubmit}
                            additionalclassName='mt-2'
                        />
                    }
                </form>


            </div>
        </div>
    )
}

export default Password;