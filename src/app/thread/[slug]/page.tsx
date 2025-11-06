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
  author: { name: string }
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
        const isUUID = slug.length === 36 && slug.includes('-')
        const apiUrl = isUUID ? `/api/contents/${slug}` : `/api/contents/slug/${slug}`
        const response = await fetch(apiUrl)
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json()
        setThread(data.content)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchThread()
  }, [params])

  if (loading) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div></div>
  if (error || !thread) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold text-white mb-4">Thread Not Found</h1><button onClick={() => router.push('/')} className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C9A96E] transition-colors font-semibold">Go Home</button></div></div>

  let posts: any[] = []
  try { if (thread.content) { const parsedContent = JSON.parse(thread.content); posts = parsedContent.blocks || parsedContent || [] } } catch (e) { console.error('Error parsing thread posts:', e) }

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {thread.heroImage && <div className="mb-8 rounded-xl overflow-hidden"><img src={thread.heroImage} alt={thread.title} className="w-full h-auto object-cover" /></div>}
        <h1 className="text-4xl font-bold text-white mb-4">{thread.title}</h1>
        <div className="flex items-center gap-4 text-neutral-400 text-sm mb-8 pb-6 border-b border-neutral-800">
          <span>By {thread.author.name}</span>
          <span>•</span>
          <time>{new Date(thread.createdAt).toLocaleDateString()}</time>
          <span>•</span>
          <span>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
        </div>
        <div className="space-y-6">
          {posts.map((post: any, postIndex: number) => (
            <div key={post.id || postIndex} className="relative bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6">
              <div className="absolute -left-4 top-6 w-8 h-8 bg-[#C9A96E] rounded-full flex items-center justify-center text-neutral-900 font-bold text-sm shadow-lg">{postIndex + 1}</div>
              <div className="space-y-6 pl-6">
                {post.blocks?.map((block: any, blockIndex: number) => (
                  <div key={blockIndex}>
                    {block.type === 'text' && <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">{block.content.text}</p>}
                    {block.type === 'image' && block.content.url && (
                      <figure className="space-y-2">
                        <img src={block.content.url} alt={block.content.alt || ''} className="w-full rounded-lg" />
                        {block.content.caption && <figcaption className="text-sm text-neutral-500">{block.content.caption}</figcaption>}
                      </figure>
                    )}
                    {block.type === 'video' && block.content.url && <video src={block.content.url} controls className="w-full rounded-lg" />}
                    {block.type === 'quote' && (
                      <blockquote className="border-l-4 border-[#C9A96E] pl-4 py-1">
                        <p className="text-lg italic text-white">{block.content.text}</p>
                        {block.content.author && <footer className="text-neutral-400 text-sm mt-1">— {block.content.author}</footer>}
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
