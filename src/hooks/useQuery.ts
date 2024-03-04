import getApolloClient from '@/lib/apollo/client'
import { Session } from '@/types'
import { QueryOptions } from '@apollo/client'
import { useCurrentUser } from './auth/useCurrentUser'

export default async function useQuery<T>(
  query: QueryOptions['query'],
  variables?: any
): Promise<{ data?: T; errors: Error[] }> {
  let data,
    errors = []

  const session: Session | null = await useCurrentUser()

  const queryConfig: QueryOptions = {
    query,
    variables,
  }

  // Add token to the request headers if the user is logged in
  const token = session?.user?.magentoToken || ''
  if (!!token) {
    queryConfig.context = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  }

  try {
    const response = await getApolloClient().query(queryConfig)

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

  return { data, errors }
}
