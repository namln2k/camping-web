'use client'

import { useCategoryPage } from '@/hooks/catalog'

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const { categoryId } = params
  const { products } = useCategoryPage(categoryId)

  return (
    <>
      <div>
        <h2>Category ID {categoryId}</h2>
      </div>
      <div>
        <ul>
          {products.map((product) => (
            <li className="inline-block mx-8" key={product.id}>
              {product.sku}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
