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

export default function ThreadPage() {
  const [thread, setThread] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchLatestThread = async () => {
      try {
        const response = await fetch('/api/contents')
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()

        // Find the first thread type content
        const latestThread = data.contents.find((c: any) => c.type === 'thread')

        if (latestThread) {
          // Fetch full thread details
          const threadResponse = await fetch(`/api/contents/${latestThread.id}`)
          if (!threadResponse.ok) {
            setError(true)
            return
          }
          const threadData = await threadResponse.json()
          setThread(threadData.content)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching thread:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestThread()
  }, [])

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
          <h1 className="text-3xl font-bold text-white mb-4">No Threads Found</h1>
          <p className="text-neutral-400 mb-6">There are no published threads yet.</p>
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
        { label: 'Thread', href: '/' },
        { label: thread.title, href: '#' },
      ]}
      title={thread.title}
      label="Latest Thread"
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
