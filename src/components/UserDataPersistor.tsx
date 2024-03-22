'use client'

import { update as updateToken } from '@/lib/redux/features/auth/tokenSlice'
import { update as updateCartId } from '@/lib/redux/features/cart/cartIdSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import { DEFAULT_REDIRECT_ROUTE, Session } from '@/types'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  session?: Session
  callbackUrl?: string
}

export default function UserDataPersistor({
  session,
  callbackUrl = DEFAULT_REDIRECT_ROUTE,
}: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [dataPersisted, setDataPersisted] = useState(false)

  const persistToken = useCallback(() => {
    if (session?.user?.magentoToken) {
      dispatch(updateToken(session.user.magentoToken))

      localStorage.setItem('magentoToken', session.user.magentoToken)

      window.dispatchEvent(new Event('tokenUpdated'))
    }
  }, [dispatch, session])

  const persistCart = useCallback(() => {
    if (session?.user?.cartId) {
      dispatch(updateCartId(session.user.cartId))

      localStorage.setItem('cartId', session.user.cartId)

      window.dispatchEvent(new Event('cartUpdated'))
    }
  }, [dispatch, session])

  useEffect(() => {
    persistToken()
    persistCart()
    setDataPersisted(true)
  }, [persistCart, persistToken])

  useEffect(() => {
    if (dataPersisted) {
      router.push(callbackUrl)
    }
  }, [dataPersisted, router, callbackUrl])

  return <></>
}
