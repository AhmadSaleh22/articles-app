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

export default function VideoPage() {
  const [video, setVideo] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const response = await fetch('/api/contents')
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()

        // Find the first video type content
        const latestVideo = data.contents.find((c: any) => c.type === 'video')

        if (latestVideo) {
          // Fetch full video details
          const videoResponse = await fetch(`/api/contents/${latestVideo.id}`)
          if (!videoResponse.ok) {
            setError(true)
            return
          }
          const videoData = await videoResponse.json()
          setVideo(videoData.content)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching video:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestVideo()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No Videos Found</h1>
          <p className="text-neutral-400 mb-6">There are no published videos yet.</p>
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

  // Parse content blocks
  let parsedBlocks: any[] = []
  try {
    if (video.content) {
      const parsedContent = JSON.parse(video.content)
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
      default:
        return null
    }
  }).filter((block): block is NonNullable<typeof block> => block !== null)

  // Calculate reading time
  const wordCount = parsedBlocks
    .filter((b: any) => b.type === 'text')
    .reduce((acc: number, b: any) => {
      const text = b.content?.text || ''
      return acc + text.split(' ').length
    }, 0)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <ArticleDetail
      heroVideo={video.heroImage || undefined}
      breadcrumbs={[
        { label: 'Nakbah Archive', href: '/' },
        { label: 'Video', href: '/' },
        { label: video.title, href: '#' },
      ]}
      title={video.title}
      label="Latest Video"
      category="Video"
      publishedDate={new Date(video.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      readingTime={`${readingTime} min`}
      content={transformedContent}
      contributors={[
        {
          id: video.author.id,
          name: video.author.name,
          avatar: video.author.avatar || '/api/placeholder/40/40',
          role: 'Author',
          href: '#',
        },
      ]}
    />
  )
}
