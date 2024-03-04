import BreadCrumb from '@/components/Breadcrumb'
import ErrorFallback from '@/components/ErrorFallback'
import CategoryProductList from '@/components/catalog/category/CategoryProductList'
import useCategoryDetail from '@/hooks/catalog/category/useCategoryDetail'

interface Props {
  params: {
    url: string
  }
}

export default async function CategoryDetail({ params: { url } }: Props) {
  const { category, errors } = await useCategoryDetail(url)

  if (errors.length || !category) {
    return <ErrorFallback errors={errors} sectionName='Category Page' />
  }

  const { breadcrumbs, name, uid } = category

  return (
    <div>
      <BreadCrumb breadcrumb={breadcrumbs} currentNode={name} />
      <p className='mt-6 font-semibold text-5xl'>{name}</p>
      <CategoryProductList categoryUid={uid} />
    </div>
  )
}
