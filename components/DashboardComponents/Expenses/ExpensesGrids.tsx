import { Car, DollarSquare, Reserve, StopCircle } from 'iconsax-react'
import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useGetExpensesQuery } from '../../../redux/features/expenses/expensesApi.slice'
import ExpensesCards from './ExpensesCards'

const ExpensesGrids = () => {
    const { data: expensesData } = useGetExpensesQuery();
    const userExpenses = expensesData?.expense[0]

    return (
        <div className='flex-1 flex flex-col gap-y-4'>
            <h2>Daily Expneses</h2>
            <ScrollContainer className='flex gap-x-4 flex-1'>
                <ExpensesCards 
                    label='Food'
                    amount={userExpenses?.food!}
                    total={userExpenses?.estimated_food!}
                    icon={<Reserve size="32" color="#3B82F6" variant="Bold"/>}
                />
                <ExpensesCards 
                    label='Transport'
                    amount={userExpenses?.transport!}
                    total={userExpenses?.estimated_transport!}
                    icon={<Car size="32" color="#3B82F6" variant="Bold"/>}
                />
                <ExpensesCards 
                    label='Expected'
                    amount={userExpenses?.expected!}
                    total={userExpenses?.estimated_expected!}
                    icon={<DollarSquare size="32" color="#3B82F6" variant="Bold"/>}
                />
                <ExpensesCards 
                    label='Uncertain'
                    amount={userExpenses?.uncertain!}
                    icon={<StopCircle size="32" color="#3B82F6" variant="Bold"/>}
                />
            </ScrollContainer>
        </div>
    )
}

export default ExpensesGrids