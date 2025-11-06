'use client'

import { Navbar } from '@/components/homepage/Navbar'
import { Breadcrumbs } from './Breadcrumbs'
import { ThreadArticleItem } from './ThreadArticleItem'
import { ThreadSidebar } from './ThreadSidebar'
import { ContributorsSidebar } from './ContributorsSidebar'
import { RelatedContent } from './RelatedContent'
import { ShareStorySection } from './ShareStorySection'
import { Calendar, Clock } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ThreadArticle {
  id: string
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
}

interface ThreadSidebarItem {
  id: string
  title: string
  imageUrl: string
  date: string
  description: string
  href?: string
}

interface Contributor {
  id: string
  name: string
  avatar: string
  role: string
  href?: string
}

interface RelatedArticle {
  id: string
  title: string
  imageUrl: string
  author: string
  date: string
}

interface ThreadPageProps {
  breadcrumbs: BreadcrumbItem[]
  threadTitle: string
  threadPublishedDate: string
  threadReadingTime: string
  articles: ThreadArticle[]
  threadSidebarItems: ThreadSidebarItem[]
  totalArticles: number
  currentArticleIndex: number
  contributors?: Contributor[]
  relatedArticles?: RelatedArticle[]
}

export function ThreadPage({
  breadcrumbs,
  threadTitle,
  threadPublishedDate,
  threadReadingTime,
  articles,
  threadSidebarItems,
  totalArticles,
  currentArticleIndex,
  contributors,
  relatedArticles,
}: ThreadPageProps) {
  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumbs */}
      <div className="w-full max-w-[1440px] mx-auto px-40 pt-10">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-40 py-12">
        <div className="grid grid-cols-[745px_1fr] gap-24">
          {/* Left Column - Thread Content */}
          <div>
            {/* Thread Header */}
            <div className="mb-12 px-6">
              <h1 className="text-5xl font-medium text-white mb-6 leading-tight">
                {threadTitle}
              </h1>

              {/* Thread Meta Data */}
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>Published: {threadPublishedDate}</span>
                </div>

                <span>·</span>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>{threadReadingTime}</span>
                </div>
              </div>
            </div>

            {/* Thread Articles */}
            <div className="space-y-16">
              {articles.map((article, index) => (
                <ThreadArticleItem
                  key={article.id}
                  title={article.title}
                  label={article.label}
                  category={article.category}
                  publishedDate={article.publishedDate}
                  readingTime={article.readingTime}
                  thumbnailUrl={article.thumbnailUrl}
                  content={article.content}
                  className={index > 0 ? 'pt-16 border-t border-neutral-800' : ''}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Thread Sidebar */}
            <ThreadSidebar
              totalArticles={totalArticles}
              items={threadSidebarItems}
              currentIndex={currentArticleIndex}
            />

            {/* Contributors Sidebar */}
            {contributors && contributors.length > 0 && (
              <ContributorsSidebar contributors={contributors} />
            )}
          </div>
        </div>
      </div>

      {/* Related Content */}
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="w-full max-w-[1440px] mx-auto px-40">
          <RelatedContent articles={relatedArticles} />
        </div>
      )}

      {/* Share Story Section */}
      <div className="w-full max-w-[1440px] mx-auto px-40">
        <ShareStorySection />
      </div>
    </div>
  )
}
