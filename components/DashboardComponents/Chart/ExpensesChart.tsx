import React, { useEffect } from 'react'

import { Line } from 'react-chartjs-2'
import { 
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'
import { useGetAllExpensesQuery } from '../../../redux/features/expenses/expensesApi.slice';

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const ExpensesChart = () => {
    const { data: expenses, isLoading } = useGetAllExpensesQuery()
    
    
    const [totalOfYear, setTotal] = React.useState<Expenses.IGetExpensesResponse | any>([]);
    const [totalExpenses, setTotalExpenses] = React.useState<Expenses.IGetExpensesResponse | any>(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((each: any) => ({
            month: each,
            total: 0
        }))
    );

    useEffect(() => {
        if(!isLoading) {
            const filteredData = expenses?.expenses?.map(each => ({
                value: each.month,
                total: each.food! + each.transport! + each.expected! + each.uncertain!
            }))
            setTotal(filteredData)
            totalExpenses.forEach((each: any) => {
                filteredData?.forEach((data: any) => {
                    if(each.month === data.value) {
                        each.total = data.total
                    }
                })
            })
        }
    }, [expenses?.expenses, isLoading, totalExpenses])

    console.log(totalOfYear)

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Expenses',
                data: totalExpenses.map((each: any) => each.total),
                fill: true,
                backgroundColor: '#3B82F6',
                borderColor: '#3B82F6',
                tension: 0.5
            },
        ]
    }

    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            }
        }
    }

  return (
    <div className='hidden w-full flex-[2] md:flex flex-col'>
        <div className='mb-10'>
            <h1>Expenses</h1>
            <p>Monthly expenses.</p>
        </div>
        <Line data={data} options={options} />
    </div>
  )
}

export default ExpensesChart