import ErrorFallback from '@/components/ErrorFallback'
import useCategoryNav from '@/hooks/home/useCategoryNav'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface Props {
  className?: string
}

export default async function CategoryNav({ className = '' }: Props) {
  const [categories, errors] = await useCategoryNav()

  if (errors.length) {
    return (
      <ErrorFallback
        className={className}
        errors={errors}
        sectionName="CategoryNav"
      />
    )
  }

  return (
    <div
      className={`category-nav w-full bg-gray-100 text-[#333333] ${className}`}
    >
      <ul className="flex flex-col md:flex-row font-semibold text-2xl md:w-full md:max-w-[1280px] mx-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className="group relative md:h-28 hover:bg-gray-300 cursor-pointer"
          >
            <Link
              href={`/category/${category.id}`}
              className="flex items-center h-full py-8 md:px-8 mb-0 px-12 hover:no-underline"
            >
              {category.name}

              {category?.children && category.children.length > 0 && (
                <span className="ml-4 w-6 h-6 group-hover:rotate-180 transition-all">
                  <ChevronDownIcon />
                </span>
              )}
            </Link>

            {category?.children && category.children.length > 0 && (
              <div className="z-10 hidden group-hover:block static md:absolute min-w-[200px] md:top-28 md:left-0 bg-gray-100 border shadow">
                <ul>
                  {category.children.map((subCate) => (
                    <li
                      key={subCate.id}
                      className="group/subCate relative hover:bg-gray-300"
                    >
                      <Link
                        href={`/category/${subCate.id}`}
                        className="flex items-start h-full py-8 md:px-8 mb-0 px-12 hover:no-underline"
                      >
                        {subCate.name}

                        {subCate?.children && subCate.children.length > 0 && (
                          <span className="ml-4 w-6 h-6 mt-1">
                            <ChevronRightIcon />
                          </span>
                        )}
                      </Link>
                      {subCate?.children && subCate.children.length > 0 && (
                        <div className="z-10 hidden group-hover/subCate:block static md:absolute min-w-[200px] md:top-0 md:left-full bg-gray-100 border shadow">
                          <ul>
                            {subCate.children.map((subSubCate) => (
                              <li
                                key={subSubCate.id}
                                className="hover:bg-gray-300 whitespace-nowrap"
                              >
                                <Link
                                  href={`/category/${subSubCate.id}`}
                                  className="flex items-start h-full py-8 md:px-8 mb-0 px-12 hover:no-underline max-w-[120%]"
                                >
                                  {subSubCate.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
