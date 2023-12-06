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
