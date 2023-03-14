import React from 'react'
import { ICardProps } from '../../../@types/card'
import { currencyFormatter } from '../../../lib/currencyFormatter'

const OverviewCards = ({ additionalClass, amount, title, icon }: ICardProps) => {
  return (
    <div className={`${additionalClass} flex gap-x-4 items-center w-full px-6 py-10 hover:cursor-pointer`}>
        <div className='flex-1'>
            <div className='w-max p-2 rounded-full bg-[#F4F7ED15]'>
                {icon}
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <h2 className='text-light font-semibold'>{currencyFormatter(amount!)}</h2>
            <p className='text-light'>{title}</p>
        </div>
    </div>
  )
}

export default OverviewCards