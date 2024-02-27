import { Session as NextAuthSession, User as NextAuthUser } from 'next-auth'

export interface LoginParams {
  email: string
  password: string
  callbackUrl?: string
}

export interface User extends NextAuthUser {
  magentoToken?: string
}

export interface Session extends NextAuthSession {
  user?: User
}
