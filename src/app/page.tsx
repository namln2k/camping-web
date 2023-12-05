import { useHome } from '@/hooks'

export default async function Home() {
  const [homePage, errors] = await useHome()

  if (errors.length) {
    // Handle display of errors
  }

  if (!homePage) {
    // Handle loading state
  }

  return (
    <>
      <main>
        <div
          dangerouslySetInnerHTML={{ __html: homePage.homePageBlock || '' }}
        ></div>
      </main>
    </>
  )
}
