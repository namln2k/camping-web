import { gql } from '@apollo/client'

export const categoryAttributesQuery = gql`
  query GetCategoryAttributes($categoryUid: String!) {
    products(filter: { category_uid: { eq: $categoryUid } }) {
      aggregations {
        label
        count
        attribute_code
        options {
          label
          value
        }
        position
      }
    }
  }
`
