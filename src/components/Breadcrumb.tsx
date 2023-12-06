import { BreadCrumbNode, CategoryDetail } from '@/types'
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

              {index < breadcrumb.length - 1 && <span>&emsp;{'>'}&emsp;</span>}
            </React.Fragment>
          ))}
          <span>&emsp;{'>'}&emsp;</span>
        </>
      )}
      <span className="text-gray-600">{currentNode?.name}</span>
    </>
  )
}
