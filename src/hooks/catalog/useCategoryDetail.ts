import useQuery from '@/hooks/useQuery'
import { CategoryDetail, Error } from '@/types'
import { gql } from '@apollo/client'

export default async function useCategoryDetail(
  urlKey: string
): Promise<[CategoryDetail | undefined, Error[]]> {
  const [{ categoryList }, errors] = await useQuery(
    gql`
      query getCategoryDetail($urlKey: String!) {
        categoryList(filters: { url_key: { eq: $urlKey } }) {
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
    `,
    {
      urlKey: urlKey,
    }
  )

  if (errors.length) {
    return [undefined, errors]
  }

  if (categoryList.length === 1) {
    return [categoryList[0], errors]
  }

  return [
    undefined,
    [
      {
        message: `None or more than one category with id ${urlKey} found.`,
      },
    ],
  ]
}
