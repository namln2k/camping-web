import { User } from '@/types'
import { generateCustomerToken } from '@/actions/generateCustomerToken'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default {
  providers: [
    CredentialsProvider({
      async authorize({ email, password }) {
        // @ts-ignore
        const result = await generateCustomerToken(email, password)

        if (result?.token) {
          return { magentoToken: result.token } as User
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

      return token
    },
    async session({ session, token }) {
      if (token.magentoToken) {
        // @ts-ignore
        session.user.magentoToken = token.magentoToken
      }

      return session
    },
  },
} satisfies NextAuthConfig
