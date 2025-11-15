'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleDetail } from '@/components/article'

interface Article {
  id: string
  title: string
  slug: string
  type: string
  heroImage: string | null
  content: string
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    avatar: string | null
    bio: string | null
  }
}

export default function ArticleSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { slug } = await params
        const response = await fetch(`/api/contents/slug/${slug}`)
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()
        setArticle(data.content)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-neutral-400 mb-6">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C9A96E] transition-colors font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // Parse content blocks from article
  let parsedBlocks: any[] = []
  try {
    if (article.content) {
      const parsedContent = JSON.parse(article.content)
      parsedBlocks = parsedContent.blocks || []
    }
  } catch (e) {
    console.error('Error parsing content:', e)
  }

  // Transform blocks to ArticleDetail format
  const transformedContent = parsedBlocks.map((block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return {
          type: 'paragraph' as const,
          text: block.content?.text || '',
        }
      case 'quote':
        return {
          type: 'quote' as const,
          text: block.content?.text || '',
          author: block.content?.author,
        }
      case 'image':
        return {
          type: 'image' as const,
          imageUrl: block.content?.url || '',
          caption: block.content?.caption,
          alt: block.content?.alt || `Image ${index + 1}`,
        }
      case 'heading':
        return {
          type: 'heading' as const,
          text: block.content?.text || '',
        }
      case 'video':
        // ArticleDetail doesn't have video type, render as image with caption
        return {
          type: 'image' as const,
          imageUrl: block.content?.url || '',
          caption: block.content?.caption || 'Video content',
          alt: block.content?.alt || 'Video',
        }
      case 'audio':
        // ArticleDetail doesn't have audio type, skip or render as paragraph
        return {
          type: 'paragraph' as const,
          text: `🎵 Audio: ${block.content?.caption || 'Audio content'}`,
        }
      case 'list':
        // Convert list items to a paragraph with bullet points
        const items = block.content?.items || []
        return {
          type: 'paragraph' as const,
          text: items.map((item: string) => `• ${item}`).join('\n'),
        }
      case 'gallery':
        // For gallery, just take the first image
        const images = block.content?.images || []
        if (images.length > 0) {
          return {
            type: 'image' as const,
            imageUrl: images[0].url || '',
            caption: images[0].caption || 'Gallery',
            alt: images[0].alt || 'Gallery image',
          }
        }
        return null
      default:
        return null
    }
  }).filter((block): block is NonNullable<typeof block> => block !== null)

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = parsedBlocks
    .filter((b: any) => b.type === 'text')
    .reduce((acc: number, b: any) => {
      const text = b.content?.text || ''
      return acc + text.split(' ').length
    }, 0)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <ArticleDetail
      heroImage={article.heroImage || undefined}
      breadcrumbs={[
        { label: 'Nakbah Archive', href: '/' },
        { label: article.type.charAt(0).toUpperCase() + article.type.slice(1), href: '/' },
        { label: article.title, href: '#' },
      ]}
      title={article.title}
      label="Article"
      category={article.type.charAt(0).toUpperCase() + article.type.slice(1)}
      publishedDate={new Date(article.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      readingTime={`${readingTime} min`}
      content={transformedContent}
      contributors={[
        {
          id: article.author.id,
          name: article.author.name,
          avatar: article.author.avatar || '/api/placeholder/40/40',
          role: 'Author',
          href: '#',
        },
      ]}
    />
  )
}
