import { Session as NextAuthSession, User as NextAuthUser } from 'next-auth'

export interface LoginParams {
  email: string
  password: string
  callbackUrl?: string | null
}

export interface User extends NextAuthUser {
  magentoToken?: string
  cartId?: string
}

export interface Session extends NextAuthSession {
  user?: User
}

export const API_AUTH_PREFIX = '/api/auth'

export const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
]

export const DEFAULT_REDIRECT_ROUTE = '/my-account'
