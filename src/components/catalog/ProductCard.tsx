import { Product } from '@/types'
import Image from 'next/image'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <>
      <div className="w-[240px] h-auto">
        <Image
          src={product?.image.url}
          alt={product.name}
          width={240}
          height={400}
        />
      </div>
      <div>
        <h3>{product.name}</h3>
        <div>
          From&nbsp;
          <span>{product.price_range.minimum_price.final_price.value}</span>
        </div>
      </div>
    </>
  )
}
