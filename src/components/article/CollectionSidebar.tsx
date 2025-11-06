'use client'

import { Calendar, FileText } from 'lucide-react'
import Link from 'next/link'

interface CollectionItem {
  id: string
  title: string
  imageUrl: string
  author: string
  authorAvatar: string
  date: string
  description: string
  href?: string
}

interface CollectionSidebarProps {
  title: string
  totalArticles: number
  totalDuration: string
  items: CollectionItem[]
  showCount?: number
}

export function CollectionSidebar({
  title,
  totalArticles,
  totalDuration,
  items,
  showCount = 5,
}: CollectionSidebarProps) {
  const displayedItems = items.slice(0, showCount)
  const hasMore = items.length > showCount

  return (
    <div className="relative flex flex-col w-full">
      {/* Top Border with Corners */}
      <div className="flex items-start justify-between w-full h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
        <div className="flex-1 border-t border-neutral-700 h-px self-start" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-x-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>

      {/* Body */}
      <div className="border-l border-r border-neutral-700 px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <span>{totalArticles} Articles</span>
            <span>·</span>
            <span>{totalDuration} of content</span>
          </div>
        </div>

        {/* Collection Items */}
        <div className="flex flex-col gap-4">
          {displayedItems.map((item) => (
            <Link
              key={item.id}
              href={item.href || '#'}
              className="flex gap-4 group hover:bg-neutral-900/50 rounded-lg transition-colors p-2 -m-2"
            >
              {/* Thumbnail */}
              <div className="relative w-32 h-20 bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 w-5 h-6 bg-neutral-900/80 backdrop-blur-sm rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#C9A96E]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-white font-medium mb-2 line-clamp-1 group-hover:text-[#C9A96E] transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#DBC99E] rounded-full" />
                    <span className="text-xs text-neutral-400">{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
                    <span className="text-xs text-neutral-400">{item.date}</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        {hasMore && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-700">
            <span className="text-sm text-neutral-400">
              {displayedItems.length}/{totalArticles}
            </span>
            <Link
              href="#"
              className="text-sm text-[#C9A96E] hover:text-[#DBC99E] transition-colors"
            >
              View all
            </Link>
          </div>
        )}
      </div>

      {/* Bottom Border with Corners */}
      <div className="flex items-end justify-between w-full h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-y-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
        <div className="flex-1 border-b border-neutral-700 h-px self-end" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  )
}
