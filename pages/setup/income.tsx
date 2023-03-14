import { Setting4 } from 'iconsax-react'
import { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FlatButton, PrimaryButton, PromiseButton } from '../../components/Buttons';
import { TextInput } from '../../components/Inputs';
import { getMonth } from '../../lib/getMonth';
import { ErrorToastMessages, SuccessToastMessages } from '../../lib/toasts/ToastMessages';
import { usePostExpenseMutation } from '../../redux/features/expenses/expensesApi.slice';
import { useGetIncomeQuery, usePostIncomeMutation } from '../../redux/features/income/incomeApi.slice';
import { useUpdateUserBalanceMutation } from '../../redux/features/user/userApi.slice';

const SetupExpenses: NextPage = () => {
  const { data: incomeData } = useGetIncomeQuery();

  const router = useRouter()

  const [values, setValues] = useState<Income.IIncome>({
    monthlySalary: 0,
    estimatedSaving: 0,
  })

  const [postIncome, { isLoading }] = usePostIncomeMutation();
  const [updateUserBalance, { isLoading: updatingUserBalance }] = useUpdateUserBalanceMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if(values.monthlySalary === 0 || values.estimatedSaving === 0) {
      ErrorToastMessages('Please fill all the fields')
    }
    else {
      try {
            await postIncome(values).unwrap().then(() => {
                updateUserBalance({
                    additional: values.monthlySalary
                }).unwrap().then(() => {
                    SuccessToastMessages('Income setup completed. Redirecting to dashboard...')  
                    setValues({
                        monthlySalary: 0,
                        estimatedSaving: 0,
                    })
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 2000)
                    })
                }
            )
        }
        catch(err: any) {
            console.log(err)
            ErrorToastMessages(err.message || 'Something went wrong')
        }
    }
  }

  const handleSkip = async () => {
    try {
        await postIncome(values)
        SuccessToastMessages('Redirecting to dashboard...') 
        setTimeout(() => {
            router.push('/dashboard')
        }, 2000)
    }
    catch(err: any) {
        console.log(err)
        ErrorToastMessages(err.message || 'Something went wrong')
    }
  }

  return (
    <>
      <Head>
        <title>Setup | Expenses</title>
      </Head>
      <div className='flex justify-center items-center w-full max-h-screen'>
        <div className='w-full md:w-3/4 lg:w-1/4 h-full flex mx-auto items-center overflow-auto hide-scrollbar'>
          <div className='space-y-8'>
            <Setting4 size="63" color="#3B82F6" className='rotate-12 customDropShadow' />
            <div>
              <h1>One Last Step</h1>
              <p>{`Let's add your income for`} <span className='text-primary font-medium'>{getMonth(new Date())}</span></p>
            </div>
            <form className='flex flex-col gap-y-4'>
              <p className='mb-4'>We need to know your estiamted expenses in available categories for this month.</p>
              <div>
                <label htmlFor="salary" className='opacity-100'>Monthly Salary</label>
                <TextInput 
                  value={String(values.monthlySalary)}
                  type='number'
                  onChange={(e) => {
                    setValues({
                      ...values,
                      monthlySalary: Number(e.target.value)
                    })
                  }}
                />
                <p>We need this info to adjust your balance accurately.</p>
              </div>
              <div>
                <label htmlFor="saving" className='opacity-100'>Estimated saving</label>
                <TextInput 
                  value={String(values.estimatedSaving)}
                  type='number'
                  onChange={(e) => {
                    setValues({
                      ...values,
                      estimatedSaving: Number(e.target.value)
                    })
                  }}
                />
                <p>How much do you estimate to save this month?</p>
              </div>
              <div className='space-x-8'>
                {
                    isLoading || updatingUserBalance ?
                    <PromiseButton
                    additionalclassName='mt-4'
                    text=''
                    />
                    :
                    <PrimaryButton
                    additionalclassName='mt-4'
                    text='Save'
                    onClick={handleSubmit}
                    />
                }
                <FlatButton
                    additionalclassName='mt-4'
                    text='Skip'
                    onClick={handleSkip}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetupExpenses