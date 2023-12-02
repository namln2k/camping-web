import { Error } from '@/constants/types'
import { useFetch } from '@/hooks'
import { sanitizeBlockContent } from '@/util'

interface CmsBlock {
  active: boolean
  content: string
  id: number
  identifier: string
  title: string
  creation_time?: string
  update_time?: string
}

interface CmsBlockSearchResult {
  items: CmsBlock[]
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

export const CMS_BLOCKS = ['homePageBlock']

const queryBlockByIdentifier = (identifier: string) => {
  return `cmsBlock/search?searchCriteria[sortOrders][0][direction]=ASC&searchCriteria[filterGroups][0][filters][0][field]=identifier&searchCriteria[filterGroups][0][filters][0][value]=${identifier}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq`
}

export default function useHome(): [string[], boolean, [] | Error[]] {
  const cmsBlocks: string[] = []

  const [homePageBlocks, loading, errors]: [
    CmsBlockSearchResult,
    boolean,
    Error[] | []
  ] = useFetch('GET', queryBlockByIdentifier('home-page-block'))

  // Return block content only if there is exactly one block found with given identifier
  if (
    Array.isArray(homePageBlocks?.items) &&
    homePageBlocks?.items.length === 1
  ) {
    const blockContent = homePageBlocks.items[0].content
    cmsBlocks.push(sanitizeBlockContent(blockContent))
  }

  return [cmsBlocks, loading, errors]
}
