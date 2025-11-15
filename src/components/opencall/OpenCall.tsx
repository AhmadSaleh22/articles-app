'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/homepage/Navbar'
import { ShareStory } from '@/components/homepage/ShareStory'
import { Footer } from '@/components/homepage/Footer'
import { PageHeader } from './PageHeader'
import { SearchInput } from './SearchInput'
import { FilterTabs } from './FilterTabs'
import { CallCard } from './CallCard'

interface OpenCallData {
  id: string
  title: string
  slug: string
  description: string
  deadline?: string
  heroImage?: string
  createdAt: string
}

export function OpenCall() {
  const [openCalls, setOpenCalls] = useState<OpenCallData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOpenCalls = async () => {
      try {
        const response = await fetch('/api/open-calls')
        if (response.ok) {
          const data = await response.json()
          setOpenCalls(data.openCalls)
        }
      } catch (error) {
        console.error('Error fetching open calls:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpenCalls()
  }, [])

  const getTimeline = (createdAt: string, deadline?: string) => {
    if (deadline) {
      const now = new Date()
      const deadlineDate = new Date(deadline)
      const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return daysLeft > 0 ? `${daysLeft} days left` : 'Closed'
    }
    return 'Open'
  }
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Page Header */}
      <PageHeader
        title="Open Call"
        description="Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus."
      />

      {/* Search and Filters */}
      <div className="px-6 md:px-20 lg:px-40 py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchInput />
        <FilterTabs />
      </div>

      {/* Cards Grid */}
      <div className="px-6 md:px-20 lg:px-40 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : openCalls.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No active open calls at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {openCalls.map((call) => (
              <CallCard
                key={call.id}
                slug={call.slug}
                title={call.title}
                creator="Creator"
                timeline={getTimeline(call.createdAt, call.deadline)}
                description={call.description}
                imageUrl={call.heroImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&q=80"}
              />
            ))}
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
