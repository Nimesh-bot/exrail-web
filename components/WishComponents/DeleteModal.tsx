import React from 'react'
import { IModalProps } from '../../@types/modal'
import { FlatButton, PrimaryButton, PromiseButton } from '../Buttons'

const DeleteModal = ({ onClose, handleSubmit, loading }: IModalProps) => {
  return (
    <div className='backdrop flex items-center justify-center'>
        <div className='w-11/12 md:w-1/2 lg:w-1/4 modal flex flex-col gap-12'>
            <div>
                <h1 className='text-2xl font-bold'>Are you sure?</h1>
                <p className='text-sm'>This action cannot be undone.</p>
            </div>

            <div className='flex justify-end gap-8'>
                {
                    loading ?
                    <PromiseButton
                        text=''
                    />
                    :
                    <PrimaryButton text='Delete' onClick={handleSubmit}/>
                }
                <FlatButton text='Cancel' onClick={onClose}/>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal