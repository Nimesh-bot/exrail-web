import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { currencyFormatter } from '../../lib/currencyFormatter'
import { useGetExpensesQuery } from '../../redux/features/expenses/expensesApi.slice'
import { InputWithIcon } from '../Inputs'

interface IFormProps {
    selected: number
    values: Expenses.IExpenses
    setValues: Dispatch<SetStateAction<Expenses.IExpenses>>
}

const ExpenseForm = ({ selected, values, setValues }: IFormProps) => {
    const [placeholder, setPlaceholder] = useState<string>('Food')
    
    const { data: expensesData } = useGetExpensesQuery();
    const expenses = expensesData?.expense[0] 

    const [estiamted, setEstimated] = useState<number>(expenses?.estimated_food!)
    
    useEffect(() => {
        if(selected === 0) {
            setEstimated(expenses?.estimated_food!)
        } else if(selected === 1) {
            setEstimated(expenses?.estimated_transport!)
        } else if(selected === 2) {
            setEstimated(expenses?.estimated_expected!)
        } 
        else {
            setEstimated(0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    useEffect(() => {
        switch(selected) {
            case 0:
                setPlaceholder('Food')
                break
            case 1:
                setPlaceholder('Transport')
                break
            case 2:
                setPlaceholder('Expected')
                break
            case 3:
                setPlaceholder('Uncertain')
                break
        }
    }, [selected])

    return (
        <form>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <label htmlFor={placeholder}>{placeholder}</label>
                    <p>Estimated: Rs. {currencyFormatter(estiamted!)}</p>
                </div>
                <InputWithIcon 
                    icon={<p>Rs.</p>}
                    placeholder='Amount'
                    value={
                        selected === 0 ?
                        values.food!.toString()
                        : selected === 1 ?
                        values.transport!.toString()
                        : selected === 2 ?
                        values.expected!.toString()
                        : selected === 3 ?
                        values.uncertain!.toString()
                        : ''
                    }
                    onChange={(e) => {
                        switch(selected) {
                            case 0:
                                setValues({...values, food: parseInt(e.target.value)})
                                break
                            case 1:
                                setValues({...values, transport: parseInt(e.target.value)})
                                break
                            case 2:
                                setValues({...values, expected: parseInt(e.target.value)})
                                break
                            case 3:
                                setValues({...values, uncertain: parseInt(e.target.value)})
                                break
                        }
                    }}
                />
                <p className='mt-2'>
                    {
                        selected === 0 ?
                        'Update the total amount you spent on food and drinks today.'
                        : selected === 1 ?
                        'Update the total amount you spent on transportation today.'
                        : selected === 2 ?
                        'If you spent money on something you expected to spend on, update the amount here.'
                        :
                        'If you spent money on something you didn\'t expect to spend on, update the amount here.'
                    }
                </p>
            </div>
        </form>
    )
}

export default ExpenseForm