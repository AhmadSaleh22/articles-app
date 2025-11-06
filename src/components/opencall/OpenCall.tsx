'use client'

import { Navbar } from '@/components/homepage/Navbar'
import { ShareStory } from '@/components/homepage/ShareStory'
import { Footer } from '@/components/homepage/Footer'
import { PageHeader } from './PageHeader'
import { SearchInput } from './SearchInput'
import { FilterTabs } from './FilterTabs'
import { CallCard } from './CallCard'

// Sample data - replace with actual API data
const callsData = [
  {
    id: 1,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 2,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 3,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 4,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 5,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 6,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 7,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 8,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 9,
    title: 'Insert card title here',
    creator: 'Creator',
    timeline: '16 days',
    description:
      'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
]

export function OpenCall() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {callsData.map((call) => (
            <CallCard
              key={call.id}
              title={call.title}
              creator={call.creator}
              timeline={call.timeline}
              description={call.description}
              imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&q=80"
            />
          ))}
        </div>
      </div>

      {/* Share Your Story Section */}
      <ShareStory />

      {/* Footer */}
      <Footer />
    </div>
  )
}
