import { gql } from '@apollo/client'

export const cmsBlocksQuery = gql`
  query cmsBlocks($identifiers: [String]!) {
    cmsBlocks(identifiers: $identifiers) {
      items {
        identifier
        title
        content
      }
    }
  }
`
