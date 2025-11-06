'use client'

import { useState } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { TimelineCard } from './TimelineCard'

interface TimelineSectionProps {
  title: string
  fromDate: string
  toDate: string
  items: Array<{
    id: string | number
    date: string
    title: string
    description: string
    imageUrl?: string
  }>
  defaultExpanded?: boolean
  showMoreLabel?: string
  totalCount?: number
}

export function TimelineSection({
  title,
  fromDate,
  toDate,
  items,
  defaultExpanded = false,
  showMoreLabel = 'Show more',
  totalCount,
}: TimelineSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="relative border border-neutral-800 rounded-lg overflow-hidden">
      {/* Top decorative corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-neutral-800 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-neutral-800 rounded-tr-lg" />

      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors"
      >
        <div className="flex flex-col items-start gap-2">
          {/* Title */}
          <h2 className="font-medium text-base text-white">{title}</h2>

          {/* Date Range */}
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>From {fromDate}</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>to {toDate}</span>
            </div>
          </div>
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          className={`w-4 h-4 text-neutral-500 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-neutral-800">
          <div className="px-6 py-6 space-y-6">
            {/* Vertical line */}
            <div className="relative">
              <div className="absolute left-4 top-20 bottom-0 w-px bg-neutral-800" />

              {/* Cards */}
              <div className="space-y-6">
                {items.map((item) => (
                  <TimelineCard
                    key={item.id}
                    date={item.date}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            {totalCount && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-neutral-500">
                  {items.length}/{totalCount}
                </span>
                <button className="text-sm text-[#C9A96E] hover:underline">
                  {showMoreLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom decorative corners */}
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-neutral-800 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-neutral-800 rounded-br-lg" />
    </div>
  )
}
