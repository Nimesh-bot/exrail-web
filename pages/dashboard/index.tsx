import { Facebook, Instagram } from 'iconsax-react'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import ExpensesChart from '../../components/DashboardComponents/Chart/ExpensesChart'
import ExpensesGrids from '../../components/DashboardComponents/Expenses/ExpensesGrids'
import Discipline from '../../components/DashboardComponents/Overview/Discipline'
import Overview from '../../components/DashboardComponents/Overview/Overview'
import PersonalCard from '../../components/DashboardComponents/Personal/PersonalCard'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <section className='w-full custom-container flex flex-col mf:flex-row gap-24 rounded-xl overflow-y-auto hide-scrollbar'>
        <div className='w-full mf:w-1/5 mf:overflow-y-auto hide-scrollbar flex flex-col gap-y-12'>
          <Overview />
          <Discipline />
        </div>
        <div className='w-full md:flex-1 mf:flex-none mf:w-1/2 flex flex-col gap-y-8 mf:overflow-y-auto hide-scrollbar'>
          <ExpensesChart />   
          <ExpensesGrids />
        </div>
        <div className='w-1/5 hidden mf:flex flex-col gap-y-8 flex-1 justify-between'>
          <PersonalCard />
          <div className='flex gap-x-8 justify-between items-end'>
            <p>Follow Us @</p>
            <div className='flex gap-x-4'>
              <Facebook size="32" color="#3B82F6" variant="Bulk" onClick={() => {
                if(typeof window !== 'undefined') {
                  window.open("https://www.facebook.com/", "_blank")
                }
              }}/>
              <Instagram size="32" color="#3B82F6" variant="Bulk" onClick={() => {
                if(typeof window !== 'undefined') {
                  window.open("https://www.instagram.com/", "_blank")
                }
              }}/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard