import ProductGallery from "@/components/catalog/product/ProductGallery";
import ProductPartialPrice from "@/components/catalog/product/ProductPartialPrice";
import ProductRating from "@/components/catalog/product/ProductRating";
import Swatch from "@/components/catalog/product/detail/Swatch";
import { ProductDetail, ProductVariant } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface Props {
    product: ProductDetail
    className?: string
}

interface SelectedOption {
    attributeCode: string
    valueUid: string
}

const findVariantBySelectedOptions = (variants: ProductVariant[], selectedOptions: SelectedOption[]): ProductVariant | null => {
    let result = null

    variants.forEach((variant) => {
        const { attributes } = variant

        const matched = attributes.every((attribute) => {
            const { code, uid } = attribute
            const selectedOption = selectedOptions.find((option) => {
                return option.attributeCode === code && option.valueUid === uid
            })
            return selectedOption
        })

        if (matched) {
            result = variant
        }
    })

    return result
}

export default function ConfigurableProduct({ product, className = '' }: Props) {
    const {
        name: productName,
        price_range,
        category,
        rating_summary,
        review_count,
        variants,
        configurable_options,
        media_gallery_entries
    } = product

    const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([])
    const [selectedProductSku, setSelectedProductSku] = useState<string>()
    const [mediaGalleryEntries, setMediaGalleryEntries] = useState(media_gallery_entries)

    const findSelectedOptionIndex = (option: SelectedOption, selectedOptions: SelectedOption[]) => {
        return selectedOptions.findIndex((selectedOption) => {
            return selectedOption.attributeCode === option.attributeCode
        })
    }

    const isSelected = useCallback((option: SelectedOption) => {
        return selectedOptions.findIndex((selectedOption) => {
            return selectedOption.attributeCode === option.attributeCode && selectedOption.valueUid === option.valueUid
        })
    }, [selectedOptions])

    const handleOptionSelect = useCallback((selectedOption: SelectedOption) => {
        setSelectedOptions(() => {
            // Find selected option with exact attribute code. If exists, replace it with new selected option. Otherwise, add new selected option.
            const selectedOptionIndex = findSelectedOptionIndex(selectedOption, selectedOptions)

            if (selectedOptionIndex > -1) {
                return [
                    ...selectedOptions.slice(0, selectedOptionIndex),
                    selectedOption,
                    ...selectedOptions.slice(selectedOptionIndex + 1)
                ]
            } else {
                return [...selectedOptions, selectedOption]
            }
        })
    }, [setSelectedOptions, selectedOptions])

    useEffect(() => {
        // TODO: Get child product's media gallery entries

    }, [selectedProductSku, setMediaGalleryEntries])


    const renderConfigurableOptions = useCallback(() => {
        return configurable_options.map((option) => {
            const { attribute_code, label, values } = option
            return (
                <div key={attribute_code} className="mb-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-600 uppercase">
                        {label}
                    </h3>
                    <div className="flex flex-wrap">
                        {values.map((value) => {
                            const { uid, label, swatch_data } = value
                            const optionData = { attributeCode: attribute_code, valueUid: uid }

                            return (
                                <div key={uid} className="flex flex-wrap gap-2 p-2" onClick={() => handleOptionSelect(optionData)}>
                                    {swatch_data ? (
                                        <div
                                            className={`w-12 h-12 hover:shadow-[0_0_6px_0_rgb(71,139,255)] rounded 
                                            ${isSelected(optionData) > -1 ? 'border-2 border-red-500' : ''}`}
                                        >
                                            <Swatch {...swatch_data} key={uid} />
                                        </div>
                                    ) : (
                                        <div
                                            key={uid}
                                            className={`flex items-center justify-center w-12 h-12 mr-4 mb-4 text-sm text-center text-gray-700 bg-gray-100 border rounded-full cursor-pointer hover:shadow-[0_0_4px_0_rgb(71,139,255)] 
                                            ${isSelected(optionData) > -1 ? 'border-2 border-red-500' : ''}`}
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
    }, [configurable_options, handleOptionSelect, isSelected])

    useEffect(() => {
        const matchedVariant = findVariantBySelectedOptions(variants, selectedOptions)

        if (matchedVariant) {
            setSelectedProductSku(matchedVariant.product.sku)
        }
    }, [selectedOptions, variants])

    return (
        <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-[60%] md:mb-0">
                <div className="overflow-hidden mt-8">
                    <ProductGallery galleryEntries={media_gallery_entries} />
                </div>
            </div>
            <div className="w-full px-4 md:w-[40%]">
                <div className="lg:pl-20">
                    <div className="mb-6">
                        <h2 className="max-w-xl mt-6 mb-6 text-2xl font-semibold leading-loose tracking-wide text-gray-700 md:text-3xl">
                            {productName}
                        </h2>
                        <ProductPartialPrice price={price_range.maximum_price} />
                        <ProductRating ratingSummary={rating_summary} reviewCount={review_count} />
                    </div>
                    {renderConfigurableOptions()}
                    <div className="flex flex-wrap items-center mb-6">
                        <div className="mb-4 mr-4 lg:mb-0">
                            <div className="w-28">
                                {/* <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                        <span className="m-auto text-2xl font-thin">-</span>
                                    </button>
                                    <input
                                        type="number"
                                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                                        placeholder="1"
                                    />
                                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                        <span className="m-auto text-2xl font-thin">+</span>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                        <div className="mb-4 lg:mb-0">
                            <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 hover:bg-blue-600 hover:border-blue-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className=" bi bi-heart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                </svg>
                            </button>
                        </div>
                        <button
                            className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                            disabled
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}