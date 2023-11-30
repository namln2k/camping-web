'use client'

import { useCategoryNav } from '@/hooks/home'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function CategoryNav() {
  const categories = useCategoryNav()

  return (
    <div className="category-nav w-full bg-gray-100">
      <ul className="flex flex-col md:flex-row font-semibold text-2xl px-0 md:px-8 mb-0 md:mb-8 md:w-full md:max-w-[1280px] mx-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className="group relative md:h-32 hover:bg-gray-300 cursor-pointer"
          >
            {category.children_list?.length > 0 ? (
              <div className="flex items-center h-full py-8 md:py-0 px-12 md:px-12 text-gray-900 hover:text-gray-900 hover:no-underline">
                {category.name}
                <span className="ml-4 w-8 h-8 group-hover:rotate-180 transition-all">
                  <ChevronDownIcon />
                </span>
              </div>
            ) : (
              <Link
                href={`/category/${category.id}`}
                className="flex items-center h-full py-8 md:py-0 px-12 text-gray-900 hover:text-gray-900 hover:no-underline"
              >
                {category.name}
              </Link>
            )}

            {category.children_list?.length > 0 && (
              <div className="z-10 hidden group-hover:block static md:absolute min-w-[200px] md:top-32 md:left-0 bg-gray-100 border shadow">
                <ul>
                  {category.children_list.map((child) => (
                    <li
                      key={child.id}
                      className="py-8 pl-16 md:pl-8 hover:bg-gray-300"
                    >
                      <Link
                        href={`/category/${child.id}`}
                        className="flex items-start h-full text-black hover:text-black hover:no-underline"
                      >
                        {child.name}
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
  )
}
