import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useGetExpensesQuery } from '../redux/features/expenses/expensesApi.slice'
import { useGetIncomeQuery } from '../redux/features/income/incomeApi.slice'
import { useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'

const Home = () => {  
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth)
  const router = useRouter();

  const { data: expensesData, isLoading } = useGetExpensesQuery();
  const expenses = expensesData?.expense

  const { data: incomeData, isLoading: searchingIncome } = useGetIncomeQuery();
  const income = incomeData?.income

  useEffect(() => {
    if(!isLoggedIn) {
      router.push('/auth/login')
    }
    if(isLoggedIn) {
      const check = async () => {
        if(expenses?.length === 0) {
          router.replace('/setup/expenses')
        }
        else if(income?.length === 0) {
          router.replace('/setup/income')
        }
        else {
          return router.replace('/dashboard')
        }
      }
      setTimeout(() => {
        check()
      }, 2000)  
    }
  }, [expenses?.length, income?.length, isLoggedIn, router])

  return (
    <div className='w-full h-full bg-light dark:bg-dark flex justify-center items-center'>
      <h2 className='font-[quicksand] animate-pulse'>exrail</h2>
    </div>
  )
}

export default Home