import { useMiniCart } from '@/hooks/cart/useMiniCart'

/**
 * This component is a draft for the Mini Cart
 * TODO: Develop full logic and implement UI/UX
 */
export default async function MiniCart() {
  const [cart, errors] = await useMiniCart()

  return <div>{JSON.stringify(cart, null, 4)}</div>
}
