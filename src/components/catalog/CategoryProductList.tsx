'use client'

import useCategoryProducts from '@/hooks/catalog/useCategoryProducts'
import Pagination from '../Pagination'
import { useEffect, useState } from 'react'
import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'

interface Props {
  categoryId: string | number
}

export default function CategoryProductList({ categoryId }: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const [productsData, error, refetch] = useCategoryProducts(
    categoryId,
    currentPage
  )

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  return (
    <>
      <p>Page info:</p>
      <div>
        <pre>Total count: {productsData.total_count}</pre>
        <pre>{JSON.stringify(productsData.page_info, null, 4)}</pre>
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={PRODUCT_LISTING_PAGE_SIZE}
        totalCount={productsData.total_count}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <div className="my-40"></div>
      <p>Products:</p>
      <ul>
        {productsData?.items?.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
          </li>
        ))}
      </ul>
    </>
  )
}
