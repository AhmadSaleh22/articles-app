'use client'

import { ArrowUpDown, SlidersHorizontal } from 'lucide-react'

export function ActivityFilters() {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
        <ArrowUpDown className="w-4 h-4" strokeWidth={1.5} />
        <span>Sort by: Newest first</span>
      </button>
      <button className="flex items-center gap-2 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
        <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
        <span>Filters</span>
      </button>
    </div>
  )
}
