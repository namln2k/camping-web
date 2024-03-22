'use client'

import { logout } from '@/actions/auth/logout'

/**
 * This is a draft for the logout button
 * TODO: Develop full UI/UX
 */
export default function LogoutButton() {
  return (
    <button
      className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
      onClick={() => {
        logout()
      }}
    >
      Logout
    </button>
  )
}
