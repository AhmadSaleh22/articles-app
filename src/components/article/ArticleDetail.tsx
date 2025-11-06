'use client'

import { Navbar } from '@/components/homepage/Navbar'
import { ArticleHero } from './ArticleHero'
import { ArticleHeader } from './ArticleHeader'
import { ArticleQuote } from './ArticleQuote'
import { ArticleStats } from './ArticleStats'
import { ArticleImage } from './ArticleImage'
import { CollectionSidebar } from './CollectionSidebar'
import { ContributorsSidebar } from './ContributorsSidebar'
import { RelatedContent } from './RelatedContent'
import { ShareStorySection } from './ShareStorySection'

// Content block types
type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'image'; imageUrl: string; caption?: string; alt?: string }
  | { type: 'stats'; stats: { value: string; label: string }[] }
  | { type: 'heading'; text: string }

interface BreadcrumbItem {
  label: string
  href?: string
}

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

interface ArticleDetailProps {
  // Hero section
  heroImage?: string
  heroGallery?: string[]
  heroVideo?: string
  heroAudio?: string
  audioTitle?: string
  audioDuration?: string
  breadcrumbs: BreadcrumbItem[]

  // Header
  title: string
  label?: string
  category: string
  publishedDate: string
  readingTime: string

  // Dynamic content blocks
  content: ContentBlock[]

  // Sidebar - Collection
  collection?: {
    title: string
    totalArticles: number
    totalDuration: string
    items: CollectionItem[]
  }

  // Sidebar - Contributors
  contributors?: Contributor[]

  // Related content
  relatedArticles?: RelatedArticle[]
}

export function ArticleDetail({
  heroImage,
  heroGallery,
  heroVideo,
  heroAudio,
  audioTitle,
  audioDuration,
  breadcrumbs,
  title,
  label,
  category,
  publishedDate,
  readingTime,
  content,
  collection,
  contributors,
  relatedArticles,
}: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="w-full max-w-[1440px] mx-auto px-40 pt-10">
        <ArticleHero
          imageUrl={heroImage}
          galleryImages={heroGallery}
          videoUrl={heroVideo}
          audioUrl={heroAudio}
          audioTitle={audioTitle}
          audioDuration={audioDuration}
          breadcrumbs={breadcrumbs}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-40 py-12">
        <div className="grid grid-cols-[745px_1fr] gap-24">
          {/* Left Column - Article Content */}
          <div>
            {/* Title Section */}
            <ArticleHeader
              title={title}
              label={label}
              category={category}
              publishedDate={publishedDate}
              readingTime={readingTime}
            />

            {/* Content Blocks */}
            <div className="mt-8 space-y-6">
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
                  case 'image':
                    return (
                      <ArticleImage
                        key={index}
                        imageUrl={block.imageUrl}
                        caption={block.caption}
                        alt={block.alt}
                      />
                    )
                  case 'stats':
                    return <ArticleStats key={index} stats={block.stats} />
                  case 'heading':
                    return (
                      <h2 key={index} className="text-2xl font-medium text-white mt-8 mb-4">
                        {block.text}
                      </h2>
                    )
                  default:
                    return null
                }
              })}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Collection Sidebar */}
            {collection && (
              <CollectionSidebar
                title={collection.title}
                totalArticles={collection.totalArticles}
                totalDuration={collection.totalDuration}
                items={collection.items}
              />
            )}

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
