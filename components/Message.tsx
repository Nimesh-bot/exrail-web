import React, { FC, useState, useEffect } from 'react'

interface IMessage {
    severity: string
    message: string
    interaction?: string
    onClick?: () => void
}

const Message: FC<IMessage> = ({ severity, message, interaction, onClick }) => {
    const [additionalClass, setAdditionalClass] = useState('')
    
    useEffect(() => {
        if(severity === 'success') {
            setAdditionalClass('bg-green-500')
        }
        else if(severity === 'error') {
            setAdditionalClass('bg-red-500')
        }
        else if(severity === 'warning') {
            setAdditionalClass('bg-yellow-500')
        }
        else if(severity === 'info') {
            setAdditionalClass('bg-blue-500')
        }
    }, [severity])

    return (
        <div className={`p-4 rounded-md flex gap-x-4 ${additionalClass}`}>
            <p>{message}</p>
            <span onClick={onClick} className='font-bold cursor-pointer'>{interaction}</span>
        </div>
    )
}

export default Message
