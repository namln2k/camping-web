import { SearchResult } from "@/types/query"

export interface BreadCrumbNode {
  category_id: number
  category_uid: string
  category_name: string
  category_level: number
  category_url_key: string
}

export interface CategoryNode {
  id: number
  uid: string
  level: number
  name: string
  path: string
  url_path: string
  url_key: string
  breadcrumbs?: BreadCrumbNode[]
  children_count?: number
  children?: CategoryNode[]
  is_active?: boolean
}

export interface CategoryDetail {
  id: number
  uid: string
  level: number
  name: string
  path: string
  url_path: string
  url_key: string
  breadcrumbs?: BreadCrumbNode[]
}

export interface CategoryProduct {
  sku: string
  uid: string
  name: string
  image: {
    url: string
    label: string
  }
  price_range: ProductPrice
  review_count: number
  rating_summary: number
}

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

export interface CategoryProducts {
  products: SearchResult<CategoryProduct>
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

export interface ProductDetail {
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
  media_gallery_entries: [
    {
      disabled: boolean
      file: string
      label: string
      position: number
      uid: string
    }
  ]
  price_range: ProductPrice
  review_count: number
  rating_summary: number
  configurable_options: [
    {
      attribute_code: string
      attribute_id: string
      label: string
      uid: string
    }
  ]
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
