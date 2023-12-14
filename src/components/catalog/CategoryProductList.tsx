'use client'

import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import useCategoryAttributes from '@/hooks/catalog/useCategoryAttributes'
import useCategoryProducts from '@/hooks/catalog/useCategoryProducts'
import { upsertQueryParam, upsertQueryParams } from '@/util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import Pagination from '../Pagination'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'

interface Props {
  categoryUid: string
}

export default function CategoryProductList({ categoryUid }: Props) {
  const [currentPage, setCurrentPage] = useState<number | undefined>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [attributeFilters, errors] = useCategoryAttributes(categoryUid)
  const applicableFilters = attributeFilters.filter((attributeFilter) => {
    return attributeFilter.attribute_code !== 'category_uid'
  })
  const [productsData, error, refetchProducts] = useCategoryProducts(
    categoryUid,
    currentPage || 1
  )

  useEffect(() => {
    const pageNumber = searchParams.get('page')

    if (pageNumber) {
      setCurrentPage(Number(pageNumber))
    }

    let filterQuery = ''
    applicableFilters.forEach((attributeFilter) => {
      const attributeValue = searchParams.get(attributeFilter.attribute_code)

      if (attributeValue) {
        filterQuery += `&${attributeFilter.attribute_code}=${attributeValue}`
      }
    })
  }, [searchParams, applicableFilters])

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
      <IntlProvider locale="en">
        <div className="mt-10 md:flex">
          <div className="w-full md:w-[20%]">
            <h3 className="my-4">Shopping options</h3>
            <div className="mt-8">
              <ProductFilter
                onFilterChange={handleFilterChange}
                attributeFilters={applicableFilters}
              />
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
                    pathname +
                      '?' +
                      upsertQueryParam(searchParams, 'page', page)
                  )
                }}
              />
            </div>
            <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-8 mt-10 mb-5">
              {productsData?.items.map((product) => (
                <li key={product.uid}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </IntlProvider>
    </>
  ) : (
    <div className="mt-10">No products found!</div>
  )
}
