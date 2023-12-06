'use client'

import useCategoryProducts from '@/hooks/catalog/useCategoryProducts'

interface Props {
  categoryId: string | number
}

export default function CategoryProductList({ categoryId }: Props) {
  const [productsData, error] = useCategoryProducts(categoryId)

  return (
    <>
      <p>Page info:</p>
      <div>
        <pre>{JSON.stringify(productsData.page_info, null, 4)}</pre>
      </div>
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
