import { Moon, Sun1 } from 'iconsax-react';
import React from 'react'
import { useThemeContext } from '../context/ThemeContextProvider'
import useThemeChanger from '../hooks/useThemeChanger';

const Header = () => {
  const { dark, toggleTheme } = useThemeChanger();

  return (
    <div className='w-full h-16 flex justify-between items-center sticky top-0 left-0 bg-light dark:bg-dark px-6 py-4'>
        <h2 className='text-[21px] lg:text-xl font-black text-dark dark:text-light font-[quicksand]'>exrail</h2>
        <div className='space-x-8'>
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
  )
}

export default Header