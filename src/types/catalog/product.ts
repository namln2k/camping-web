import { BreadCrumbNode } from "."

export interface ProductPrice {
  minimum_price: {
    regular_price: {
      value: number
      currency: string
    }
    final_price: {
      value: number
      currency: string
    }
    discount: {
      amount_off: number
      percent_off: number
    }
  }
  maximum_price: {
    regular_price: {
      value: number
      currency: string
    }
    final_price: {
      value: number
      currency: string
    }
    discount: {
      amount_off: number
      percent_off: number
    }
  }
}

export interface ProductAggregationOption {
  label: string
  value: string
}

export interface ProductAggregation {
  attribute_code: string
  count: number
  label: string
  options: ProductAggregationOption[]
}

export interface SwatchData {
  __typename: string
  value: string
}

export interface ConfigurableOption {
  attribute_code: string
  attribute_id: string
  label: string
  uid: string
  values: [
    {
      uid: string
      default_label: string
      label: string
      store_label: string
      use_default_value: boolean
      value_index: number
      swatch_data?: SwatchData
    }
  ]
}

export interface GalleryEntry {
  disabled: boolean
  file: string
  label: string
  position: number
  uid: string
  url?: string
}

export interface ProductDetail {
  __typename: string
  sku: string
  uid: string
  name: string
  categories: [
    {
      uid: string
      category_name: string
      category_level: number
      breadcrumbs: BreadCrumbNode[]
    }
  ]
  category?: {
    uid: string
    category_name: string
    category_level: number
    breadcrumbs: BreadCrumbNode[]
  } // Custom attribute for breadcrumb in product detail page
  description: {
    html: string
  }
  short_description: {
    html: string
  }
  image: {
    url: string
    label: string
  }
  media_gallery_entries: GalleryEntry[]
  price_range: ProductPrice
  review_count: number
  rating_summary: number
  configurable_options: ConfigurableOption[]
  custom_attributes: [
    {
      attribute_metadata: string
      entered_attribute_value: string
      selected_attribute_options: [
        {
          attribute_option: {
            is_default: boolean
            label: string
            uid: string
          }
        }
      ]
    }
  ]
  variants: [
    {
      attributes: [
        {
          code: string
          value_index: number
        }
      ]
      product: {
        uid: string
        media_gallery_entries: [
          {
            uid: string
            disabled: boolean
            file: string
            label: string
            position: number
          }
        ]
        sku: string
        stock_status: number
        price: {
          regularPrice: {
            amount: {
              currency: string
              value: number
            }
          }
        }
        price_range: {
          maximum_price: {
            final_price: {
              currency: string
              value: number
            }
            discount: {
              amount_off: number
            }
          }
        }
      }
    }
  ]
}
