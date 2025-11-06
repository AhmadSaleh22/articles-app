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

export default function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        // Fetch the latest published article
        const response = await fetch('/api/contents')
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()

        // Get the first article (latest)
        if (data.contents && data.contents.length > 0) {
          const latestArticle = data.contents[0]

          // Fetch full article details
          const articleResponse = await fetch(`/api/contents/${latestArticle.id}`)
          if (!articleResponse.ok) {
            setError(true)
            return
          }
          const articleData = await articleResponse.json()
          setArticle(articleData.content)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestArticle()
  }, [])

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
          <h1 className="text-3xl font-bold text-white mb-4">No Articles Found</h1>
          <p className="text-neutral-400 mb-6">There are no published articles yet.</p>
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
  const transformedContent = parsedBlocks.map((block: any) => {
    switch (block.type) {
      case 'text':
        return {
          type: 'paragraph' as const,
          text: block.content.text || '',
        }
      case 'quote':
        return {
          type: 'quote' as const,
          text: block.content.text || '',
          author: block.content.author,
        }
      case 'image':
        return {
          type: 'image' as const,
          imageUrl: block.content.url || '',
          caption: block.content.caption,
          alt: block.content.alt,
        }
      case 'heading':
        return {
          type: 'heading' as const,
          text: block.content.text || '',
        }
      default:
        return {
          type: 'paragraph' as const,
          text: '',
        }
    }
  }).filter((block: any) => block.text || block.imageUrl)

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = parsedBlocks
    .filter((b: any) => b.type === 'text')
    .reduce((acc: number, b: any) => acc + (b.content.text?.split(' ').length || 0), 0)
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
      label="Latest"
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
