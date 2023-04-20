import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Element3, MoneySend, EmptyWallet, Bag2, UserSquare, Logout } from 'iconsax-react'

import { useAppDispatch } from '../redux/hooks'
import { unauthorize } from '../redux/features/auth/auth.slice'
import LogoutModal from '../components/LogoutModal'
import { persistor } from '../redux/store'
import { userApi } from '../redux/features/user/userApi.slice'
import { expensesApiWithoutErrorHandling } from '../redux/features/expenses/expensesApi.slice'
import { incomeApi } from '../redux/features/income/incomeApi.slice'
import { wishApi } from '../redux/features/wish/wishApi.slice'
import { useThemeContext } from '../context/ThemeContextProvider'

const Menu = () => {
    const router = useRouter()

    const [logoutModal, setLogoutModal] = useState<boolean>(false);

    const checkActiveRoute = (route: string) => {
        if(router.pathname === route) {
            return true
        }
    }
    
    const { dark } = useThemeContext();

    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(unauthorize())
        dispatch(userApi.util.resetApiState());
        dispatch(expensesApiWithoutErrorHandling.util.resetApiState());
        dispatch(incomeApi.util.resetApiState());
        dispatch(wishApi.util.resetApiState());
        persistor.purge();
    }

    return (
        <div className='hidden px-6 min-h-full lg:flex flex-col justify-between sticky top-0 left-0 pt-8'>
            <div className='flex flex-col gap-y-8'>

                <Link href='/dashboard'>
                    <div className={`text-light p-4 ${checkActiveRoute('/dashboard') && `bg-light-plus rounded-lg dark:bg-dark-plus text-primary`}`}>
                        <Element3 size="27" color={checkActiveRoute('/dashboard') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard') ? "Bulk" : "Outline"}/>
                    </div>
                </Link>
                <Link href='/dashboard/expenses'>
                    <div className={`text-light p-4 ${checkActiveRoute('/dashboard/expenses') && `bg-light-plus rounded-lg dark:bg-dark-plus`}`}>
                        <MoneySend size="27" color={checkActiveRoute('/dashboard/expenses') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/expenses') ? "Bulk" : "Outline"}/>
                    </div>
                </Link>
                <Link href='/dashboard/income'>
                    <div className={`text-light p-4 ${checkActiveRoute('/dashboard/income') && `bg-light-plus rounded-lg dark:bg-dark-plus`}`}>
                        <EmptyWallet size="27" color={checkActiveRoute('/dashboard/income') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/income') ? "Bulk" : "Outline"}/>
                    </div>
                </Link>
                <Link href='/dashboard/wish'>
                    <div className={`text-light p-4 ${checkActiveRoute('/dashboard/wish') && `bg-light-plus rounded-lg dark:bg-dark-plus`}`}>
                        <Bag2 size="27" color={checkActiveRoute('/dashboard/wish') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/wish') ? "Bulk" : "Outline"}/>
                    </div>
                </Link>
                <Link href='/dashboard/profile'>
                    <div className={`text-light p-4 ${checkActiveRoute('/dashboard/profile') && `bg-light-plus rounded-lg dark:bg-dark-plus`}`}>
                        <UserSquare size="27" color={checkActiveRoute('/dashboard/profile') ? '#3B82F6' : dark ? 'white' : 'black'} variant={checkActiveRoute('/dashboard/profile') ? "Bulk" : "Outline"}/>
                    </div>
                </Link>

            </div>

            <div className={`text-light p-4 rounded-lg `}>
                <Logout size="27" color={dark ? 'white' : 'black'} variant="Outline" onClick={() => setLogoutModal(true)}/>
            </div>

            {
                logoutModal &&
                <LogoutModal
                    onClose={() => setLogoutModal(false)}
                    loading={false}
                    handleSubmit={handleLogout}
                />
            }
        </div>
    )
}

export default Menu