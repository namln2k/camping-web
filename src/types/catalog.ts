import { SearchResult } from '@/types/query'

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

export interface Product {
  sku: string
  uid: string
  name: string
  image: {
    url: string
    label: string
  }
  small_image: {
    url: string
    label: string
  }
  media_gallery: [
    {
      url: string
      label: string
    }
  ]
  price_range: {
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
}

export interface CategoryProducts {
  products: SearchResult<Product>
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
