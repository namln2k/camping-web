import { generateCustomerToken } from '@/actions/auth/generateCustomerToken'
import { User } from '@/types'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCartForCustomer } from './actions/getCartForCustomer'

export default {
  providers: [
    CredentialsProvider({
      async authorize({ email, password }) {
        // @ts-ignore
        const tokenQueryResult = await generateCustomerToken(email, password)

        const result = { magentoToken: tokenQueryResult?.token } as User

        if (tokenQueryResult?.token) {
          const cartId = await getCartForCustomer(tokenQueryResult.token)

          result.cartId = cartId

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
