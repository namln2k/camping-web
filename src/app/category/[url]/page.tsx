import BreadCrumb from '@/components/Breadcrumb'
import ErrorFallback from '@/components/ErrorFallback'
import CategoryProductList from '@/components/catalog/category/CategoryProductList'
import useCategoryDetail from '@/hooks/catalog/useCategoryDetail'

interface Props {
  params: {
    url: string
  }
}

export default async function CategoryDetail({ params: { url } }: Props) {
  const [category, errors] = await useCategoryDetail(url)

  if (errors.length || !category) {
    return <ErrorFallback errors={errors} sectionName="Category Page" />
  }

  return (
    <div>
      <BreadCrumb breadcrumb={category?.breadcrumbs} currentNode={category.name} />
      <p className="mt-6 font-semibold text-5xl">{category?.name}</p>
      <CategoryProductList categoryUid={category?.uid} />
    </div>
  )
}
