import authConfig from '@/auth.config'
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT_ROUTE } from '@/types'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const { pathname: pathName } = nextUrl

  if (pathName.startsWith(API_AUTH_PREFIX)) {
    return
  }

  const isLoggedIn = !!req.auth

  if (AUTH_ROUTES.includes(pathName)) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl))
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
