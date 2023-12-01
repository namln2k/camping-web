export interface SearchResult<T> {
  items: T[]
  search_criteria: {
    filter_groups: {
      filters: {
        condition_type: string
        field: string
        value: string
      }[]
    }[]
    sort_orders: {
      direction: string
      field: string
    }[]
  }
  total_count: number
}

interface CategoryCustomAttribute {
  attribute_code: string
  value: any
}

export interface Category {
  id: number
  parent_id?: number
  name: string
  is_active: boolean
  position: number
  level: number
  children: string
  children_list: Category[]
  created_at?: string
  updated_at?: string
  path: string
  include_in_menu: boolean
  custom_attributes?: CategoryCustomAttribute[]
  is_anchor?: boolean
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
