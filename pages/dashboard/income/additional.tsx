import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FlatButton, PrimaryButton, PromiseButton } from '../../../components/Buttons'
import { InputWithIcon } from '../../../components/Inputs'
import { ErrorToastMessages, SuccessToastMessages } from '../../../lib/toasts/ToastMessages'
import { useUpdateUserBalanceMutation } from '../../../redux/features/user/userApi.slice'

const Additional: NextPage = () => {
    const router = useRouter();
    const [value, setValue] = useState<number>(0)

    const [ updateUserBalance, { isLoading } ] = useUpdateUserBalanceMutation();

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault()
        try {
            if(value! > 0 || typeof value === 'number') {
                updateUserBalance({
                    additional: value!
                }).unwrap().then(() => {
                    SuccessToastMessages('Additional Income added successfully')
                })
            }
            else {
                ErrorToastMessages('Please enter valid value.')
            }
        }
        catch(err: any) {
            ErrorToastMessages(err.response.data.message || 'Something went wrong')
        }
    }

    return (
        <>
            <Head>
                <title>Additional Income</title>
            </Head>
            <section className='w-full custom-container flex gap-x-24 rounded-xl'>
                <div className='w-full lg:w-1/4 flex flex-col gap-y-8'>
                    <FlatButton 
                        text='Back to Income'
                        onClick={() => router.back()}
                    />
                    <div>
                        <h1>Additional Income</h1>
                        <p>Earned extra penny from freelancing or other source? Add them to your balance from here.</p>
                    </div>

                    <form className='w-full flex flex-col gap-y-8 mt-4'>
                        <div>
                            <label htmlFor={'monthlySalary'} className='opacity-100'>Additional Earning</label>
                            <InputWithIcon
                                icon={<p>Rs.</p>}
                                placeholder='Amount'
                                value={value!.toString()}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setValue(parseInt(e.target.value))
                                }}
                                type='number'
                            />
                            <p className='mt-2'>This amount would be added to your balance.</p>
                        </div>
                        {
                            isLoading ? 
                            <PromiseButton 
                                text=''
                            />
                            :
                            <PrimaryButton
                                text='Save'
                                onClick={handleUpdate}
                            />
                        }
                    </form>
                </div>
            </section>
        </>
    )
}

export default Additional