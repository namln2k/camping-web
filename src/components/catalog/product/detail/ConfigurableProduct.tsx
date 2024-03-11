import ProductGallery from '@/components/catalog/product/ProductGallery'
import ProductPartialPrice from '@/components/catalog/product/ProductPartialPrice'
import ProductRating from '@/components/catalog/product/ProductRating'
import Swatch from '@/components/catalog/product/detail/Swatch'
import { PRODUCT_IMAGE_PLACEHOLDER } from '@/constants'
import useAddToCart from '@/hooks/cart/add/useAddToCart'
import { GalleryEntry, ProductDetail } from '@/types'
import {
  SelectedOption,
  findVariantBySelectedOptions,
} from '@/util/catalog/product'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  product: ProductDetail
  className?: string
}

export default function ConfigurableProduct({
  product,
  className = '',
}: Props) {
  const {
    name: productName,
    price_range,
    category,
    rating_summary,
    review_count,
    variants,
    configurable_options,
    media_gallery_entries,
  } = product

  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])
  const [selectedProductSku, setSelectedProductSku] = useState<string>()
  const [mainProductGallery, setMainProductGallery] = useState<GalleryEntry[]>(
    media_gallery_entries
  )
  const [childProductGallery, setChildProductGallery] = useState<
    GalleryEntry[]
  >([])
  const addToCartAction = useAddToCart()

  const findSelectedOptionIndex = (
    option: SelectedOption,
    selectedOptions: SelectedOption[]
  ) => {
    return selectedOptions.findIndex((selectedOption) => {
      return selectedOption.attributeCode === option.attributeCode
    })
  }

  const isSelected = useCallback(
    (option: SelectedOption) => {
      return selectedOptions.findIndex((selectedOption) => {
        return (
          selectedOption.attributeCode === option.attributeCode &&
          selectedOption.valueUid === option.valueUid
        )
      })
    },
    [selectedOptions]
  )

  const handleOptionSelect = useCallback(
    (selectedOption: SelectedOption) => {
      setSelectedOptions(() => {
        // Find selected option with exact attribute code. If exists, replace it with new selected option. Otherwise, add new selected option.
        const selectedOptionIndex = findSelectedOptionIndex(
          selectedOption,
          selectedOptions
        )

        if (selectedOptionIndex > -1) {
          return [
            ...selectedOptions.slice(0, selectedOptionIndex),
            selectedOption,
            ...selectedOptions.slice(selectedOptionIndex + 1),
          ]
        } else {
          return [...selectedOptions, selectedOption]
        }
      })
    },
    [setSelectedOptions, selectedOptions]
  )

  useEffect(() => {
    // Find variant by selected productSku
    const selectedVariant = variants.find(
      (variant) => variant.product.sku === selectedProductSku
    )

    if (selectedVariant) {
      setChildProductGallery(
        selectedVariant.product.media_gallery_entries
          .map((entry) => ({
            ...entry,
            url: entry.file
              ? `${process.env.MAGENTO_BASE_MEDIA_CATALOG_PRODUCT_URL}${entry.file}`
              : PRODUCT_IMAGE_PLACEHOLDER,
          }))
          .sort((a, b) => a.position - b.position)
          .filter((entry) => entry.disabled === false)
      )
    }
  }, [selectedProductSku, setMainProductGallery, variants])

  const renderConfigurableOptions = useCallback(() => {
    return configurable_options.map((option) => {
      const { attribute_code, label, values } = option
      return (
        <div key={attribute_code} className={`mb-4 ${className}`}>
          <h3 className='mb-2 text-sm font-semibold text-gray-600 uppercase'>
            {label}
          </h3>
          <div className='flex flex-wrap'>
            {values.map((value) => {
              const { uid, label, swatch_data } = value
              const optionData = {
                attributeCode: attribute_code,
                valueUid: uid,
              }

              return (
                <div
                  key={uid}
                  className='flex flex-wrap gap-2 p-2'
                  onClick={() => handleOptionSelect(optionData)}
                >
                  {swatch_data ? (
                    <div
                      className={
                        'w-12 h-12 hover:shadow-[0_0_6px_0_rgb(71,139,255)] rounded'
                      }
                    >
                      <Swatch
                        {...swatch_data}
                        key={uid}
                        selected={isSelected(optionData) > -1}
                      />
                    </div>
                  ) : (
                    <div
                      key={uid}
                      className='flex items-center justify-center w-12 h-12 mr-4 mb-4 text-sm text-center text-gray-700 bg-gray-100 border rounded-full cursor-pointer hover:shadow-[0_0_4px_0_rgb(71,139,255)]'
                    >
                      {label}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }, [configurable_options, handleOptionSelect, isSelected, className])

  useEffect(() => {
    const matchedVariant = findVariantBySelectedOptions(
      variants,
      selectedOptions
    )

    if (matchedVariant) {
      setSelectedProductSku(matchedVariant.product.sku)
    }
  }, [selectedOptions, variants])

  return (
    <div className='flex flex-wrap mb-24 -mx-4'>
      <div className='w-full px-4 mb-8 md:w-[60%] md:mb-0'>
        <div className='overflow-hidden mt-8'>
          <ProductGallery
            galleryEntries={[...childProductGallery, ...mainProductGallery]}
          />
        </div>
      </div>
      <div className='w-full px-4 md:w-[40%]'>
        <div className='lg:pl-20'>
          <div className='mb-6'>
            <h2 className='max-w-xl mt-6 mb-6 text-2xl font-semibold leading-loose tracking-wide text-gray-700 md:text-3xl'>
              {productName}
            </h2>
            <h2 className='max-w-xl mt-6 mb-6 text-md text-gray-700 md:text-lg'>
              SKU:&nbsp;
              <span className='font-bold'>
                {selectedProductSku || product.sku}
              </span>
            </h2>
            <ProductPartialPrice price={price_range.maximum_price} />
            <ProductRating
              ratingSummary={rating_summary}
              reviewCount={review_count}
              className='mt-4'
            />
          </div>
          {renderConfigurableOptions()}
          <div className='flex flex-wrap items-center mb-6'>
            <div className='mb-4 mr-4 lg:mb-0'>
              <div className='w-28'>
                <div className='relative flex flex-row w-full h-10 bg-transparent rounded-lg'>
                  <input
                    type='number'
                    className='w-full text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black'
                    placeholder='1'
                  />
                </div>
              </div>
            </div>
            <div className='mb-4 lg:mb-0'>
              <button className='flex items-center justify-center p-4 mr-4 border hover:bg-blue-200 rounded-xl transition-all'>
                <HeartIcon className='w-6 h-6 text-red-500' />
              </button>
            </div>
            <button
              className='w-full p-4 text-center text-blue-800 bg-blue-200 border hover:bg-blue-400 hover:text-white lg:w-1/2 rounded-xl'
              onClick={() => {
                addToCartAction()
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
