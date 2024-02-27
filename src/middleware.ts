import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export const API_AUTH_PREFIX = '/api/auth'
export const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
]
export const PROTECTED_ROUTES = ['/settings']

export default auth((req) => {
  // TODO: Refactor routing logic
  const { nextUrl } = req
  const { pathname: pathName } = nextUrl

  if (pathName.startsWith(API_AUTH_PREFIX)) {
    return
  }

  const isLoggedIn = !!req.auth

  if (AUTH_ROUTES.includes(pathName)) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/settings', nextUrl))
    }
  }

  if (PROTECTED_ROUTES.includes(pathName) && !isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
