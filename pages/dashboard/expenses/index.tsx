import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FlatButton, PrimaryButton, PromiseButton } from '../../../components/Buttons'
import Categories from '../../../components/ExpensesComponents/Categories'
import ExpenseForm from '../../../components/ExpensesComponents/ExpenseForm'
import { ErrorToastMessages, SuccessToastMessages } from '../../../lib/toasts/ToastMessages'
import { useGetExpensesQuery, useUpdateExpenseMutation } from '../../../redux/features/expenses/expensesApi.slice'
import { useUpdateUserBalanceMutation } from '../../../redux/features/user/userApi.slice'

const Expenses: NextPage = () => {
    const [index, setIndex] = useState<number>(0)
    const [values, setValues] = useState<Expenses.IExpenses>({
        food: 0,
        transport: 0,
        expected: 0,
        uncertain: 0,
    })

    const router = useRouter();

    const { data: expensesData } = useGetExpensesQuery();
    const [ updateExpenses, { isLoading } ] = useUpdateExpenseMutation();
    const [ updateUserBalance, { isLoading: isUpdatingBalance } ] = useUpdateUserBalanceMutation();

    const handleUpdate = () => {
        try{
            if(values.food! <= 0 && values.transport! <= 0 && values.expected! <= 0 && values.uncertain! <= 0) {
                ErrorToastMessages('At least one of the categories should be filled')
            }
            else {
                updateExpenses({
                    body: values,
                    id: expensesData?.expense[0]._id!
                }).unwrap().then(() => {
                    updateUserBalance({
                        additional: -(values.food! + values.transport! + values.expected! + values.uncertain!)
                    }).then(() => {
                        setValues({
                            food: 0,
                            transport: 0,
                            expected: 0,
                            uncertain: 0
                        })
                        SuccessToastMessages('Expenses updated successfully')
                    })
                })
            }
        }
        catch(err: any) {
            console.error(err)
            ErrorToastMessages(err.response.data.message || 'Something went wrong')
        }
    }

    return (
        <>
            <Head>
                <title>Daily Expenses</title>
            </Head>
            <section className='w-full custom-container flex gap-x-24 rounded-xl'>
                <div className='w-full lg:w-1/4 flex flex-col gap-y-8'>
                    <div>
                        <h1>Daily Expenses</h1>
                        <p>Even a small amount spent is worth keeping note of.</p>
                    </div>
                    <Categories 
                        index={index}
                        setIndex={setIndex}
                    />
                    <ExpenseForm
                        selected={index}
                        values={values}
                        setValues={setValues}
                    />
                    {
                        isLoading || isUpdatingBalance ?
                        <PromiseButton 
                            text=''
                            additionalclassName='mt-4'
                        />
                        :
                        <PrimaryButton text='Update' additionalclassName='mt-4' onClick={handleUpdate}/>
                    }
                    <FlatButton text='Update estimated expenses' additionalclassName='-mt-4' onClick={() => router.push('/dashboard/expenses/estimated')}/>
                </div>
            </section>
        </>
    )
}

export default Expenses