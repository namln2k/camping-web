import createApolloClient from '@/lib/apollo/client'
import { QueryOptions } from '@apollo/client'

export default async function useQuery(
  query: QueryOptions['query'],
  variables?: any
): Promise<[any, any]> {
  let data: any = {},
    errors: any = {}

  try {
    const response = await createApolloClient().query({
      query,
      variables,
    })

    data = response.data
  } catch (error: any) {
    if (error.graphQLErrors) {
      errors = error.graphQLErrors
    } else {
      errors = [
        {
          message: 'Something went wrong.',
        },
      ]
    }
  }

  return [data, errors]
}
