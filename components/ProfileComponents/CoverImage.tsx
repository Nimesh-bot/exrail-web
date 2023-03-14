import React from 'react'
import Image from 'next/image'
import { useGetUserDetailsQuery, useUpdateUserImageMutation } from '../../redux/features/user/userApi.slice';
import { Camera } from 'iconsax-react';
import { FlatButton, PrimaryButton, PromiseButton } from '../Buttons';
import { ErrorToastMessages, SuccessToastMessages } from '../../lib/toasts/ToastMessages';

const CoverImage = () => {
    const { data: userData, isLoading: getLoading, isFetching } = useGetUserDetailsQuery();
    const user = userData?.user

    const [image, setImage] = React.useState<File | null>(null);
    const [hover, setHover] = React.useState(false);

    const [updateUserImage, { isLoading }] = useUpdateUserImageMutation();

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('image', image!);

        if (image) {
            updateUserImage(formData).unwrap().then(() => {
                setImage(null);
                SuccessToastMessages('Image updated successfully')
            }).catch((err: any) => {
                console.log(err);
                ErrorToastMessages(err.response.data.message || 'Something went wrong');
            });
        }
    }

    console.log('image', user?.image?.img_url);
    

    return (
        <div className='space-y-8'>
            <div>
                <h2>User Avatar</h2>
                <p>Update a new look for your profile.</p>
            </div>
            <div className='flex gap-x-12 items-end'>
                <div className='w-32 h-32 rounded-full relative'>
                    {
                        image ? 
                        <Image src={URL.createObjectURL(image)} width={100} height={100} alt={'cover photo'} className='rounded-full w-full h-full object-cover' />
                        :
                        getLoading || isFetching ?
                        <div className='w-32 h-32 rounded-full bg-primary animate-pulse' />
                        :
                        user?.image?.img_url === "" ?
                        <div className='w-32 h-32 rounded-full bg-primary'>
                            <div className='flex justify-center items-center h-full'>
                                <h2 className='font-bold'>
                                    {user?.name.split('')[0].toUpperCase()}
                                    {user?.name.split('')[1].toUpperCase()}
                                </h2>
                            </div>
                        </div>
                        :
                        <Image src={user?.image?.img_url!} width={100} height={100} alt={'cover photo'} className='rounded-full w-full h-full object-cover' />
                    }
                    <label htmlFor='coverImage' className='opacity-100'>
                        <div className={`p-2 absolute -bottom-2 -right-2 rounded-full ${hover ? 'bg-primary' : 'bg-inputBgLight dark:bg-inputBgDark'}`}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <Camera color={hover ? '#f7f7f7' : '#3B82F6'} variant="Bulk"/>
                        </div>
                    </label>
                    <input id='coverImage' type="file" className='hidden' onChange={(e) => setImage(e.target.files![0])} />
                </div>
                {
                    image &&
                    <div className='space-y-2'>
                        <p>We detected that you have changed your avatar.</p>
                        <div className='space-x-12'>
                            {
                                isLoading ?
                                <PromiseButton
                                    text=''
                                />
                                :
                                <PrimaryButton 
                                    text='Update Avatar'
                                    onClick={handleSubmit}
                                />
                            }
                            <FlatButton
                                text='Discard'
                                onClick={() => setImage(null)}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CoverImage