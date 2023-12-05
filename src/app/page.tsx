import ErrorFallback from '@/components/ErrorFallback'
import useHome from '@/hooks/home/useHome'

export default async function Home() {
  const [homePage, errors] = await useHome()

  if (errors.length) {
    return <ErrorFallback errors={errors} sectionName="HomePage" />
  }

  return (
    <>
      <main>
        {homePage.homePageBlock && (
          <div
            dangerouslySetInnerHTML={{ __html: homePage.homePageBlock }}
          ></div>
        )}
      </main>
    </>
  )
}
