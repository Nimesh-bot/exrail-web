import React, { useEffect } from 'react'
import { ErrorToastMessages, SuccessToastMessages } from '../../lib/toasts/ToastMessages'
import { useGetUserDetailsQuery, useUpdateUserNameMutation } from '../../redux/features/user/userApi.slice'
import { FlatButton, PrimaryButton, PromiseButton } from '../Buttons'
import { TextInput } from '../Inputs'

const ProfileForm = () => {
    const [name, setName] = React.useState('')

    const { data, isLoading, isFetching } = useGetUserDetailsQuery();
    const [updateUserName, { isLoading: isUpdating }] = useUpdateUserNameMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name !== '' || name !== data?.user?.name) {
            updateUserName({
                name
            }).unwrap().then(() => {
                setName('')
                SuccessToastMessages("Your name has been updated successfully.")
            }).catch((err: any) => {
                ErrorToastMessages(err.response.data.message || "Something went wrong.")
            })
        }
        else {
            ErrorToastMessages("You can't update your name with the same name.")
        }
    }

    useEffect(() => {
        if(data) {
            setName(data?.user?.name!)
        }
    }, [data])

    return (
        <div className='space-y-8'>
            <div>
                <h2>General Information</h2>
                <p>Update your general information.</p>
            </div>

            <form className='space-y-8'>
                <div className='w-full flex flex-wrap gap-x-8'>
                    <div className='w-full md:w-1/3 lg:w-1/5'>
                        <label htmlFor='firstName' className='opacity-100'>Full Name</label>
                        <TextInput 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className='mt-2'>Update your name if necessary.</p>
                    </div>
                    <div className='w-full md:w-1/3 lg:w-1/5'>
                        <label htmlFor='firstName' className='opacity-50'>Email</label>
                        <TextInput 
                            value={data?.user?.email!}
                            onChange={() => {}}
                            disabled={true}
                        />
                        <p className='mt-2'>{"You can't update your email currently."}</p>
                    </div>
                </div>
                <div className='space-x-8'>
                    {
                        isUpdating || isLoading || isFetching ? 
                        <PromiseButton
                            text=''
                        /> 
                        :
                        <PrimaryButton
                            text='Update'
                            onClick={handleSubmit}
                        />
                    }
                    {
                        name !== '' &&
                        <FlatButton text='Clear'
                            onClick={(e: React.FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                setName('')
                            }}
                        />
                    }
                </div>
            </form>
        </div>
    )
}

export default ProfileForm