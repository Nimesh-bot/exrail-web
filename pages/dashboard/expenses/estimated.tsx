import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FlatButton, PrimaryButton, PromiseButton } from '../../../components/Buttons'
import { InputWithIcon } from '../../../components/Inputs'
import { useGetExpensesQuery, useUpdateEstimatedExpenseMutation, useUpdateExpenseMutation } from '../../../redux/features/expenses/expensesApi.slice'

const fieldsData = [
    {
        label: 'Food',
        placeholder: '7000',    
    },
    {
        label: 'Transport',
        placeholder: '2000',
    },
    {
        label: 'Expected',
        placeholder: '1000',
    },
]

const Estimated = () => {
    const [values, setValues] = React.useState<Expenses.IExpenses>({
        estimated_food: 0,
        estimated_transport: 0,
        estimated_expected: 0,
    })

    const router = useRouter();

    const { data: expensesData } = useGetExpensesQuery();
    const [ updateEstimatedExpenses, { isLoading } ] = useUpdateEstimatedExpenseMutation();

    const handleUpdate = (e: InputEvent) => {
        e.preventDefault();

        try{
            if(values.estimated_food! <= 0 && values.estimated_transport! <= 0 && values.estimated_expected! <= 0) {
                toast("At least one of the categories should be filled", 
                    {
                        icon: "⛔",
                        style: {
                            borderRadius: '2px',
                            background: '#EB1D36',
                            color: '#f7f7f7',
                        },
                    }
                )
            }
            else {
                updateEstimatedExpenses({
                    body: {
                        estimated_food: values.estimated_food,
                        estimated_transport: values.estimated_transport,
                        estimated_expected: values.estimated_expected,
                    },
                    id: expensesData?.expense[0]._id!
                }).unwrap().then(() => {
                    toast("Updated successfully", 
                        {
                            icon: "✅",
                            style: {
                                borderRadius: '2px',
                                background: '#1D9D6B',
                                color: '#f7f7f7',
                            },
                        }
                    )
                    values.estimated_food = 0
                    values.estimated_transport = 0
                    values.estimated_expected = 0
                })
            }
        }
        catch(err: any) {
            toast(err.response.data.message || "Something went wrong",
                {
                    icon: "⛔",
                    style: {
                        borderRadius: '2px',
                        background: '#EB1D36',
                        color: '#f7f7f7',
                    },
                }
            )
        }
    }

    useEffect(() => {
        if(expensesData?.expense[0].estimated_food) {
            setValues({
                ...values,
                estimated_food: expensesData.expense[0].estimated_food,
                estimated_transport: expensesData.expense[0].estimated_transport,
                estimated_expected: expensesData.expense[0].estimated_expected,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expensesData])

    return (
        <>
            <Head>
                <title>Estimated Expenses</title>
            </Head>
            <section className='w-full custom-container flex gap-x-24 rounded-xl overflow-auto hide-scrollbar'>
                <div className='w-full flex flex-col gap-y-8'>
                    <FlatButton text='Back to expenses' additionalclassName='mt-4' onClick={() => router.back()}/>
                    <div>
                        <h1>Estimated Expenses</h1>
                        <p>Set a estimation of total amount you might spend on each category for this month</p>
                    </div>
                    <form className='flex flex-col gap-y-8'>
                        {
                            fieldsData.map((field, index) => (
                                <div className='w-full lg:w-1/4 flex flex-col' key={index}>
                                    <label htmlFor={field.label} className='opacity-100'>{field.label}</label>
                                    <InputWithIcon 
                                        icon={<p>Rs.</p>}
                                        placeholder='Amount'
                                        value={
                                            index === 0 ?
                                            values.estimated_food!.toString() === '0' ? '' : values.estimated_food!.toString()
                                            : index === 1 ?
                                            values.estimated_transport!.toString() === '0' ? '' : values.estimated_transport!.toString()
                                            : index === 2 ?
                                            values.estimated_expected!.toString() === '0' ? '' : values.estimated_expected!.toString()
                                            : ''
                                        }
                                        onChange={(e) => {
                                            switch(index) {
                                                case 0:
                                                    setValues({...values, estimated_food: parseInt(e.target.value)})
                                                    break
                                                case 1:
                                                    setValues({...values, estimated_transport: parseInt(e.target.value)})
                                                    break
                                                case 2:
                                                    setValues({...values, estimated_expected: parseInt(e.target.value)})
                                                    break
                                            }
                                        }}
                                    />
                                    <p className='mt-2'>
                                        {
                                            index === 0 ?
                                            'Plan ahead and set a estimation of total amount you might spend on food and drinks for this month'
                                            : index === 1 ?
                                            'Calculate and try to limit the total amount you might spend on transport for this month to the amount you set here.'
                                            : 
                                            'Obvious expenses that you know you will have to pay for this month.'
                                        }
                                    </p>
                                </div>
                            ))
                        }

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

export default Estimated