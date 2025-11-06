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

export default function AudioPage() {
  const [audio, setAudio] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchLatestAudio = async () => {
      try {
        const response = await fetch('/api/contents')
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()

        // Find the first audio type content
        const latestAudio = data.contents.find((c: any) => c.type === 'audio')

        if (latestAudio) {
          // Fetch full audio details
          const audioResponse = await fetch(`/api/contents/${latestAudio.id}`)
          if (!audioResponse.ok) {
            setError(true)
            return
          }
          const audioData = await audioResponse.json()
          setAudio(audioData.content)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching audio:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestAudio()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !audio) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No Audio Found</h1>
          <p className="text-neutral-400 mb-6">There are no published audio files yet.</p>
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
    if (audio.content) {
      const parsedContent = JSON.parse(audio.content)
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
  }).filter(Boolean)

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
      heroAudio={audio.heroImage || undefined}
      audioTitle={audio.title}
      audioDuration={`${readingTime} min`}
      breadcrumbs={[
        { label: 'Nakbah Archive', href: '/' },
        { label: 'Audio', href: '/' },
        { label: audio.title, href: '#' },
      ]}
      title={audio.title}
      label="Latest Audio"
      category="Audio"
      publishedDate={new Date(audio.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      readingTime={`Audio: ${readingTime} min`}
      content={transformedContent}
      contributors={[
        {
          id: audio.author.id,
          name: audio.author.name,
          avatar: audio.author.avatar || '/api/placeholder/40/40',
          role: 'Author',
          href: '#',
        },
      ]}
    />
  )
}
