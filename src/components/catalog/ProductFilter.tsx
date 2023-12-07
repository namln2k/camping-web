'use client'

import { useState } from 'react'

const filters = [
  {
    name: 'color',
    label: 'Color',
    options: [
      {
        label: 'Black',
        value: 'black',
      },
      {
        label: 'Blue',
        value: 'blue',
      },
      {
        label: 'Red',
        value: 'red',
      },
      {
        label: 'White',
        value: 'white',
      },
    ],
  },
  {
    name: 'price',
    label: 'Price',
    options: [
      {
        label: 'Under $10',
        value: 'under-10',
      },
      {
        label: '$10 to $100',
        value: '10-100',
      },
      {
        label: '$100 to $500',
        value: '100-500',
      },
      {
        label: '$500 & Above',
        value: 'above-500',
      },
    ],
  },
  {
    name: 'brand',
    label: 'Brand',
    options: [
      {
        label: 'Brand 1',
        value: 'brand-1',
      },
      {
        label: 'Brand 2',
        value: 'brand-2',
      },
      {
        label: 'Brand 3',
        value: 'brand-3',
      },
      {
        label: 'Brand 4',
        value: 'brand-4',
      },
    ],
  },
]

interface Props {
  initialFilter?: Record<string, any>
  onFilterChange: (filterValues: Record<string, string>) => void
}

export default function ProductFilter({
  initialFilter: initialFilterValues = {},
  onFilterChange,
}: Props) {
  const [filterValues, setFilterValues] =
    useState<Record<string, string>>(initialFilterValues)

  const handleInputChange = (attribute: string, value: string) => {
    let finalFilterValues = {}

    if (filterValues[attribute]) {
      const prevAttribute = JSON.parse(filterValues[attribute])

      if (prevAttribute.includes(value)) {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify(
            prevAttribute.filter((v: string) => v !== value)
          ).slice(1, -1),
        }
      } else {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify([...prevAttribute, value]).slice(1, -1),
        }
      }
    } else {
      finalFilterValues = {
        ...filterValues,
        [attribute]: JSON.stringify([value]).slice(1, -1),
      }
    }

    onFilterChange(finalFilterValues)
  }

  return (
    <>
      {filters.map((filter) => (
        <div key={filter.name} className="border-t py-8">
          <h4>{filter.label}</h4>
          <ul className="mt-2">
            {filter.options.map((option) => (
              <li key={option.value} className="pt-3">
                <label>
                  <input
                    type="checkbox"
                    name={option.value}
                    value={option.value}
                    onChange={() => {
                      handleInputChange(filter.name, option.value)
                    }}
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
