import React, { FC } from 'react'

interface ToogleProps {
    toggled: boolean
    handleToggle: () => void
}

const Toggle: FC<ToogleProps> = ({ toggled, handleToggle }) => {
  return (
    <div className='flex relative' onClick={handleToggle}>
        <div className='bg-white dark:bg-navBgDark rounded-full w-16 h-8' />
        <div 
            className={
                toggled ? 
                'w-8 h-8 absolute top-1/2 -translate-y-1/2 left-0 translate-x-full transition bg-primary rounded-full border-4 border-white dark:border-navBgDark' 
                : 
                'w-8 h-8 absolute top-1/2 -translate-y-1/2 left-0 transition bg-body dark:bg-black rounded-full border-4 border-white dark:border-navBgDark'}
            />
    </div>
  )
}

export default Toggle