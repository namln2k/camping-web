import { generateCustomerToken } from '@/actions/generateCustomerToken'
import { User } from '@/types'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default {
  providers: [
    CredentialsProvider({
      async authorize({ email, password }) {
        // @ts-ignore
        const result = await generateCustomerToken(email, password)

        if (result?.token) {
          const cartQueryResult = await fetch(
            process.env.MAGENTO_GRAPHQL_ENDPOINT || '',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${result.token}`,
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
          const responseData = await cartQueryResult.json()

          return {
            magentoToken: result.token,
            cartId: responseData?.data?.customerCart?.id,
          } as User
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
