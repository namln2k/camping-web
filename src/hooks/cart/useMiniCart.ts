import useQuery from '@/hooks/useQuery'
import { miniCartQuery } from './miniCart.gql'
import { Cart } from '@/types'

interface MiniCartQueryResult {
  customerCart: Cart
}

/**
 * This is a dummy hook for expremimental authentication logic
 * TODO: Develop full logic and implement this hook in the MiniCart component
 */
export async function useMiniCart() {
  const [cart, errors] = await useQuery<MiniCartQueryResult>(miniCartQuery)

  return [cart?.customerCart, errors]
}
