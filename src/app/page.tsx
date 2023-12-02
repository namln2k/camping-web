'use client'

import { useHomePage } from '@/hooks/home'
import Loading from './loading'
import ErrorFallback from '@/components/ErrorFallbak'

export default function Home() {
  const [homePageBlock, loading, errors] = useHomePage()

  if (loading) {
    return <Loading />
  }

  if (errors.length) {
    return <ErrorFallback />
  }

  return (
    <>
      <main>
        <div dangerouslySetInnerHTML={{ __html: homePageBlock }}></div>
      </main>
    </>
  )
}
