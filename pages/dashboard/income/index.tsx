import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FlatButton, PrimaryButton, PromiseButton } from '../../../components/Buttons'
import { InputWithIcon } from '../../../components/Inputs'
import { ErrorToastMessages, SuccessToastMessages } from '../../../lib/toasts/ToastMessages'
import { useGetIncomeQuery, useUpdateIncomeMutation } from '../../../redux/features/income/incomeApi.slice'

const Income: NextPage = () => {
    const [values, setValues] = useState<Income.IIncome>({
        monthlySalary: 0,
        estimatedSaving: 0,
    })

    const router = useRouter();

    const { data: incomeData } = useGetIncomeQuery();
    const [ updateIncome, { isLoading } ] = useUpdateIncomeMutation();
    
    useEffect(() => {
        if(incomeData?.income[0]) {
            setValues({
                monthlySalary: incomeData?.income[0].monthlySalary!,
                estimatedSaving: incomeData?.income[0].estimatedSaving!,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomeData])

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        try {
            if(values.monthlySalary && values.estimatedSaving) {
                if(typeof values.monthlySalary === 'number' && typeof values.estimatedSaving === 'number') {
                    updateIncome(values).unwrap().then(() => {
                        SuccessToastMessages('Income updated successfully')
                        values.monthlySalary = 0
                        values.estimatedSaving = 0
                    })
                }
                else {
                    ErrorToastMessages('Please enter valid values.')
                }
            }
            else {
                ErrorToastMessages('Please enter amount you earn and save.')
            }
        }
        catch(err: any) {
            ErrorToastMessages(err.response.data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Income and Saving</title>
            </Head>
            <section className='w-full custom-container flex gap-x-24 rounded-xl overflow-auto hide-scrollbar'>
                <div className='w-full lg:w-1/4 flex flex-col gap-y-8'>
                    <div>
                        <h1>Earnings</h1>
                        <p>Set your earning, to keep track of your balance appropriately.</p>
                    </div>
                    <form className='w-full flex flex-col gap-y-8 mt-4'>
                        <div>
                            <label htmlFor={'monthlySalary'} className='opacity-100'>Monthly Salary</label>
                            <InputWithIcon 
                                icon={<p>Rs.</p>}
                                placeholder='Amount'
                                value={values.monthlySalary!.toString()}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setValues({...values, monthlySalary: parseInt(e.target.value)})
                                }}
                                type='number'
                            />
                            <p className='mt-2'>Note that, any update you make in your salary will be reflected to your balance only after the current month ends.</p>
                        </div>
                        <div>
                            <label htmlFor={'estimatedSaving'} className='opacity-100'>Estimated Saving</label>
                            <InputWithIcon 
                                icon={<p>Rs.</p>}
                                placeholder='Amount'
                                value={values.estimatedSaving!.toString()}
                                onChange={(e) => {
                                    setValues({...values, estimatedSaving: parseInt(e.target.value)})
                                }}
                                type='number'
                            />
                            <p className='mt-2'>Your estimated saving is responsible to affect your disciple level. Please consider properly before setting your saving.</p>
                        </div>
                        <FlatButton 
                            text='Add additional income'
                            onClick={(e: FormEvent) => {e.preventDefault(); router.push('/dashboard/income/additional')}}
                        />
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

export default Income