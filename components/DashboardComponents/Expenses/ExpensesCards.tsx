import { Reserve } from 'iconsax-react'
import React from 'react'
import { currencyFormatter } from '../../../lib/currencyFormatter'

interface IExpensesCardsProps {
    label: string
    amount: number
    total?: number
    icon: JSX.Element
}

const ExpensesCards = ({ label, amount, total, icon }: IExpensesCardsProps) => {
  return (
    <div className='w-44 h-max flex-shrink-0 bg-light dark:bg-dark rounded-lg flex flex-col p-4 gap-y-12'>
        <div className='flex justify-between items-center'>
            <p>{label}</p>
            {icon}
        </div>
        <div className='flex items-center justify-between'>
            <p className='text-2xl font-bold'>Rs. {currencyFormatter(amount!)}</p>
            <p>
                / Rs. 
                {
                    label.toLocaleLowerCase() === 'uncertain'
                    ?
                    '?'
                    :
                    currencyFormatter(total!)
                }
            </p>
        </div>
    </div>
  )
}

export default ExpensesCards