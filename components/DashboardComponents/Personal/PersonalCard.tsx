import { CalendarTick, Sms } from 'iconsax-react';
import Image from 'next/image'
import React from 'react'
import { useGetUserDetailsQuery } from '../../../redux/features/user/userApi.slice';

const PersonalCard = () => {
    const { data: userData } = useGetUserDetailsQuery();
    const user = userData?.user

    return (
        <div className='w-full h-max flex flex-col rounded-lg bg-light dark:bg-dark pb-8'>
            <div className='w-full h-32 relative'>
                <div className='w-full h-3/4 bg-primary rounded-lg' />
                {
                    user?.image?.img_url === "" ?
                    <div className='w-24 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 placeholder-image-gradient border-4 border-dark rounded-full flex justify-center items-center'>
                        <h2>
                            {user?.name?.substring(0, 2)}
                        </h2>
                    </div>
                    :
                    <Image 
                        src={user?.image?.img_url!} 
                        width={100} height={100} 
                        alt={'cover photo'} 
                        className='rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-24 h-24 object-cover object-top'
                    />
                }
            </div>
            <div className='w-full flex flex-col gap-y-4 px-4 pt-4'>
                <h3 className='text-center'>{user?.name}</h3>

                <div className='flex flex-col gap-y-2 mt-2'>
                    <div className='flex gap-x-2 items-center justify-center'>
                        <Sms size="24" color="#3B82F6" variant="Bulk"/>
                        <p>{user?.email}</p>
                    </div>
                    <div className='flex gap-x-2 items-center justify-center'>
                        <CalendarTick size="24" color="#3B82F6" variant="Bulk"/>
                        <p>{new Date(user?.createdAt).toDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalCard