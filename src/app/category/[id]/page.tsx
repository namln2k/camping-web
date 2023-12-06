import BreadCrumb from '@/components/Breadcrumb'
import ErrorFallback from '@/components/ErrorFallback'
import useCategoryDetail from '@/hooks/catalog/useCategoryDetail'

interface Props {
  params: {
    id: string | number
  }
}

export default async function CategoryDetail({ params: { id } }: Props) {
  const [category, errors] = await useCategoryDetail(id)

  if (errors.length) {
    return (
      <>
        <ErrorFallback errors={errors} sectionName="CategoryPage" />
      </>
    )
  }

  return (
    <>
      <div>
        <BreadCrumb breadcrumb={category?.breadcrumbs} currentNode={category} />
        <h1>{category?.name}</h1>
      </div>
    </>
  )
}
