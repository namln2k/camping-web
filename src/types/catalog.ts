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
  id: number
  sku: string
  name: string
  attribute_set_id: number
  price?: number
  status?: number
  visibility: number
  type_id?: string
  created_at?: string
  updated_at?: string
  extension_attributes?: {
    stock_item?: {
      qty?: number
      is_in_stock?: boolean
    }
    configurable_product_options: any[]
  }
  custom_attributes: {
    attribute_code: string
    value: any
  }[]
  product_links: any[]
  options: any[]
  media_gallery_entries: any[]
  tier_prices: any[]
}

export interface CategoryProducts {
  products: SearchResult<Product>
}
