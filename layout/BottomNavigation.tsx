import React from 'react'
import { Element3, MoneySend, EmptyWallet, Bag2, UserSquare, Logout } from 'iconsax-react'
import { useThemeContext } from '../context/ThemeContextProvider'
import { useRouter } from 'next/router'
import Link from 'next/link'

const BottomNavigation = () => {
    const router = useRouter()
    const checkActiveRoute = (route: string) => {
        if(router.pathname === route) {
            return true
        }
    }
    
    const { dark } = useThemeContext();
    
  return (
    <div className='sticky bottom-0 left-0 lg:hidden my-2 mx-4'>
        <div className='flex justify-between gap-x-6 items-center rounded-xl bg-light-plus dark:bg-dark-plus border-t border-gray-200 dark:border-slate-800 px-4 py-6'>
            <Link href='/dashboard'>
                <Element3 size="18" color={checkActiveRoute('/dashboard') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard') ? "Bulk" : "Outline"}/>
            </Link>
            <Link href='/dashboard/expenses'>
                <MoneySend size="18" color={checkActiveRoute('/dashboard/expenses') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/expenses') ? "Bulk" : "Outline"}/>
            </Link>
            <Link href='/dashboard/income'>
                <EmptyWallet size="18" color={checkActiveRoute('/dashboard/income') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/income') ? "Bulk" : "Outline"}/>
            </Link>
            <Link href='/dashboard/wish'>
                <Bag2 size="18" color={checkActiveRoute('/dashboard/wish') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/wish') ? "Bulk" : "Outline"}/>
            </Link>
            <Link href='/dashboard/profile'>
                <UserSquare size="18" color={checkActiveRoute('/dashboard/profile') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/profile') ? "Bulk" : "Outline"}/>
            </Link>
        </div>
    </div>
  )
}

export default BottomNavigation