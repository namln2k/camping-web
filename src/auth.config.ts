import { generateCustomerToken } from '@/actions/generateCustomerToken'
import { User } from '@/types'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default {
  providers: [
    CredentialsProvider({
      async authorize({ email, password }) {
        // @ts-ignore
        const tokenQueryResult = await generateCustomerToken(email, password)

        const result = { magentoToken: tokenQueryResult?.token } as User

        if (tokenQueryResult?.token) {
          if (process.env.MAGENTO_GRAPHQL_ENDPOINT) {
            const cartQueryResult = await fetch(
              process.env.MAGENTO_GRAPHQL_ENDPOINT,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${tokenQueryResult?.token}`,
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
              }
            )
            const cartQueryData = await cartQueryResult.json()

            result.cartId = cartQueryData?.data?.customerCart?.id
          }

          return result
        }

        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_JWT_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ user, token }) {
      // @ts-ignore
      if (user?.magentoToken) {
        // @ts-ignore
        token.magentoToken = user.magentoToken
      }

      // @ts-ignore
      if (user?.cartId) {
        // @ts-ignore
        token.cartId = user.cartId
      }

      return token
    },
    async session({ session, token }) {
      if (token.magentoToken) {
        // @ts-ignore
        session.user.magentoToken = token.magentoToken
      }

      if (token.cartId) {
        // @ts-ignore
        session.user.cartId = token.cartId
      }

      return session
    },
  },
} satisfies NextAuthConfig
