import { MoneySend } from 'iconsax-react'
import React, { useEffect } from 'react'
import { useGetExpensesQuery } from '../../../redux/features/expenses/expensesApi.slice'
import { useGetUserDetailsQuery, useGetUserIncomeQuery } from '../../../redux/features/user/userApi.slice'
import OverviewCards from './OverviewCards'

interface IOverviewProps {
  expenses: Expenses.IExpenses 
  user: User.IUser 
  income: Income.IIncome
}

const Overview = () => {
  const { data: expensesData } = useGetExpensesQuery();
  const userExpenses = expensesData?.expense[0] 

  const { data: userData } = useGetUserDetailsQuery();
  const user = userData?.user 

  const { data: incomeData } = useGetUserIncomeQuery();
  const userIncome = incomeData?.income[0]
  

  return (
    <div className='flex-shrink-0 flex flex-col'>
        <h1>Overview</h1>
        <p>Keep track of your expenses easily.</p>

        <div className='w-full mt-10'>
          <OverviewCards additionalClass='bg-primary rounded-t-lg' amount={userIncome?.monthlySalary} title='Monthly Income' icon={<MoneySend size="27" color="#F4F7ED" variant="Broken"/>}/>
          <OverviewCards 
            additionalClass='bg-primary-500' 
            amount={user?.balance} 

            title='Total Balance' 
            icon={<MoneySend size="27" color="#F4F7ED" variant="Broken"/>}
          />
          <OverviewCards 
            additionalClass='bg-primary-800 rounded-b-lg' 
            amount={userExpenses?.food! + userExpenses?.transport! + userExpenses?.expected! + userExpenses?.uncertain!} 
            title='Expenses' 
            icon={<MoneySend size="27" color="#F4F7ED" variant="Broken"/>}
          />  
        </div>
    </div>
  )
}

export default Overview