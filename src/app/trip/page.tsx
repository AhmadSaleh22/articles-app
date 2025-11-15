'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Plane, DollarSign, Users } from 'lucide-react'

interface TripData {
  id: string
  title: string
  slug: string
  description?: string
  heroImage?: string
  coverImage?: string
  location?: string
  startDate?: string
  endDate?: string
  price?: number
  duration?: string
  groupSize?: string
  createdAt: string
}

export default function TripsPage() {
  const [trips, setTrips] = useState<TripData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('/api/trips')
        if (response.ok) {
          const data = await response.json()
          setTrips(data.trips)
        }
      } catch (error) {
        console.error('Error fetching trips:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  const isTripPassed = (startDate?: string) => {
    return startDate && new Date(startDate) < new Date()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link href="/" className="text-[#D4AF37] hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-8 h-8 text-cyan-600" />
            <h1 className="text-4xl font-bold">Available Trips</h1>
          </div>
          <p className="text-neutral-400 text-lg">
            Explore unique travel experiences and join our community on amazing journeys.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-20">
            <Plane className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No Trips Available</h2>
            <p className="text-neutral-400">Check back soon for new travel opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => {
              const isPassed = isTripPassed(trip.startDate)
              const image = trip.heroImage || trip.coverImage
              return (
                <Link
                  key={trip.id}
                  href={`/trip/${trip.slug}`}
                  className="group bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-cyan-600 transition-all"
                >
                  {image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={image}
                        alt={trip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        {isPassed ? (
                          <span className="px-3 py-1 bg-gray-600 text-white text-xs font-semibold rounded-full">
                            PAST
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                            AVAILABLE
                          </span>
                        )}
                      </div>
                      {trip.price && (
                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                          <div className="flex items-center gap-1 text-white">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-bold">{trip.price}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-600 transition-colors">
                      {trip.title}
                    </h3>
                    {trip.description && (
                      <p className="text-neutral-400 mb-4 line-clamp-2">
                        {trip.description}
                      </p>
                    )}
                    <div className="flex flex-col gap-2 text-sm text-neutral-500">
                      {trip.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{trip.location}</span>
                        </div>
                      )}
                      {trip.startDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(trip.startDate)}</span>
                        </div>
                      )}
                      {trip.groupSize && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{trip.groupSize}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
