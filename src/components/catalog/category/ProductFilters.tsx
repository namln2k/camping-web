'use client'

import AttributeFilter from '@/components/catalog/category/AttributeFilter'
import { ProductAggregation } from '@/types'
import { useEffect, useState } from 'react'

interface Props {
  attributeFilters: ProductAggregation[]
  onFilterChange: (filterValues: Record<string, string>) => void
  initialFilter?: Record<string, any>
}

export default function ProductFilters({
  attributeFilters,
  onFilterChange,
  initialFilter: initialFilterValues = {},
}: Props) {
  const [filterValues, setFilterValues] =
    useState<Record<string, string>>(initialFilterValues)

  useEffect(() => {
    onFilterChange(filterValues)
  }, [filterValues, onFilterChange])

  const handleInputChange = (attribute: string, value: string) => {
    let finalFilterValues

    if (filterValues[attribute]) {
      const prevAttribute = JSON.parse(filterValues[attribute])

      if (prevAttribute.includes(value)) {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify(
            prevAttribute.filter((v: string) => v !== value)
          ),
        }
      } else {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify([...prevAttribute, value]),
        }
      }
    } else {
      finalFilterValues = {
        ...filterValues,
        [attribute]: JSON.stringify([value]),
      }
    }

    setFilterValues(finalFilterValues)
  }

  return (
    <div>
      {attributeFilters.map((filter) => (
        <AttributeFilter
          key={filter.attribute_code}
          attribute_code={filter.attribute_code}
          label={filter.label}
          options={filter.options}
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  )
}
