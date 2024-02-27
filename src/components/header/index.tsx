import { useCurrentUser } from '@/hooks/auth/useCurrentUser'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from '@/components/header/LogoutButton'
import MiniCart from '@/components/header/MiniCart'

interface Props {
  className?: string
}

/**
 * This component is a draft for the header
 * TODO: Develop full logic and implement UI/UX
 */
export default async function Header({ className }: Props) {
  const currentUser = await useCurrentUser()

  let actionsComponent = (
    <div>
      <Link href='/auth/login'>Login</Link>
    </div>
  )

  if (currentUser) {
    actionsComponent = (
      <>
        <MiniCart />
        <LogoutButton />
      </>
    )
  }

  return (
    <div className={`${className}`}>
      <Link href='/'>
        <Image
          alt='logo'
          src='/next.svg'
          width={160}
          height={40}
          priority
          className='w-[160px] h-auto'
        />
      </Link>
      {actionsComponent}
    </div>
  )
}
