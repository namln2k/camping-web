import useQuery from '@/hooks/useQuery'
import { miniCartQuery } from './miniCart.gql'

/**
 * This is a dummy hook for expremimental authentication logic
 * TODO: Develop full logic and implement this hook in the MiniCart component
 */
export async function useMiniCart() {
  const [cart, errors] = await useQuery(miniCartQuery)
}
