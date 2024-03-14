export async function getCartForCustomer(
  token: string
): Promise<string | undefined> {
  if (process.env.MAGENTO_GRAPHQL_ENDPOINT) {
    const cartQueryResult = await fetch(process.env.MAGENTO_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
            query {
              customerCart {
                id
              }
            }
          `,
      }),
    })
    const cartQueryData = await cartQueryResult.json()

    return cartQueryData?.data?.customerCart?.id
  }
}
