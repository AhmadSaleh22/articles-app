'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Users, Globe, DollarSign, Clock, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/homepage/Navbar'
import { ShareStory } from '@/components/homepage/ShareStory'
import { Footer } from '@/components/homepage/Footer'

interface TripData {
  id: string
  title: string
  slug: string
  description?: string
  content?: string
  heroImage?: string
  location?: string
  startDate?: string
  endDate?: string
  price?: number
  groupSize?: string
  duration?: string
  languages?: string
  highlights?: string
  status: string
  createdAt: string
}

export default function TripDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState<TripData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`/api/trips/${params.slug}`)
        if (!response.ok) {
          throw new Error('Trip not found')
        }
        const data = await response.json()
        setTrip(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trip')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchTrip()
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

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Trip Not Found</h1>
            <p className="text-neutral-400 mb-6">{error || 'This trip does not exist.'}</p>
            <Link href="/trip" className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C9A96E] transition-colors">
              Back to Trips
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

  const highlights = trip.highlights ? JSON.parse(trip.highlights) : []
  const isTripPassed = trip.startDate && new Date(trip.startDate) < new Date()

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      {trip.heroImage && (
        <div className="relative h-96 w-full">
          <img
            src={trip.heroImage}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 lg:px-40 py-12">
        <div className="mb-8">
          <Link href="/trip" className="text-[#D4AF37] hover:underline mb-4 inline-block">
            ← Back to Trips
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-cyan-600 text-white text-sm font-semibold rounded-full">
              TRIP
            </span>
            {isTripPassed && (
              <span className="px-3 py-1 bg-gray-600 text-white text-sm font-semibold rounded-full">
                PAST
              </span>
            )}
            {!isTripPassed && (
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                AVAILABLE
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{trip.title}</h1>

          {trip.description && (
            <p className="text-xl text-neutral-300 mb-8">{trip.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Trip Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {trip.location && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm text-neutral-400">Location</span>
                  </div>
                  <p className="text-white font-medium">{trip.location}</p>
                </div>
              )}
              {trip.duration && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm text-neutral-400">Duration</span>
                  </div>
                  <p className="text-white font-medium">{trip.duration}</p>
                </div>
              )}
              {trip.groupSize && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm text-neutral-400">Group Size</span>
                  </div>
                  <p className="text-white font-medium">{trip.groupSize}</p>
                </div>
              )}
              {trip.languages && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm text-neutral-400">Languages</span>
                  </div>
                  <p className="text-white font-medium">{trip.languages}</p>
                </div>
              )}
            </div>

            {/* Dates */}
            {(trip.startDate || trip.endDate) && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Trip Dates</h2>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-white">
                    {trip.startDate && formatDate(trip.startDate)}
                    {trip.endDate && ` - ${formatDate(trip.endDate)}`}
                  </span>
                </div>
              </div>
            )}

            {/* Content */}
            {trip.content && (() => {
              try {
                const contentData = JSON.parse(trip.content)
                const blocks = contentData.blocks || []

                if (blocks.length === 0) return null

                return (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">About This Trip</h2>
                    <div className="space-y-4">
                      {blocks.map((block: any) => {
                        if (block.type === 'text') {
                          return (
                            <p key={block.id} className="text-neutral-300 text-lg leading-relaxed">
                              {block.content?.text || ''}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                )
              } catch (e) {
                return null
              }
            })()}

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <ul className="space-y-2">
                  {highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#D4AF37] mt-1">✓</span>
                      <span className="text-neutral-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 sticky top-6">
              {trip.price && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-sm text-neutral-400">Price per person</span>
                  </div>
                  <p className="text-3xl font-bold text-white">${trip.price}</p>
                </div>
              )}

              {!isTripPassed && (
                <>
                  <Link
                    href="/join"
                    className="w-full block text-center px-6 py-3 bg-[#C9A96E] text-[#332217] rounded-lg hover:bg-[#D4AF37] transition-colors font-semibold mb-3 shadow-inner shadow-white/40"
                  >
                    Join This Trip
                  </Link>
                  <p className="text-xs text-neutral-500 text-center">
                    Secure your spot now
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Your Story Section */}
      <ShareStory />

      {/* Footer */}
      <Footer />
    </div>
  )
}
