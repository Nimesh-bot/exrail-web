import Head from 'next/head';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import WishBucket from '../../components/WishComponents/WishBucket';
import WishForm from '../../components/WishComponents/WishForm';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi.slice';
import { useGetWishQuery } from '../../redux/features/wish/wishApi.slice'

const Wish = () => {
    const { data: wishData, refetch, isLoading } = useGetWishQuery();
    const wish: Wish.IWish = wishData?.wish[0]!;

    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(!isLoading) {
            if(wish === undefined) {
                setStatus(false);
            }
            else {
                setStatus(true);
            }
        }
    }, [wish, isLoading])

    if(isLoading) {
        return (
            <section className='w-full custom-container flex justify-center items-center rounded-xl'>
                <Loader />
            </section>
        )
    }

    return (
        <>
            <Head>
                <title>Wish Bucket</title>
            </Head>
            <section className='w-full custom-container flex gap-x-24 rounded-xl overflow-auto'>
                <div className='w-full flex flex-col gap-y-8'>
                    <div>
                        <h1>Wish Bucket</h1>
                        <p>Focus on a single goal and reach it.</p>
                    </div>
                    {
                        status ? 
                        <WishBucket />
                        :
                        <WishForm />
                    }
                </div>
            </section>
        </>
    )
}

export default Wish