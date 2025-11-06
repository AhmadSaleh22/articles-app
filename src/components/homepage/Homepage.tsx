'use client'

import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { CardGrid } from './CardGrid'
import { ShareStory } from './ShareStory'
import { Footer } from './Footer'

export function Homepage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Background image/gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Card Grid */}
      <CardGrid />

      {/* Share Your Story Section */}
      <ShareStory />

      {/* Footer */}
      <Footer />
    </div>
  )
}
