export interface CartItem {
  uid: string
  product: {
    name: string
    sku: string
    quantity: number
  }
}
