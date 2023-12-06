import { BreadCrumbNode, CategoryDetail } from '@/types'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

interface Props {
  breadcrumb: BreadCrumbNode[] | undefined
  currentNode: CategoryDetail | undefined
}

export default async function BreadCrumb({
  breadcrumb = [],
  currentNode,
}: Props) {
  return (
    <>
      {breadcrumb && (
        <>
          {breadcrumb?.map((node, index) => (
            <React.Fragment key={index}>
              <Link href={`/category/${node.category_id}`}>
                <span>{node.category_name}</span>
              </Link>

              {index < breadcrumb.length - 1 && (
                <span className="mx-8">
                  <ChevronRightIcon className="inline-block w-6 h-6 mb-1" />
                </span>
              )}
            </React.Fragment>
          ))}
          <span className="mx-8">
            <ChevronRightIcon className="inline-block w-6 h-6 mb-1" />
          </span>
        </>
      )}
      <span className="text-gray-600">{currentNode?.name}</span>
    </>
  )
}
