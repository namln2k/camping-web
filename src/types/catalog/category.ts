import { ProductPrice } from './product'

export interface BreadCrumbNode {
  category_id: number
  category_uid: string
  category_name: string
  category_level: number
  category_url_key: string
}

export interface CategoryNode {
  uid: string
  include_in_menu: boolean
  name: string
  position: number
  url_key: string
  breadcrumbs?: BreadCrumbNode[]
  children?: CategoryNode[]
  is_active?: boolean
}

export interface CategoryList {
  categoryList: CategoryNode[]
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
