import { Dislike, Like1, MedalStar } from 'iconsax-react';
import React from 'react'
import { useGetUserDetailsQuery } from '../../../redux/features/user/userApi.slice';

const Discipline = () => {
    const { data: userData } = useGetUserDetailsQuery();
    const user = userData?.user

    return (
        <div className='hidden mf:flex flex-col gap-y-8'>
            <h2>Discipline Level</h2>
            <div className='flex gap-x-12 items-center flex-1'>
                <h1 className='text-[4vw]'>
                    {user?.disciplineLevel?.toFixed(2)}
                </h1>
                {
                    user?.disciplineLevel! >= 4.00  ? 
                    <div className='flex flex-col gap-y-2 items-center'>
                        <MedalStar size="32" color="#3B82F6" variant="Bold"/>
                        <p className='text-dark dark:text-light'>Excellent</p>
                    </div>
                    :
                    user?.disciplineLevel! >= 3.00  ?
                    <div className='flex flex-col gap-y-2 items-center'>
                        <Like1 size="32" color="#3B82F6" variant="Bold"/>
                        <p className='text-dark dark:text-light'>Good. Try harder</p>
                    </div>
                    :
                    <div className='flex flex-col gap-y-2 items-center'>
                        <Dislike size="32" color="#3B82F6" variant="Bold"/>
                        <p className='text-dark dark:text-light'>Bad. Be Strict</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Discipline