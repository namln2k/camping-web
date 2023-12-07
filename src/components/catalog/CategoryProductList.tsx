'use client'

import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import useCategoryProducts from '@/hooks/catalog/useCategoryProducts'
import { upsertQueryParam, upsertQueryParams } from '@/util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Pagination from '../Pagination'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'

interface Props {
  categoryId: string | number
}

export default function CategoryProductList({ categoryId }: Props) {
  const [currentPage, setCurrentPage] = useState<number | undefined>()
  const [filter, setFilter] = useState<string | undefined>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [productsData, error, refetch] = useCategoryProducts(
    categoryId,
    currentPage || 1,
    filter
  )

  useEffect(() => {
    const pageNumber = searchParams.get('page')

    if (pageNumber) {
      setCurrentPage(Number(pageNumber))
    }

    const filterParam = searchParams.get('filter')
  }, [searchParams])

  useEffect(() => {
    if (currentPage) {
    }
  }, [currentPage, refetch])

  const handleFilterChange = useCallback(
    (filter: Record<string, string>) => {
      const cloneFilter = { ...filter }

      for (const key in cloneFilter) {
        cloneFilter[key] = cloneFilter[key].slice(1, -1).replace(/"/g, '')
      }

      router.push(pathname + '?' + upsertQueryParams(searchParams, cloneFilter))
    },
    [pathname, router, searchParams]
  )

  return productsData?.items?.length ? (
    <>
      <div className="mt-14 md:flex">
        <div className="w-full md:w-[20%]">
          <h3 className="my-4">Shopping options</h3>
          <div className="mt-8">
            <ProductFilter onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="w-full md:w-[80%] pl-0 md:pl-12 ">
          <div className="px-0 md:pl-16 md:pr-24">
            <Pagination
              currentPage={currentPage || 1}
              pageSize={PRODUCT_LISTING_PAGE_SIZE}
              totalCount={productsData.total_count}
              onPageChange={(page) => {
                router.push(
                  pathname + '?' + upsertQueryParam(searchParams, 'page', page)
                )
              }}
            />
          </div>
          <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {productsData?.items.map((product) => (
              <li key={product.uid}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  ) : (
    <>No products found!</>
  )
}
