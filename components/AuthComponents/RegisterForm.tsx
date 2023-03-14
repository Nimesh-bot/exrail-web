import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/features/auth/authApi.slice'
import { PrimaryButton, PromiseButton } from '../Buttons'
import { PasswordInput, TextInput } from '../Inputs'

interface IRegisterProps {
    handleSwitch: () => void
}

const RegisterForm = ({ handleSwitch }: IRegisterProps) => {
    const textStyle = 'text-light dark:text-dark'
    const router = useRouter();
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
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

    const [register, { isLoading }] = useRegisterMutation();
    const onSubmit = (e: InputEvent) => {
        e.preventDefault();

        if(values.name == '' || values.email == '' || (!/\S+@\S+\.\S+/.test(values.email)) || values.password == '' || values.confirmPassword == '') {
            setErrors({
                ...errors,
                name: values.name == '' ? 'Name is required' : '',
                email: values.email == '' ? 'Email is required' : (/\S+@\S+\.\S+/.test(values.email) ? '' : 'Please provide valid email'),
                password: values.password == '' ? 'Password is required' : '',
                confirmPassword: values.confirmPassword == '' ? 'Confirm Password is required' : ''
            })
            return;
        }
        else if(values.password != values.confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword: 'Password does not match',
            })
            return;
        }
        else {
            register(values as Register.RegisterInfo)
            setErrors({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setValues({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setTimeout(() => {
                router.push('/auth/login')
            }, 1000)
        }
    }

    return (
        <div className='bg-dark dark:bg-light p-8 flex flex-col gap-y-12 justify-between'>
            <div>
                <h1 className={textStyle}>Join Us</h1>
                <p className={textStyle}>And start keeping tracks of your expenses</p>
            </div>
            <form className='flex flex-col gap-y-4'>
                <TextInput 
                    label='Full Name'
                    value={values.name}
                    disabled={false}
                    onChange={(e: any) => onChange(e, 'name')}
                    placeholder='example@gmail.com'
                    additionalClass={`text-light dark:text-dark bg-inputBgDark dark:bg-inputBgLight ${errors.name != '' && 'border border-red-400'}`}
                    additionalLabelClass='text-light dark:text-dark'
                    error={errors.name}
                />
                <TextInput 
                    label='Email'
                    value={values.email}
                    type='email'
                    disabled={false}
                    onChange={(e: any) => onChange(e, 'email')}
                    placeholder='example@gmail.com'
                    additionalClass={`text-light dark:text-dark bg-inputBgDark dark:bg-inputBgLight ${errors.email != '' && 'border border-red-400'}`}
                    additionalLabelClass='text-light dark:text-dark'
                    error={errors.email}
                />
                <PasswordInput
                    label='Password'
                    value={values.password}
                    disabled={false}
                    onChange={(e: any) => onChange(e, 'password')}
                    placeholder='********'
                    additionalClass={`text-light dark:text-dark bg-inputBgDark dark:bg-inputBgLight ${errors.password != '' && 'border border-red-400' }`}
                    additionalLabelClass='text-light dark:text-dark'
                    error={errors.password}
                    show={show.password}
                    setShow={() => setShow({
                        ...show,
                        password: !show.password
                    })}
                />
                <PasswordInput
                    label='Re-type Password'
                    value={values.confirmPassword}
                    disabled={false}
                    onChange={(e: any) => onChange(e, 'confirmPassword')}
                    placeholder='********'
                    additionalClass={`text-light dark:text-dark bg-inputBgDark dark:bg-inputBgLight ${errors.confirmPassword != '' && 'border border-red-400' }`}
                    additionalLabelClass='text-light dark:text-dark'
                    error={errors.confirmPassword}
                    show={show.confirmPassword}
                    setShow={() => setShow({
                        ...show,
                        confirmPassword: !show.confirmPassword
                    })}
                />
                {
                    isLoading ?
                    <PromiseButton
                        text=''
                        additionalclassName='mt-4'
                    />
                    :
                    <PrimaryButton 
                    text='Register' 
                        additionalclassName='mt-4'   
                        onClick={onSubmit}
                    />
                }
            </form>
            
            <p className={textStyle}>
                {"Already have an account? "} 
                <span className='text-primary dark:text-primary-800 font-semibold cursor-pointer hover:text-primary' onClick={handleSwitch}>
                    Login
                </span>
            </p>
        </div>
      )
}

export default RegisterForm