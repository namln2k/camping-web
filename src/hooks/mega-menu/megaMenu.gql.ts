import { gql } from '@apollo/client'

export const megaMenuQuery = gql`
  query getMegaMenu {
    categoryList {
      uid
      name
      children {
        uid
        include_in_menu
        name
        position
        url_key
        children {
          uid
          include_in_menu
          name
          position
          url_key
          children {
            uid
            include_in_menu
            name
            position
            url_key
          }
        }
      }
    }
  }
`
