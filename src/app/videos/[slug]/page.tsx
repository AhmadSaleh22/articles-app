'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Content {
  id: string
  title: string
  type: string
  heroImage: string | null
  content: string
  createdAt: string
  author: {
    name: string
  }
}

export default function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const [video, setVideo] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const { slug } = await params
        const response = await fetch(`/api/contents/slug/${slug}`)
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()
        setVideo(data.content)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchVideo()
  }, [params])

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
          <h1 className="text-3xl font-bold text-white mb-4">Video Not Found</h1>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C9A96E] transition-colors font-semibold">Go Home</button>
        </div>
      </div>
    )
  }

  let blocks: any[] = []
  try {
    if (video.content) {
      const parsedContent = JSON.parse(video.content)
      blocks = parsedContent.blocks || []
    }
  } catch (e) {
    console.error('Error parsing content:', e)
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <article className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-white mb-4">{video.title}</h1>
        <div className="flex items-center gap-4 text-neutral-400 text-sm mb-8">
          <span>By {video.author.name}</span>
          <span>•</span>
          <time>{new Date(video.createdAt).toLocaleDateString()}</time>
        </div>
        {video.heroImage && (
          <div className="mb-12 rounded-xl overflow-hidden bg-black">
            <video src={video.heroImage} controls className="w-full aspect-video" />
          </div>
        )}
        <div className="max-w-4xl mx-auto space-y-8">
          {blocks.map((block: any, index: number) => (
            <div key={index}>
              {block.type === 'text' && <p className="text-lg text-neutral-300 leading-relaxed whitespace-pre-wrap">{block.content.text}</p>}
              {block.type === 'image' && block.content.url && (
                <figure className="space-y-3">
                  <img src={block.content.url} alt={block.content.alt || ''} className="w-full rounded-lg" />
                  {block.content.caption && <figcaption className="text-sm text-neutral-500 text-center">{block.content.caption}</figcaption>}
                </figure>
              )}
              {block.type === 'video' && block.content.url && (
                <figure className="space-y-3">
                  <video src={block.content.url} controls className="w-full rounded-lg" />
                  {block.content.caption && <figcaption className="text-sm text-neutral-500 text-center">{block.content.caption}</figcaption>}
                </figure>
              )}
              {block.type === 'quote' && (
                <blockquote className="border-l-4 border-[#C9A96E] pl-6 py-2">
                  <p className="text-2xl italic text-white mb-2">{block.content.text}</p>
                  {block.content.author && <footer className="text-neutral-400">— {block.content.author}</footer>}
                </blockquote>
              )}
              {block.type === 'list' && (
                <ul className="space-y-2 list-disc list-inside text-neutral-300">
                  {block.content.items?.map((item: string, idx: number) => <li key={idx}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
