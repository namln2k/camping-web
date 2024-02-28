'use server'

import { signIn } from '@/auth'
import { DEFAULT_REDIRECT_ROUTE, LoginParams } from '@/types'
import { AuthError } from 'next-auth'

export const login = async ({
  email,
  password,
  callbackUrl = null,
}: LoginParams) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_ROUTE,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid credentials! Please double check then try again!',
          }
        default:
          return {
            error:
              'Something went wrong! Try refreshing the page or try again later!',
            detail: error.message,
          }
      }
    }

    throw error
  }
}
