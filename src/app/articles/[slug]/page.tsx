'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
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
          setLoading(false)
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

  // Parse blocks
  let blocks: any[] = []
  try {
    if (article.content) {
      const parsedContent = JSON.parse(article.content)
      blocks = parsedContent.blocks || []
    }
  } catch (e) {
    console.error('Error parsing content:', e)
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Image */}
        {article.heroImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-4">{article.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-neutral-400 text-sm mb-12 pb-8 border-b border-neutral-800">
          <span>By {article.author.name}</span>
          <span>•</span>
          <time>{new Date(article.createdAt).toLocaleDateString()}</time>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8">
          {blocks.map((block: any, index: number) => (
            <div key={index}>
              {block.type === 'text' && (
                <p className="text-lg text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {block.content.text}
                </p>
              )}

              {block.type === 'image' && block.content.url && (
                <figure className="space-y-3">
                  <img
                    src={block.content.url}
                    alt={block.content.alt || ''}
                    className="w-full rounded-lg"
                  />
                  {block.content.caption && (
                    <figcaption className="text-sm text-neutral-500 text-center">
                      {block.content.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {block.type === 'video' && block.content.url && (
                <figure className="space-y-3">
                  <video src={block.content.url} controls className="w-full rounded-lg" />
                  {block.content.caption && (
                    <figcaption className="text-sm text-neutral-500 text-center">
                      {block.content.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {block.type === 'audio' && block.content.url && (
                <audio src={block.content.url} controls className="w-full" />
              )}

              {block.type === 'quote' && (
                <blockquote className="border-l-4 border-[#C9A96E] pl-6 py-2">
                  <p className="text-2xl italic text-white mb-2">{block.content.text}</p>
                  {block.content.author && (
                    <footer className="text-neutral-400">— {block.content.author}</footer>
                  )}
                </blockquote>
              )}

              {block.type === 'list' && (
                <ul className="space-y-2 list-disc list-inside text-neutral-300">
                  {block.content.items?.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {block.type === 'gallery' && block.content.images && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {block.content.images.map((image: any, idx: number) => (
                    <figure key={idx} className="space-y-2">
                      <img
                        src={image.url}
                        alt={image.alt || ''}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      {image.caption && (
                        <figcaption className="text-xs text-neutral-500">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </div>
  )
}
