'use client'

import Pagination from '@/components/Pagination'
import ProductFilter from '@/components/catalog/category/ProductFilter'
import ProductCard from '@/components/catalog/product/ProductCard'
import { PRODUCT_LISTING_PAGE_SIZE } from '@/constants'
import useCategoryAttributes from '@/hooks/catalog/useCategoryAttributes'
import useCategoryProducts from '@/hooks/catalog/useCategoryProducts'
import { upsertQueryParam, upsertQueryParams } from '@/util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

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
    currentPage
  )

  useEffect(() => {
    const pageNumber = searchParams.get('page')

    if (pageNumber) {
      setCurrentPage(Number(pageNumber))
    } else {
      setCurrentPage(1)
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

  return productsData?.items?.length > 0 ? (
    <div className="mt-6 md:flex">
      <div className="w-full md:w-[16%]">
        <p className="my-2 text-lg">Shopping options</p>
        <div className="mt-4 pr-4">
          <ProductFilter
            onFilterChange={handleFilterChange}
            attributeFilters={applicableFilters}
          />
        </div>
      </div>
      <div className="w-full md:w-[84%] pl-0 md:pl-8 ">
        <Pagination
          currentPage={currentPage}
          pageSize={PRODUCT_LISTING_PAGE_SIZE}
          totalCount={productsData.total_count}
          onPageChange={(page) => {
            router.push(
              pathname + '?' + upsertQueryParam(searchParams, 'page', page)
            )
          }}
        />
        <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-6 mt-10 mb-5">
          {productsData?.items.map((product) => (
            <li key={product.sku} className="h-full">
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="mt-10">No products found!</div>
  )
}
