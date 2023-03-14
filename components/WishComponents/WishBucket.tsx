import { Trash } from 'iconsax-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { SuccessToastMessages } from '../../lib/toasts/ToastMessages';
import { useGetUserDetailsQuery } from '../../redux/features/user/userApi.slice';
import { useDeleteWishMutation, useGetWishQuery } from '../../redux/features/wish/wishApi.slice'
import DeleteModal from './DeleteModal';

const WishBucket = () => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    const { data: wishData } = useGetWishQuery();
    const wish: Wish.IWish = wishData?.wish[0]!;

    const [ deleteWish, { isLoading: deleteLoading } ] = useDeleteWishMutation();

    const handleDelete = () => {
        deleteWish(wish?._id!).unwrap().then(() => {
            setDeleteModal(false);
            SuccessToastMessages('Wish Deleted Successfully');
        })
    }

    return (
        <>
            <div className='w-full flex gap-x-12'>
                <div className='w-full md:w-3/4 lg:w-1/4 h-[calc(100vh-300px)] rounded-xl relative'>
                    <Image src={wish?.image!} alt='wish' width={500} height={500} 
                        className='rounded-xl w-full h-full object-cover object-center absolute top-0 left-0 z-20'
                    />
                    <div className='wish-card-gradient w-full h-full absolute top-0 left-0 rounded-xl z-50 flex flex-col justify-between items-end p-6'>
                        <div className='p-2 rounded-full bg-red-500 hover:bg-light border border-[#fa1e4725] hover:backdrop-blur-[4px] cursor-pointer' 
                            onMouseEnter={() => setHover(true)} 
                            onMouseLeave={() => setHover(false)}
                            onClick={() => setDeleteModal(true)}
                        >
                            <Trash
                                size="21"
                                color={hover ? "#fa1e47" : "#eeeeee"}
                                variant="Bulk"
                            />
                        </div>
                        <ProgressBar wishPrice={wish?.price} wishName={wish?.productName} />
                    </div>
                    <div className='hidden md:flex z-10 h-[95%] w-[90%] rounded-xl rotate-6 absolute top-1/2 -translate-y-1/2 -right-4'>
                        <Image src={wish?.image!} alt='wish' width={500} height={500} 
                            className='rounded-xl w-full h-full object-cover object-center absolute top-0 left-0 z-20 grayscale brightness-50'
                        />
                    </div>
                    <div className='hidden md:flex z-10 h-[95%] w-[90%] rounded-xl rotate-3 absolute top-1/2 -translate-y-1/2 -right-2'>
                        <Image src={wish?.image!} alt='wish' width={500} height={500} 
                            className='rounded-xl w-full h-full object-cover object-center absolute top-0 left-0 z-20 grayscale brightness-50'
                        />
                    </div>
                </div>
            </div>

            {
                deleteModal && <DeleteModal 
                    onClose={() => setDeleteModal(false)}
                    handleSubmit={handleDelete}
                    loading={deleteLoading}
                />
            }
        </>
    )
}

const ProgressBar = ({ wishPrice, wishName }: { wishPrice: number, wishName: string }) => {
    const { data: userData } = useGetUserDetailsQuery();

    const Progress = styled.div`
        width: ${userData?.user?.balance! === 0 ? '0' : userData?.user?.balance! >= wishPrice ? '100%' : (Math.floor((userData?.user?.balance! / wishPrice) * 100)).toString() + '%'};
    `

    // const progressPercentage = () => {
    //     if(userData?.user?.balance! === 0) return (0).toString();
    //     else if(userData?.user?.balance! >= wishPrice) return (100).toString();
    //     else return (Math.floor((userData?.user?.balance! / wishPrice) * 100)).toString();
    // };

    return (
        <div className='w-full flex flex-col gap-y-2'>
            <h1 className='text-dark'>{wishName}</h1>
            <h3 className='text-dark opacity-100'>Progress</h3>
            <div className='w-full h-4 bg-light-plus border border-[#14141525] rounded-xl relative'>
                <Progress className={`h-full bg-primary rounded-xl absolute top-0 left-0`}></Progress>
            </div>
            <div className='w-full flex justify-end'>
                <p className='text-dark font-medium opacity-100'><span className='text-primary'>{userData?.user?.balance!}</span> / {wishPrice}</p>
            </div>
        </div>
    )
}

export default WishBucket