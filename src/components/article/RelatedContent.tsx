'use client'

import { ContentCard } from '@/components/homepage/ContentCard'
import Link from 'next/link'

interface RelatedArticle {
  id: string
  title: string
  imageUrl: string
  author: string
  date: string
}

interface RelatedContentProps {
  title?: string
  description?: string
  articles: RelatedArticle[]
}

export function RelatedContent({
  title = 'Related content',
  description = 'Lorem ipsum dolor sit amet adipiscing elit.',
  articles,
}: RelatedContentProps) {
  return (
    <div className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-medium text-white mb-1">{title}</h2>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
        <Link
          href="#"
          className="text-sm text-[#C9A96E] hover:text-[#DBC99E] transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-4 gap-6">
        {articles.slice(0, 4).map((article) => (
          <ContentCard
            key={article.id}
            title={article.title}
            imageUrl={article.imageUrl}
            author={article.author}
            date={article.date}
          />
        ))}
      </div>
    </div>
  )
}
