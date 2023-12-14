import { Product } from '@/types'
import Image from 'next/image'
import ProductPrice from './ProductPrice'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="cursor-pointer hover:scale-110 transition-all shadow hover:shadow-lg border rounded-xl p-4">
      <div className="h-auto">
        <Image
          src={product?.image.url}
          alt={product.name}
          width={280}
          height={400}
        />
      </div>
      <div className="p-8 mt-4">
        <h3 className="pb-4">{product.name}</h3>
        <div>
          From&nbsp;
          <ProductPrice priceRange={{ ...product.price_range }} />
        </div>
      </div>
    </div>
  )
}
