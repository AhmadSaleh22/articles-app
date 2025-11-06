'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleDetail } from '@/components/article'

interface Content {
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

export default function ThreadPage({ params }: { params: Promise<{ slug: string }> }) {
  const [thread, setThread] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const { slug } = await params

        // Check if slug is a UUID (contains dashes and is 36 chars)
        const isUUID = slug.length === 36 && slug.includes('-')

        // Use appropriate API endpoint
        const apiUrl = isUUID ? `/api/contents/${slug}` : `/api/contents/slug/${slug}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()
        setThread(data.content)
      } catch (err) {
        console.error('Error fetching thread:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchThread()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !thread) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Thread Not Found</h1>
          <p className="text-neutral-400 mb-6">The thread you're looking for doesn't exist.</p>
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

  // Parse content blocks (threads have posts as blocks)
  let parsedBlocks: any[] = []
  try {
    if (thread.content) {
      const parsedContent = JSON.parse(thread.content)
      parsedBlocks = parsedContent.blocks || parsedContent || []
    }
  } catch (e) {
    console.error('Error parsing content:', e)
  }

  // Transform thread posts to ArticleDetail format
  const transformedContent = parsedBlocks.flatMap((post: any, postIndex: number) => {
    const postBlocks = post.blocks || []
    return postBlocks.map((block: any, blockIndex: number) => {
      switch (block.type) {
        case 'text':
          return {
            type: 'paragraph' as const,
            text: `[Post ${postIndex + 1}] ${block.content?.text || ''}`,
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
            alt: block.content?.alt || `Post ${postIndex + 1} Image`,
          }
        case 'heading':
          return {
            type: 'heading' as const,
            text: block.content?.text || '',
          }
        default:
          return null
      }
    }).filter(Boolean)
  }).filter(Boolean)

  // Calculate reading time
  const wordCount = parsedBlocks.reduce((acc: number, post: any) => {
    const postBlocks = post.blocks || []
    return acc + postBlocks
      .filter((b: any) => b.type === 'text')
      .reduce((sum: number, b: any) => {
        const text = b.content?.text || ''
        return sum + text.split(' ').length
      }, 0)
  }, 0)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <ArticleDetail
      heroImage={thread.heroImage || undefined}
      breadcrumbs={[
        { label: 'Nakbah Archive', href: '/' },
        { label: 'Thread', href: '/thread' },
        { label: thread.title, href: '#' },
      ]}
      title={thread.title}
      label="Thread"
      category="Thread"
      publishedDate={new Date(thread.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      readingTime={`${parsedBlocks.length} posts • ${readingTime} min`}
      content={transformedContent}
      contributors={[
        {
          id: thread.author.id,
          name: thread.author.name,
          avatar: thread.author.avatar || '/api/placeholder/40/40',
          role: 'Author',
          href: '#',
        },
      ]}
    />
  )
}
