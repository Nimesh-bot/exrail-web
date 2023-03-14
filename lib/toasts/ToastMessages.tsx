import React from 'react'
import toast from 'react-hot-toast'

const SuccessToastMessages = (text: string) => {
    return toast(text, 
        {
            icon: "✅",
            style: {
                borderRadius: '8px',
                background: '#1D9D6B',
                color: '#f7f7f7',
            },
        }
    )
}

const ErrorToastMessages = (text: string) => {
    return toast(text,
        {
            icon: "⛔",
            style: {
                borderRadius: '8px',
                background: '#EB1D36',
                color: '#f7f7f7',
            },
        }
    )
}

export { SuccessToastMessages, ErrorToastMessages }