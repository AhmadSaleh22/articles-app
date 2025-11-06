'use client'

import { Folder, Calendar, Clock } from 'lucide-react'
import { ArticleQuote } from './ArticleQuote'

interface ThreadArticleItemProps {
  title: string
  label?: string
  category: string
  publishedDate: string
  readingTime: string
  thumbnailUrl?: string
  content: Array<
    | { type: 'paragraph'; text: string }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'heading'; text: string }
  >
  className?: string
}

export function ThreadArticleItem({
  title,
  label,
  category,
  publishedDate,
  readingTime,
  thumbnailUrl,
  content,
  className = '',
}: ThreadArticleItemProps) {
  return (
    <div className={`${className}`}>
      {/* Title Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-white mb-3 px-6">{title}</h2>

        {/* Meta Data */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 px-6">
          {label && (
            <>
              <div className="px-2 py-1 bg-[#C9A96E] text-black rounded text-xs font-medium">
                {label}
              </div>
              <span>·</span>
            </>
          )}

          {/* Category */}
          <div className="flex items-center gap-1">
            <Folder className="w-4 h-4" strokeWidth={1.5} />
            <span>{category}</span>
          </div>

          <span>·</span>

          {/* Published Date */}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>Published: {publishedDate}</span>
          </div>

          <span>·</span>

          {/* Reading Time */}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" strokeWidth={1.5} />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="mb-6">
          <div className="relative w-full h-[418px] rounded-2xl overflow-hidden">
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </div>
      )}

      {/* Content Preview */}
      <div className="space-y-6 px-6">
        {content.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={index} className="text-sm text-neutral-400 leading-relaxed">
                  {block.text}
                </p>
              )
            case 'quote':
              return (
                <ArticleQuote
                  key={index}
                  text={block.text}
                  author={block.author}
                />
              )
            case 'heading':
              return (
                <h3 key={index} className="text-xl font-medium text-white mt-8 mb-4">
                  {block.text}
                </h3>
              )
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
