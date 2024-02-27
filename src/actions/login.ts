'use server'

import { signIn } from '@/auth'
import { LoginParams } from '@/types'
import { AuthError } from 'next-auth'

export const login = async ({
  email,
  password,
  callbackUrl = undefined,
}: LoginParams) => {
  try {
    await signIn('credentials', {
      email,
      password,
      // TODO: Redefine redirect URL
      redirectTo: callbackUrl || '/settings',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
