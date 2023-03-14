import React from 'react'
import { IModalProps } from '../@types/modal'
import { FlatButton, PrimaryButton, PromiseButton } from './Buttons'

const LogoutModal = ({ loading, handleSubmit, onClose }: IModalProps) => {
  return (
    <div className='backdrop flex justify-center items-center'>
        <div className='w-11/12 md:w-1/2 lg:w-1/4 modal flex flex-col gap-12'>
            <div>
                <h1 className='text-2xl font-bold'>Are you sure?</h1>
                <p className='text-sm'>We hope you will be back again soon.</p>
            </div>

            <div className='flex justify-end gap-8'>
                {
                    loading ?
                    <PromiseButton
                        text=''
                    />
                    :
                    <PrimaryButton text='Logout' onClick={handleSubmit}/>
                }
                <FlatButton text='Cancel' onClick={onClose}/>
            </div>
        </div>
    </div>
  )
}

export default LogoutModal