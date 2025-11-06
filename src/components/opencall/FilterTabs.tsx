'use client'

import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'
import { useState } from 'react'

type FilterType = 'all' | 'articles' | 'videos' | 'audio' | 'slides'
type SortType = 'newest' | 'oldest' | 'popular'

interface FilterTabsProps {
  onFilterChange?: (filter: FilterType) => void
  onSortChange?: (sort: SortType) => void
}

export function FilterTabs({ onFilterChange, onSortChange }: FilterTabsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('newest')

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Show all' },
    { value: 'articles', label: 'Articles' },
    { value: 'videos', label: 'Videos' },
    { value: 'audio', label: 'Audio' },
    { value: 'slides', label: 'Slides' },
  ]

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter)
    onFilterChange?.(filter)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Content Type Filters */}
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterClick(filter.value)}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter.value
                ? 'bg-neutral-800 border-2 border-[#C9A96E] text-[#C9A96E]'
                : 'bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-300 hover:border-neutral-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-4 w-px bg-neutral-700" />

      {/* Sort & Filters */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-300 hover:border-neutral-600 transition-all">
          <ArrowDownWideNarrow className="w-5 h-5" />
          <span>
            Sort by: <span className="text-white">Newest first</span>
          </span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-300 hover:border-neutral-600 transition-all">
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  )
}
