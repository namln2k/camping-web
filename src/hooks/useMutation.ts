import { useAppSelector } from '@/lib/redux/hooks'
import { QueryOptions } from '@apollo/client'

export default function useMutation<T>(
  query: QueryOptions['query'],
  variables?: any
) {
  const token = useAppSelector((state) => state.token)

  const queryConfig: QueryOptions = {
    query,
    variables,
  }

  // Add token to the request headers if the user is logged in
  if (!!token) {
    queryConfig.context = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  }

  return useMutation(query, queryConfig)
}
