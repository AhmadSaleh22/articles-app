'use client'

import Link from 'next/link'
import { Calendar, ChevronRight, FileText } from 'lucide-react'

interface ThreadSidebarItem {
  id: string
  title: string
  imageUrl: string
  date: string
  description: string
  href?: string
}

interface ThreadSidebarProps {
  totalArticles: number
  items: ThreadSidebarItem[]
  currentIndex: number
  className?: string
}

export function ThreadSidebar({
  totalArticles,
  items,
  currentIndex,
  className = '',
}: ThreadSidebarProps) {
  // Calculate total duration (assuming average 8 min per article)
  const totalHours = (totalArticles * 8) / 60
  const durationText = totalHours < 1 ? `${totalArticles * 8} min` : `${totalHours.toFixed(1)} hours`

  return (
    <div className={`relative ${className}`}>
      {/* Top Corners */}
      <div className="absolute top-0 left-0 w-6 h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 8C0 3.58172 3.58172 0 8 0H24V24H0V8Z" fill="#262626" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-6 h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M24 8C24 3.58172 20.4183 0 16 0H0V24H24V8Z" fill="#262626" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="bg-[#262626] pt-6 pb-6 rounded-none">
        <div className="px-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-medium text-white mb-2">Thread articles</h3>
            <p className="text-xs text-neutral-400">
              {totalArticles} Articles · {durationText} of content
            </p>
          </div>

          {/* Articles List */}
          <div className="space-y-4 mb-5">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href || '#'}
                className="flex gap-4 group hover:opacity-80 transition-opacity"
              >
                {/* Thumbnail */}
                <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Icon Badge */}
                  <div className="absolute top-2 left-2 w-5 h-6 bg-[#C9A96E] rounded flex items-center justify-center">
                    <FileText className="w-3 h-3 text-black" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white mb-1.5 line-clamp-1">
                    {item.title}
                  </h4>

                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-neutral-400 mb-2">
                    <Calendar className="w-3 h-3" strokeWidth={1.5} />
                    <span>{item.date}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm pt-1">
            <span className="text-neutral-400">
              {currentIndex}/{totalArticles}
            </span>
            <Link
              href="#"
              className="flex items-center gap-1 text-[#C9A96E] hover:text-[#d4b57d] transition-colors group"
            >
              <span>View all</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Corners */}
      <div className="absolute bottom-0 left-0 w-6 h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M0 16C0 20.4183 3.58172 24 8 24H24V0H0V16Z" fill="#262626" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-6 h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M24 16C24 20.4183 20.4183 24 16 24H0V0H24V16Z" fill="#262626" />
        </svg>
      </div>
    </div>
  )
}
