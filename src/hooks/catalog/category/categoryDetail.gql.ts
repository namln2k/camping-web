import { gql } from '@apollo/client'

export const categoryDetailQuery = gql`
  query getCategoryDetail($urlKey: String!) {
    categories(filters: { url_key: { eq: $urlKey } }) {
      items {
        id
        uid
        level
        name
        path
        url_path
        url_key
        breadcrumbs {
          category_id
          category_uid
          category_name
          category_level
          category_url_key
        }
      }
    }
  }
`
