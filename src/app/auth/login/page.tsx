'use client'

import { default as LoginForm } from '@/components/login/Form'
import { useSearchParams } from 'next/navigation'

/**
 * This is a draft for the login page
 * TODO: Develop full logic and implement UI/UX
 */
export default function Login() {
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')

  return (
    <div>
      <div className='w-full lg:max-w-4xl p-6'>
        <h1 className='font-bold text-3xl'>Login</h1>
        <LoginForm callbackUrl={callbackUrl}></LoginForm>
      </div>
    </div>
  )
}
