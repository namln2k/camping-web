import useProduct from '@/hooks/catalog/useProduct'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  sku: string
  className?: string
}

export default function ProductCard({ sku, className }: Props) {
  const [product, loading, errors] = useProduct(sku)

  if (!product || loading) {
    return <div></div>
  }

  return (
    <>
      <div
        className={`product-card group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl hover:scale-110 transition h-full pb-12 ${className}`}
      >
        <div className="bg-gray-200 sm:aspect-none group-hover:opacity-75 cursor-pointer">
          <Image
            src={`${process.env.MAGENTO_BASE_URL}/media/catalog/product${
              product.media_gallery_entries?.filter(
                (media) => media.media_type === 'image'
              )[0]?.file
            }`}
            alt={product.name}
            width={240}
            height={300}
            className="h-full w-full object-cover object-center sm:h-full sm:w-full sm:max-h-[300px]"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 px-12 py-4">
          <h3 className="font-medium text-gray-900">
            <Link href="#">{product.name}</Link>
          </h3>
          <div
            dangerouslySetInnerHTML={{
              __html: product.custom_attributes?.filter(
                (attr) => attr.attribute_code === 'description'
              )[0]?.value,
            }}
            className="description overflow-hidden text-ellipsis max-h-[120px]"
          ></div>
          {Array.isArray(
            product.extension_attributes?.configurable_product_options
          ) && (
            <>
              {product.extension_attributes?.configurable_product_options.map(
                (option, index) => {
                  return (
                    <div key={index}>
                      <h3>{option.label}</h3>
                      <ul className="flex gap-4 flex-wrap">
                        {option.values.map(
                          (value: { value_index: any }, index: number) => (
                            <li key={index}>
                              <span className="block w-16 h-12 roundex-sm shadow-sm bg-gradient-to-r from-orange-100 to-orange-300 cursor-pointer hover:from-orange-300 hover:to-orange-500 transition"></span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )
                }
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
