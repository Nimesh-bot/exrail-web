import React, { FC, useState } from 'react'

import { HiChevronDown } from 'react-icons/hi'

import { InputProps } from '../@types/input'

const TextInput = ({ label, additionalClass, additionalLabelClass, error, ...otherProps }: InputProps) => {
  return (
    <div className='flex flex-col gap-y-2'>
        <label className={additionalLabelClass}>{label}</label>
        <input 
            className={`bg-inputBgLight dark:bg-inputBgDark rounded-md placeholder:text-font dark:placeholder:text-body placeholder:opacity-25 placeholder:font-light disabled:opacity-60 ${additionalClass}`}
            {...otherProps}
        />
        {
            error && <p className='text-red-500 font-normal text-xs'>{error}</p>
        }
    </div>
  )
}

const PasswordInput = ({ label, show, setShow, additionalClass, additionalLabelClass, error, ...otherProps }: InputProps) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <label className={additionalLabelClass}>{label}</label>
            <div className='relative flex-1'>
                <input
                    type={show ? 'text' : 'password'}
                    className={`bg-inputBgLight dark:bg-inputBgDark rounded-md w-full placeholder:text-font dark:placeholder:text-body placeholder:opacity-25 placeholder:font-light ${additionalClass}`}
                    {...otherProps}
                />
                <div className='absolute top-1/2 right-3 -translate-y-1/2' onClick={setShow}>
                    {
                        show ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="inherit" className="w-5 h-5 stroke-white dark:stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="inherit" className="w-5 h-5 stroke-white dark:stroke-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    }
                </div>
            </div>
            {
                error && <p className='text-red-500 font-normal text-xs'>{error}</p>
            }
        </div>
    )
}

const InputWithIcon = ({ label, value, onChange, placeholder, additionalClass, type, icon }: InputProps) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <label>{label}</label>
            <div className='flex gap-x-4 items-center bg-inputBgLight dark:bg-inputBgDark rounded-md px-4'>
                {icon}
                <input 
                    type={type}
                    className={`bg-inputBgLight dark:bg-inputBgDark placeholder:text-font dark:placeholder:text-body placeholder:opacity-25 placeholder:font-light flex-1 ${additionalClass}`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

const SelectInput = ({ label, value, onChange, additionalClass, placeholder, disabled, array, open, closeOptions }: InputProps) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <label>{label}</label>
            
            <div className='relative'>
                <input 
                    type='text'
                    className={`bg-inputBgLight dark:bg-inputBgDark rounded-md placeholder:text-font dark:placeholder:text-body placeholder:opacity-25 placeholder:font-light flex-1 ${additionalClass}`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {
                    (value !== '' && open) &&
                    <div className={`absolute top-14 left-0 rounded-b-md bg-inputBgLight dark:bg-inputBgDark brightness-90 ${additionalClass}`}>
                        {
                            array?.filter(item => item.name.toLowerCase().includes(value.toLowerCase())).map(item => (
                                <div 
                                    className='px-4 py-2 text-font dark:text-body font-light cursor-pointer hover:bg-primary hover:opacity-100 opacity-60 hover:font-bold last:rounded-b-md' 
                                    key={item.id}
                                    onClick={() => {
                                        onChange({ target: { value: item.name } } as React.ChangeEvent<HTMLInputElement>);
                                        closeOptions
                                    }}
                                >
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

const Select: FC <InputProps> = ({ value, onChange, array }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='flex flex-col gap-y-2 relative'>
            <div className={`w-32 py-3 bg-primary rounded-md flex justify-between items-center px-4`} onClick={() => setOpen(!open)}>
                <p className='font-medium'>{value}</p>
                <HiChevronDown 
                    className={open ? 'text-lg text-font dark:text-body rotate-180 transition-all' : 'text-lg text-font dark:text-body transition-all'}
                />
            </div>
            {
                open &&
                <div className='w-32 absolute top-1/2 translate-y-1/2 left-0 rounded-md bg-inputBgLight dark:bg-inputBgDark'>
                    {
                        array?.map((item, index) => (
                        <div
                            className='px-4 py-2 text-font dark:text-body font-light cursor-pointer hover:bg-primary hover:opacity-100 opacity-60 hover:font-bold first:rounded-t-md last:rounded-b-md'
                            key={index}
                            onClick={() => {
                                onChange({ target: { value: item.value } } as React.ChangeEvent<HTMLInputElement>);
                                setOpen(false);
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export { TextInput, PasswordInput, InputWithIcon, SelectInput, Select }