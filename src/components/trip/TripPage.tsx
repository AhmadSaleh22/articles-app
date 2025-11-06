'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Navbar } from '@/components/homepage/Navbar'
import { ShareStory } from '@/components/homepage/ShareStory'
import { Footer } from '@/components/homepage/Footer'
import { TripHero } from './TripHero'
import { TripInfoCard } from './TripInfoCard'
import { BookingForm } from './BookingForm'
import { RouteStop } from './RouteStop'

interface TripPageProps {
  heroImageUrl?: string
  title: string
  tags?: string[]
  fromLocation: string
  toLocation: string
  date: string
  duration: string
  groupSize: string
  languages: string
  price: number
  aboutText: string
  highlights: string[]
  routeStops: Array<{
    id: number
    title: string
    date: string
    time: string
    description: string
    location?: string
    imageUrl?: string
  }>
}

export function TripPage({
  heroImageUrl,
  title,
  tags,
  fromLocation,
  toLocation,
  date,
  duration,
  groupSize,
  languages,
  price,
  aboutText,
  highlights,
  routeStops,
}: TripPageProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'map'>('timeline')

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <TripHero
        imageUrl={heroImageUrl}
        title={title}
        tags={tags}
        fromLocation={fromLocation}
        toLocation={toLocation}
      />

      {/* Main Content */}
      <div className="px-6 md:px-20 lg:px-40 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Trip Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Trip Info Card */}
            <TripInfoCard
              date={date}
              duration={duration}
              groupSize={groupSize}
              languages={languages}
            />

            {/* About Section */}
            <div>
              <h2 className="font-['IBM_Plex_Sans'] font-medium text-xl text-white mb-6">
                About this trip
              </h2>
              <p className="text-neutral-400 leading-relaxed">{aboutText}</p>
            </div>

            {/* Trip Highlights */}
            <div>
              <h2 className="font-['IBM_Plex_Sans'] font-medium text-xl text-white mb-6">
                Trip highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-400">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Controls */}
            <div className="flex gap-2 border-b border-neutral-800">
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'timeline'
                    ? 'text-[#C9A96E] border-b-2 border-[#C9A96E]'
                    : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                Trip timeline
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'map'
                    ? 'text-[#C9A96E] border-b-2 border-[#C9A96E]'
                    : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                Route map
              </button>
            </div>

            {/* Trip Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-0">
                {routeStops.map((stop, index) => (
                  <RouteStop
                    key={stop.id}
                    number={stop.id}
                    title={stop.title}
                    date={stop.date}
                    time={stop.time}
                    description={stop.description}
                    location={stop.location}
                    imageUrl={stop.imageUrl}
                    isLast={index === routeStops.length - 1}
                  />
                ))}
              </div>
            )}

            {/* Route Map (Placeholder) */}
            {activeTab === 'map' && (
              <div className="w-full h-96 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-500">
                Map view coming soon...
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <BookingForm price={price} />
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
