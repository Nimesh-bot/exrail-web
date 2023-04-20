import { Logout, Moon, Sun1 } from 'iconsax-react';
import React, { useState } from 'react'
import useThemeChanger from '../hooks/useThemeChanger';
import LogoutModal from '../components/LogoutModal';
import { useAppDispatch } from '../redux/hooks';
import { unauthorize } from '../redux/features/auth/auth.slice';
import { userApi } from '../redux/features/user/userApi.slice';
import { expensesApiWithoutErrorHandling } from '../redux/features/expenses/expensesApi.slice';
import { incomeApi } from '../redux/features/income/incomeApi.slice';
import { wishApi } from '../redux/features/wish/wishApi.slice';
import { persistor } from '../redux/store';

const Header = () => {
  const { dark, toggleTheme } = useThemeChanger();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

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
    <>
      <div className='w-full h-16 flex justify-between items-center sticky top-0 left-0 bg-light dark:bg-dark px-6 py-4'>
          <h2 className='text-[21px] lg:text-xl font-black text-dark dark:text-light font-[quicksand]'>exrail</h2>
          <div className='flex items-center gap-x-8'>
            <div>
              <Logout size="21" color={dark ? 'white' : 'black'} variant="Outline" onClick={() => setLogoutModal(true)}/>
            </div>
            <div onClick={() => toggleTheme()}>
              {
                dark ? 
                <Sun1 size="26" color="#f0f0f0" variant="Bulk"/>
                :
                <Moon size="26" color="#3B82F6" variant="Bulk"/>
              }
            </div>
          </div> 
      </div>
      {
        logoutModal &&
        <LogoutModal
            onClose={() => setLogoutModal(false)}
            loading={false}
            handleSubmit={handleLogout}
        />
      }
    </>
  )
}

export default Header