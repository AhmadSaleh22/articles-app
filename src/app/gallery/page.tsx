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

export default function GalleryPage() {
  const [gallery, setGallery] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchLatestGallery = async () => {
      try {
        const response = await fetch('/api/contents')
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()

        // Find the first gallery type content
        const latestGallery = data.contents.find((c: any) => c.type === 'gallery')

        if (latestGallery) {
          // Fetch full gallery details
          const galleryResponse = await fetch(`/api/contents/${latestGallery.id}`)
          if (!galleryResponse.ok) {
            setError(true)
            return
          }
          const galleryData = await galleryResponse.json()
          setGallery(galleryData.content)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching gallery:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestGallery()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !gallery) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No Galleries Found</h1>
          <p className="text-neutral-400 mb-6">There are no published galleries yet.</p>
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

  // Parse hero gallery images
  let heroGallery: string[] = []
  try {
    if (gallery.heroImage) {
      const parsed = JSON.parse(gallery.heroImage)
      if (Array.isArray(parsed)) {
        heroGallery = parsed.map((img: any) => img.url || img).filter(Boolean)
      }
    }
  } catch (e) {
    console.error('Error parsing gallery images:', e)
  }

  // Parse content blocks
  let parsedBlocks: any[] = []
  try {
    if (gallery.content) {
      const parsedContent = JSON.parse(gallery.content)
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
      heroGallery={heroGallery.length > 0 ? heroGallery : undefined}
      breadcrumbs={[
        { label: 'Nakbah Archive', href: '/' },
        { label: 'Gallery', href: '/' },
        { label: gallery.title, href: '#' },
      ]}
      title={gallery.title}
      label="Latest Gallery"
      category="Gallery"
      publishedDate={new Date(gallery.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      readingTime={`${heroGallery.length} images`}
      content={transformedContent}
      contributors={[
        {
          id: gallery.author.id,
          name: gallery.author.name,
          avatar: gallery.author.avatar || '/api/placeholder/40/40',
          role: 'Author',
          href: '#',
        },
      ]}
    />
  )
}
