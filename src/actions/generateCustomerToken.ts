'use server'

interface Result {
  token?: string
  errors?: any
}

export async function generateCustomerToken(
  email: string,
  password: string
): Promise<Result | null> {
  if (!process.env.MAGENTO_GRAPHQL_ENDPOINT) {
    return null
  }

  const response = await fetch(process.env.MAGENTO_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation signIn($email: String!, $password: String!) {
          generateCustomerToken(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: { email, password },
    }),
  })

  const responseData = await response.json()
  const token = responseData?.data?.generateCustomerToken?.token

  if (token) {
    return { token }
  }

  return {
    errors: responseData.errors,
  }
}
