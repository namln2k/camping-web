'use client'

import useHome from '@/hooks/home/useHome'

export default function Home() {
  const [homePageBlock]: string[] = useHome()

  return (
    <>
      <main>
        <div dangerouslySetInnerHTML={{ __html: homePageBlock }}></div>
      </main>
    </>
  )
}
