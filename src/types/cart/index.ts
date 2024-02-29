import { CartItem } from './item'

export * from './item'

export interface Cart {
  id: string
  items: CartItem[]
}