'use client'

import { Navbar } from '@/components/homepage/Navbar'
import { ShareStory } from '@/components/homepage/ShareStory'
import { Footer } from '@/components/homepage/Footer'
import { PageHeader } from '@/components/opencall/PageHeader'
import { SearchInput } from '@/components/opencall/SearchInput'
import { FilterTabs } from '@/components/opencall/FilterTabs'
import { HeroBanner } from './HeroBanner'
import { TimelineSection } from './TimelineSection'

interface CollectionProps {
  title?: string
  description?: string
  bannerImageUrl?: string
}

// Sample timeline data
const timelineData = [
  {
    id: 'past',
    title: 'Explore the past',
    fromDate: '2025',
    toDate: '2025',
    defaultExpanded: false,
    items: [],
  },
  {
    id: 'current',
    title: 'Explore the current',
    fromDate: '2025',
    toDate: '2025',
    defaultExpanded: true,
    items: [
      {
        id: 1,
        date: 'November 2, 1944',
        title: 'Assassination of Lord Moyne',
        description:
          'Zionist militants of the Lehi group assassinate British Minister Lord Moyne in Cairo, escalating British-Zionist hostilities.',
        imageUrl:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&q=80',
      },
      {
        id: 2,
        date: 'November 2, 1944',
        title: 'Assassination of Lord Moyne',
        description:
          'Zionist militants of the Lehi group assassinate British Minister Lord Moyne in Cairo, escalating British-Zionist hostilities.',
        imageUrl:
          'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&q=80',
      },
      {
        id: 3,
        date: 'November 2, 1944',
        title: 'Assassination of Lord Moyne',
        description:
          'Zionist militants of the Lehi group assassinate British Minister Lord Moyne in Cairo, escalating British-Zionist hostilities.',
        imageUrl:
          'https://images.unsplash.com/photo-1541336032412-2048a678540d?w=200&h=200&fit=crop&q=80',
      },
      {
        id: 4,
        date: 'November 2, 1944',
        title: 'Assassination of Lord Moyne',
        description:
          'Zionist militants of the Lehi group assassinate British Minister Lord Moyne in Cairo, escalating British-Zionist hostilities.',
        imageUrl:
          'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=200&fit=crop&q=80',
      },
    ],
    totalCount: 10,
  },
  {
    id: 'future',
    title: 'Explore the future',
    fromDate: '2025',
    toDate: '2025',
    defaultExpanded: false,
    items: [],
  },
]

export function Collection({
  title = 'Collection name',
  description = 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  bannerImageUrl,
}: CollectionProps) {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Banner */}
      <div className="px-6 md:px-20 lg:px-40 py-6">
        <HeroBanner imageUrl={bannerImageUrl} />
      </div>

      {/* Breadcrumb & Page Header */}
      <div className="px-6 md:px-20 lg:px-40 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-neutral-500 mb-2">
              Collections &gt; <span className="text-white">{title}</span>
            </p>
            <p className="text-neutral-400">{description}</p>
          </div>
          <button className="px-6 py-2.5 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors">
            Contribute
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-6 md:px-20 lg:px-40 py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchInput placeholder="Search content..." />
        <FilterTabs />
      </div>

      {/* Timeline Sections */}
      <div className="px-6 md:px-20 lg:px-40 py-8 space-y-4">
        {timelineData.map((section) => (
          <TimelineSection
            key={section.id}
            title={section.title}
            fromDate={section.fromDate}
            toDate={section.toDate}
            items={section.items}
            defaultExpanded={section.defaultExpanded}
            totalCount={section.totalCount}
          />
        ))}
      </div>

      {/* Share Your Story Section */}
      <ShareStory />

      {/* Footer */}
      <Footer />
    </div>
  )
}
