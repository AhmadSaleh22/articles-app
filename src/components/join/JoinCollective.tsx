'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Navbar } from '@/components/homepage/Navbar'
import { Footer } from '@/components/homepage/Footer'
import { InfoSection } from './InfoSection'
import { JoinForm } from './JoinForm'
import { Megaphone } from 'lucide-react'

interface OpenCallData {
  id: string
  title: string
  slug: string
  description: string
  deadline?: string
}

export function JoinCollective() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const openCallId = searchParams.get('openCallId')

  const [openCall, setOpenCall] = useState<OpenCallData | null>(null)
  const [loading, setLoading] = useState(!!openCallId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect to login if not authenticated and trying to submit to open call
    if (openCallId && status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=/join?openCallId=${openCallId}`)
      return
    }

    const fetchOpenCall = async () => {
      if (!openCallId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/open-calls/${openCallId}`)
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

    if (openCallId && status === 'authenticated') {
      fetchOpenCall()
    } else if (!openCallId) {
      setLoading(false)
    }
  }, [openCallId, status, router])

  const infoItems = [
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh.',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh.',
    },
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh.',
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-20 lg:px-40 py-16">
        {loading && openCallId ? (
          <div className="flex items-center justify-center py-40">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Info Section */}
            <div>
              {/* Open Call Banner (if applicable) */}
              {openCall && (
                <div className="mb-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Megaphone className="w-5 h-5 text-[#D4AF37]" />
                    <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-semibold rounded-full">
                      OPEN CALL
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{openCall.title}</h2>
                  <p className="text-neutral-300 text-sm">{openCall.description}</p>
                  {openCall.deadline && (
                    <p className="text-neutral-400 text-xs mt-2">
                      Deadline: {new Date(openCall.deadline).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              )}

              <InfoSection
                title="Join Collective"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh."
                items={infoItems}
                footerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu, vel vestibulum nibh Lorem ipsum dolor sit amet, consectetur adipiscing."
              />
            </div>

            {/* Right Column - Form */}
            <div>
              <JoinForm />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
