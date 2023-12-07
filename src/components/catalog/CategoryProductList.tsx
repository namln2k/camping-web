'use client'

import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import useCategoryProducts from '@/hooks/catalog/useCategoryProducts'
import { useEffect, useState } from 'react'
import Pagination from '../Pagination'

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

  return productsData?.items?.length ? (
    <>
      <ul>
        {productsData?.items.map((product) => (
          <li key={product.id}>
            <h4>{product.name}</h4>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        pageSize={PRODUCT_LISTING_PAGE_SIZE}
        totalCount={productsData.total_count}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  ) : (
    <>No products found!</>
  )
}
