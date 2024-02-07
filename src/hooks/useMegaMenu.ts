import { CategoryNode, Error } from '@/types'
import { gql } from '@apollo/client'
import useQuery from './useQuery'

export default async function useMegaMenu(): Promise<
  [CategoryNode[], Error[]]
> {
  const [categories, errors] = await useQuery(
    gql`
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
  )

  return [categories?.categoryList[0]?.children || [], errors]
}
