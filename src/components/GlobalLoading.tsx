'use client'

import { useAppSelector } from "@/lib/redux/hooks"

export default function GlobalLoading() {
    const loading = useAppSelector((state) => state.loading)

    return (
        <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${loading ? 'w-full h-screen opacity-100' : 'w-0 h-0 opacity-0'} transition-opacity bg-gray-900 bg-opacity-60 z-40`}>
            <div className="flex items-center justify-center h-full relative">
                <div className="absolute w-24 h-24 border-8 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute w-24 h-24 border-t-8 border-blue-200 rounded-full animate-spin"></div>
            </div>
        </div>
    )
}