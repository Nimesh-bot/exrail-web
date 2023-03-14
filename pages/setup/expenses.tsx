import { Setting4 } from 'iconsax-react'
import { NextPage } from 'next'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { PrimaryButton, PromiseButton } from '../../components/Buttons';
import { TextInput } from '../../components/Inputs';
import { getMonth } from '../../lib/getMonth';
import { ErrorToastMessages, SuccessToastMessages } from '../../lib/toasts/ToastMessages';
import { unauthorize } from '../../redux/features/auth/auth.slice';
import { useGetExpensesQuery, usePostExpenseMutation } from '../../redux/features/expenses/expensesApi.slice';
import { useGetIncomeQuery } from '../../redux/features/income/incomeApi.slice';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi.slice';
import { useAppDispatch } from '../../redux/hooks';

const SetupExpenses: NextPage = () => {
  const { data: userData, refetch } = useGetUserDetailsQuery();
  const user = userData?.user

  const { data: expensesData, isLoading: searchingExpenses } = useGetExpensesQuery();
  const expenses = expensesData?.expenses

  const { data: incomeData, isLoading: searchingIncome } = useGetIncomeQuery();
  const income = incomeData?.income

  const router = useRouter()

  const [values, setValues] = useState<Expenses.IExpenses>({
    food: 0,
    transport: 0,
    expected: 0,
    uncertain: 0,
    estimated_food: 0,
    estimated_transport: 0,
    estimated_expected: 0,
  })

  useEffect(() => {
    if(expenses !== undefined) {
      if(income?.length === 0 || income === undefined) {
        router.replace('/setup/income')
      }
      else {
        router.replace('/dashboard')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, income])

  const [postExpenses, { isLoading }] = usePostExpenseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if(values.estimated_food === 0 || values.estimated_transport === 0 || values.estimated_expected === 0) {
      ErrorToastMessages('Please fill all the fields')
    }
    else {
      try {
        await postExpenses(values).unwrap().then(() => {
          SuccessToastMessages('Expenses setup completed')
          setValues({
            food: 0,
            transport: 0,
            expected: 0,
            uncertain: 0,
            estimated_food: 0,
            estimated_transport: 0,
            estimated_expected: 0,
          })
          if(income?.length === 0 || income === undefined) {
            router.push('/setup/income')
          }
          else {
            router.push('/dashboard')
          }
        })
      }
      catch(err: any) {
        console.log(err)
        ErrorToastMessages(err.message || 'Something went wrong')
      }
    }
  }

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(unauthorize())
  }

  if(searchingExpenses || searchingIncome) {
    return (
      <div className='w-full h-screen fixed top-0 left-0 bg-light dark:bg-dark flex items-center justify-center'>
        <h2 className='font-[quicksand] animate-pulse'>exrail</h2>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Setup | Expenses</title>
      </Head>
      <div className='flex justify-center items-center w-full max-h-screen'>
        <div className='w-full md:w-3/4 lg:w-1/4 h-full flex mx-auto items-center overflow-auto hide-scrollbar'>
          <div className='space-y-8'>
            <div className='flex flex-row justify-between items-end'>
              <Setting4 size="63" color="#3B82F6" className='rotate-12 customDropShadow' />
              <p className='text-red-500 opacity-100 cursor-pointer' onClick={handleLogout}>Logout</p>
            </div>
            <div>
              <h1>Hello {user?.name}</h1>
              <p>{`Let's setup your account for`} <span className='text-primary font-medium'>{getMonth(new Date())}</span></p>
            </div>
            <form className='flex flex-col gap-y-4'>
              <p className='mb-4'>We need to know your estiamted expenses in available categories for this month.</p>
              <div>
                <label htmlFor="food" className='opacity-100'>Food</label>
                <TextInput 
                  value={String(values.estimated_food)}
                  type='number'
                  onChange={(e) => {
                    setValues({
                      ...values,
                      estimated_food: Number(e.target.value)
                    })
                  }}
                />
                <p>Estimate the expenses to be incurred for this month to help discipline yourself.</p>
              </div>
              <div>
                <label htmlFor="transport" className='opacity-100'>Transport</label>
                <TextInput 
                  value={String(values.estimated_transport)}
                  type='number'
                  onChange={(e) => {
                    setValues({
                      ...values,
                      estimated_transport: Number(e.target.value)
                    })
                  }}
                />
                <p>Estimate the expenses to be incurred in transportation and try to limit yourself to it.</p>
              </div>
              <div>
                <label htmlFor="expected" className='opacity-100'>Other</label>
                <TextInput 
                  value={String(values.estimated_expected)}
                  type='number'
                  onChange={(e) => {
                    setValues({
                      ...values,
                      estimated_expected: Number(e.target.value)
                    })
                  }}
                />
                <p>Estimate the total amount you are okay to spend on other things like entertainment, fashions, etc.</p>
              </div>
              {
                isLoading ?
                <PromiseButton
                  text=''
                />
                :
                <PrimaryButton
                  text='Save'
                  onClick={handleSubmit}
                />
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetupExpenses