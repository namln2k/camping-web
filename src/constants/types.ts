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
