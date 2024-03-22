import { auth } from '@/auth'
import UserDataPersistor from '@/components/UserDataPersistor'
import getApolloClient from '@/lib/apollo/client'
import { Session } from '@/types'

interface Props {
  searchParams: {
    callbackUrl: string
  }
}

export default async function PersistUserData({
  searchParams: { callbackUrl },
}: Props) {
  const session = ((await auth()) as Session) || undefined

  return <UserDataPersistor session={session} callbackUrl={callbackUrl} />
}
