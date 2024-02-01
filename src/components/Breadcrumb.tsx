'use client'

import { BreadCrumbNode } from '@/types'
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  breadcrumb: BreadCrumbNode[] | undefined
  currentNode: string
}

export default function BreadCrumb({ breadcrumb = [], currentNode }: Props) {
  const router = useRouter()

  return (
    <div className='flex flex-col gap-4'>
      <div
        className='w-fit flex items-center justify-center gap-2 cursor-pointer border-b border-transparent hover:border-black transition-all'
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className='inline-block w-5 h-5' />
        <span className='text-lg'>Back</span>
      </div>
      {breadcrumb?.length && (
        <div>
          <span className=''>
            {breadcrumb?.map((node, index) => (
              <React.Fragment key={index}>
                <Link
                  href={`/category/${node.category_url_key}`}
                  className='hover:underline hover:text-blue-700 transition-all'
                >
                  <span>{node.category_name}</span>
                </Link>

                {index < breadcrumb.length - 1 && (
                  <span className='mx-3'>
                    <ChevronRightIcon className='inline-block w-5 h-5 mb-1' />
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className='mx-3'>
              <ChevronRightIcon className='inline-block w-5 h-5 mb-1' />
            </span>
          </span>
          <span className='text-gray-600'>{currentNode}</span>
        </div>
      )}
    </div>
  )
}
