import { NextPage } from 'next'
import React, { useState } from 'react'
import LoginForn from '../../components/AuthComponents/LoginForn'
import RegisterForm from '../../components/AuthComponents/RegisterForm'

const Login: NextPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className='flex justify-center items-center w-full max-h-screen'>
            <div className='max-w-2/3 h-full flex justify-center items-center relative'>
                <div className='w-full h-64 bg-dark-plus md:flex justify-between px-8 hidden'>
                    <div className='w-1/4 h-full flex flex-col justify-center gap-y-4'>
                        <p className='italic'>
                            {"I can’t afford it’ shuts down your brain. ‘How can I afford it?’ open up possibilities, excitement and dreams."}
                        </p>
                        <p className='opacity-100 font-medium'>
                            Robert T. Kiyosaki
                        </p>
                    </div>
                    <div className='w-1/4 h-full flex flex-col justify-center gap-y-4'>
                        <p className='italic'>
                            {"Beware of little expenses. A small leak will sink a great ship."}
                        </p>
                        <p className='opacity-100 font-medium'>
                            Benjamin Franklin
                        </p>
                    </div>
                </div>

                <div className={`md:absolute md:top-1/2 md:-translate-y-1/2 md:w-1/2 h-11/12 md:h-3/5 lg:h-3/4 overflow-auto hide-scrollbar md:right-0 bg-light transition-ease ${isLogin ? 'md:translate-x-0' : 'md:-translate-x-full'}`}>
                    {
                        isLogin ?
                        <LoginForn 
                            handleSwitch={() => setIsLogin(false)}
                        />
                        :
                        <RegisterForm 
                            handleSwitch={() => setIsLogin(true)}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Login