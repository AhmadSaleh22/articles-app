'use client'

import { Navbar } from '@/components/homepage/Navbar'
import { Footer } from '@/components/homepage/Footer'
import { InfoSection } from './InfoSection'
import { JoinForm } from './JoinForm'

export function JoinCollective() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Info Section */}
          <div>
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
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
