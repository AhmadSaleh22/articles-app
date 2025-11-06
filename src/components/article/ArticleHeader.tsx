'use client'

interface ArticleHeaderProps {
  title: string
  label?: string
  category: string
  publishedDate: string
  readingTime: string
}

export function ArticleHeader({
  title,
  label,
  category,
  publishedDate,
  readingTime,
}: ArticleHeaderProps) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <h1 className="text-4xl font-medium text-white leading-tight">
        {title}
      </h1>

      {/* Metadata */}
      <div className="flex items-center gap-3 text-sm">
        {label && (
          <>
            <div className="px-3 py-1 bg-[#C9A96E] text-[#171717] rounded-full font-medium text-xs">
              {label}
            </div>
            <span className="text-neutral-600">·</span>
          </>
        )}

        <span className="text-neutral-400">Category: <span className="text-white">{category}</span></span>
        <span className="text-neutral-600">·</span>

        <span className="text-neutral-400">Published: <span className="text-white">{publishedDate}</span></span>
        <span className="text-neutral-600">·</span>

        <span className="text-neutral-400">Reading Time: <span className="text-white">{readingTime}</span></span>
      </div>
    </div>
  )
}
