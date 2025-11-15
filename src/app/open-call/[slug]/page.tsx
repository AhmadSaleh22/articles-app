'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/homepage/Navbar'
import { ShareStory } from '@/components/homepage/ShareStory'
import { Footer } from '@/components/homepage/Footer'

interface OpenCallData {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  requirements?: string
  deadline?: string
  heroImage?: string
  status: string
  createdAt: string
}

export default function OpenCallDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [openCall, setOpenCall] = useState<OpenCallData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchOpenCall = async () => {
      try {
        const response = await fetch(`/api/open-calls/${params.slug}`)
        if (!response.ok) {
          throw new Error('Open call not found')
        }
        const data = await response.json()
        setOpenCall(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load open call')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchOpenCall()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="flex items-center justify-center py-40">
          <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (error || !openCall) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Open Call Not Found</h1>
            <p className="text-neutral-400 mb-6">{error || 'This open call does not exist.'}</p>
            <Link href="/open-call" className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C9A96E] transition-colors">
              Back to Open Calls
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const isDeadlinePassed = openCall.deadline && new Date(openCall.deadline) < new Date()

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      {openCall.heroImage && (
        <div className="relative h-96 w-full">
          <img
            src={openCall.heroImage}
            alt={openCall.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-20 lg:px-40 py-12">
        <div className="mb-8">
          <Link href="/open-call" className="text-[#D4AF37] hover:underline mb-4 inline-block">
            ← Back to Open Calls
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-black text-sm font-semibold rounded-full">
              OPEN CALL
            </span>
            {isDeadlinePassed && (
              <span className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                CLOSED
              </span>
            )}
            {!isDeadlinePassed && openCall.deadline && (
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                ACTIVE
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{openCall.title}</h1>

          <div className="flex flex-wrap gap-6 text-neutral-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Posted {formatDate(openCall.createdAt)}</span>
            </div>
            {openCall.deadline && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className={isDeadlinePassed ? 'text-red-500' : ''}>
                  Deadline: {formatDate(openCall.deadline)}
                </span>
              </div>
            )}
          </div>

          <p className="text-xl text-neutral-300 mb-8">{openCall.description}</p>
        </div>

        {/* Main Content */}
        {openCall.content && (() => {
          try {
            const contentData = JSON.parse(openCall.content)
            const blocks = contentData.blocks || []

            if (blocks.length === 0) return null

            return (
              <div className="mb-12 prose prose-invert max-w-none">
                {blocks.map((block: any) => {
                  if (block.type === 'text') {
                    return (
                      <p key={block.id} className="text-neutral-300 text-lg leading-relaxed mb-4">
                        {block.content?.text || ''}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )
          } catch (e) {
            return null
          }
        })()}

        {/* Requirements */}
        {openCall.requirements && (
          <div className="mb-12 bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>
            <div className="text-neutral-300">
              {openCall.requirements}
            </div>
          </div>
        )}

        {/* CTA */}
        {!isDeadlinePassed && (
          <div className="text-center py-12 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <h3 className="text-2xl font-bold mb-4">Ready to Contribute?</h3>
            <p className="text-neutral-300 mb-6">
              Join us and be part of this exciting opportunity
            </p>
            <Link
              href={`/join?openCallId=${openCall.id}`}
              className="inline-block px-8 py-3 bg-[#C9A96E] text-[#332217] rounded-lg hover:bg-[#D4AF37] transition-colors font-semibold shadow-inner shadow-white/40"
            >
              Join Now
            </Link>
          </div>
        )}
      </div>

      {/* Share Your Story Section */}
      <ShareStory />

      {/* Footer */}
      <Footer />
    </div>
  )
}
