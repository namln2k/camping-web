'use client'

import { useHomePage } from '@/hooks/home'

export default function Home() {
  const [homePageBlock]: string[] = useHomePage()

  return (
    <>
      <main>
        <div dangerouslySetInnerHTML={{ __html: homePageBlock }}></div>
      </main>
    </>
  )
}
