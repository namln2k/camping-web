import ErrorFallback from '@/components/ErrorFallback'
import GlobalLoading from '@/components/GlobalLoading'
import GlobalMessage from '@/components/GlobalMessage'
import useHome from '@/hooks/home/useHome'

export default async function Home() {
  const [homePage, errors] = await useHome()

  if (errors.length) {
    return <ErrorFallback errors={errors} sectionName="Home Page" />
  }

  return (
    <div>
      <GlobalMessage />
      <GlobalLoading />
      {homePage.homePageBlock && (
        <div dangerouslySetInnerHTML={{ __html: homePage.homePageBlock }}></div>
      )}
    </div>
  )
}
