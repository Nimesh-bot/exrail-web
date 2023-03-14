/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import styled from 'styled-components'
import { useThemeContext } from '../context/ThemeContextProvider'
import { useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'
import BottomNavigation from './BottomNavigation'
import Header from './Header'
import Menu from './Menu'

interface LayoutProps {
  children: React.ReactNode
}

const Section = styled.section`
  height: calc(100vh - 120px);
  overflow: auto;
`

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const allowedPath = ['/dashboard']
  const unauthorizedPath: string[] = ['/auth/login', '/auth/forgot', '/auth/forgot/verify', '/auth/forgot/password']
  
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth)
  const router = useRouter();

  const { dark, setDark } = useThemeContext()

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const darkMode = localStorage.getItem('darkMode')
      if(darkMode === null) {
        localStorage.setItem('darkMode', 'true')
      }
      else if(darkMode === 'true') {
        setDark?.(true)
      }
      else{
        setDark?.(false)
      }
    }
  }, [])
  
  useEffect(() => {
    if(!isLoggedIn) {
      if(unauthorizedPath.some(path => router.pathname === path)) {
        return 
      }
      else {
        router.push('/auth/login')
      }
    }
    if(isLoggedIn) {
      setTimeout(() => {
        router.push('/dashboard')
      }, 60000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" /> 

        <meta name="description" content="Ex-Rail is a service that allows its users keep track of their expenses. Ex-rail primarily targets working individuals," />
      </Head>

      <div className={`${dark ? 'dark' : 'light'}`}>
        <main className='w-full bg-light dark:bg-dark'>
            <article className='max-w-[1920px] h-screen mx-auto flex flex-col'>
              { allowedPath.some(path => router.pathname.includes(path)) && <Header />}
              <Section className='flex gap-x-4 max-w-[1920px] mt-8 px-4 xl:px-0'>
                { allowedPath.some(path => router.pathname.includes(path)) && <Menu />}
                {children}
              </Section>
              {
                allowedPath.some(path => router.pathname.includes(path)) && <BottomNavigation />
              }
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
            </article>
        </main>
      </div>
    </>
  )
}

export default Layout