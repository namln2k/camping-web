'use client'

import { remove, subtractDuration } from '@/lib/redux/features/messages/messagesSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { DURATION_CHECK_INTERVAL } from '@/types'
import { CheckBadgeIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

const background = (type?: string) => {
    switch (type) {
        case 'success':
        default:
            return 'bg-green-600'
        case 'error':
            return 'bg-red-500'
        case 'info':
            return 'bg-gray-500'
        case 'warning':
            return 'bg-orange-500'
    }
}

const icon = (type?: string) => {
    switch (type) {
        case 'success':
        default:
            return (
                <CheckBadgeIcon className='w-6 h-6' />
            )
        case 'error':
            return (
                <XCircleIcon className='w-6 h-6' />
            )
        case 'info':
            return (
                <InformationCircleIcon className='w-6 h-6' />
            )
        case 'warning':
            return (
                <ExclamationCircleIcon className='w-6 h-6' />
            )
    }
}

export default function GlobalMessage() {
    const messages = useAppSelector((state) => state.messages)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i]

                if (message.duration === 0) {
                    dispatch(remove(message.id))
                } else {
                    dispatch(subtractDuration(message.id))
                }
            }
        }, DURATION_CHECK_INTERVAL)

        return () => {
            clearInterval(interval)
        }
    }, [dispatch, messages])

    return (
        <div className='fixed inset-0 z-50 w-fit mx-auto h-fit pt-4 px-8 flex flex-col items-center justify-center gap-4'>
            {messages.map((message, index) => {
                const { type, title, content, id } = message

                return (
                    <div key={index} className={`w-fit lg:w-auto lg:min-w-[800px] lg:max-w-[75%] border rounded-lg flex items-center justify-between gap-4 ${background(type)} bg-opacity-95 max-h-36 px-3 py-3 text-white`}>
                        <div className='w-fit flex gap-2 items-center'>
                            {icon(type)}
                            <div className='w-fit text-justify'>
                                {title && <p className='text-base font-bold block w-fit'>{title}</p>}
                                {content && <p className='text-sm block w-fit'>{content}</p>}
                            </div>
                        </div>
                        <XMarkIcon className='w-7 h-7 cursor-pointer' onClick={() => dispatch(remove(id))} />
                    </div>
                )
            })}
        </div>
    )
}