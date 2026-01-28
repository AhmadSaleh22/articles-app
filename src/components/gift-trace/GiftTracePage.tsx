'use client'

import { DollarSign, Users, Handshake } from 'lucide-react'
import { Navbar } from '@/components/homepage/Navbar'
import { Footer } from '@/components/homepage/Footer'

interface ContributeCardProps {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  onButtonClick?: () => void
}

function ContributeCard({ icon, title, description, buttonText, onButtonClick }: ContributeCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-8 py-6">
      {/* Icon Box */}
      <div className="w-14 h-16 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-800 rounded-lg shadow-[inset_0_1px_0_#333333]" />
        <div className="relative text-[#E8DDC0]">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-base font-medium text-white font-['IBM_Plex_Sans']">
          {title}
        </h3>
        <p className="text-sm text-neutral-400 leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]">
          Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et porttitor purus.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className="px-4 py-2.5 bg-[#C9A96E] rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-[#B89858] transition-colors"
      >
        <span className="text-sm font-medium text-[#332217]">
          {buttonText}
        </span>
      </button>
    </div>
  )
}

interface InfoCardProps {
  title: string
  description: string
}

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="p-5 bg-neutral-800 rounded-lg shadow-[inset_0_1px_0_#333333]">
      <h4 className="text-sm font-medium text-white mb-2">
        {title}
      </h4>
      <p className="text-sm text-neutral-400 leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]">
        {description}
      </p>
    </div>
  )
}

export function GiftTracePage() {
  return (
    <div className="min-h-screen bg-[#171717] relative">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[213px] pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(ellipse 100% 28% at 50% 0%, rgba(201, 169, 110, 0.24) 0%, rgba(201, 169, 110, 0) 100%),
                         linear-gradient(180deg, #333333 0%, rgba(51, 51, 51, 0) 100%)`
          }}
        />
      </div>

      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative pt-12 pb-16 px-4 z-10">
        {/* Header Section */}
        <div className="max-w-[552px] mx-auto text-center mb-16">
          <h1 className="text-[32px] font-medium text-white leading-10 mb-2 font-['IBM_Plex_Sans']">
            Contribute to TTT project
          </h1>
          <p className="text-sm text-neutral-400 leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]">
            Our platform is completely free and open to everyone. You can contribute by donating, joining our team, or partnering with us.
          </p>
        </div>

        {/* Three Contribution Cards */}
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <ContributeCard
            icon={<DollarSign className="w-6 h-6" strokeWidth={1.5} />}
            title="Donate to TTT project"
            description="Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et porttitor purus."
            buttonText="Donate via PayPal"
          />
          <ContributeCard
            icon={<Users className="w-6 h-6" strokeWidth={1.5} />}
            title="Join the team"
            description="Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et porttitor purus."
            buttonText="Join our team"
          />
          <ContributeCard
            icon={<Handshake className="w-6 h-6" strokeWidth={1.5} />}
            title="Contact for partnership"
            description="Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et porttitor purus."
            buttonText="Contact us"
          />
        </div>

        {/* Why do we need your donations */}
        <div className="max-w-[744px] mx-auto mb-10">
          <h2 className="text-base font-medium text-white mb-2 font-['IBM_Plex_Sans']">
            Why do we need your donations?
          </h2>
          <p className="text-sm text-neutral-400 leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]">
            The TTT platform relies entirely on donations to cover operating costs and continue providing high-quality content for free. We believe that our content should be accessible to everyone and everywhere, and your donations help us achieve this vision.
          </p>
        </div>

        {/* How do we use your donations */}
        <div className="max-w-[744px] mx-auto mb-10">
          <h2 className="text-base font-medium text-white mb-4 font-['IBM_Plex_Sans']">
            How do we use your donations?
          </h2>
          <div className="flex flex-col gap-2">
            <InfoCard
              title="Support platform continuity"
              description="Your donations help us cover the costs of website hosting, internet services, and software needed to continually develop and improve the platform."
            />
            <InfoCard
              title="Create high-quality content"
              description="We invest a significant portion of donations in developing high-quality content by contracting with experts in various design fields and translating content."
            />
            <InfoCard
              title="Supporting public and important figures"
              description="We allocate a portion of the donations to provide appropriate support to talented, important, and public figures who do not have sufficient financial resources to access quality platforms."
            />
            <InfoCard
              title="Organizing community events"
              description="We use donations to organize workshops, seminars, and competitions that help build a close-knit community of influencers, provide opportunities for practical change, and connect with experts everywhere."
            />
          </div>
        </div>

        {/* Financial Transparency Section */}
        <div className="max-w-[744px] mx-auto mb-10">
          <h2 className="text-base font-medium text-white mb-2 font-['IBM_Plex_Sans']">
            Financial transparency
          </h2>
          <p className="text-sm text-neutral-400 leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)] mb-6">
            We are committed to full transparency in the use of donations, and we provide regular reports on how funds are spent to ensure donors&apos; confidence and knowledge of the impact their contributions have on the platform&apos;s development and learner service.
          </p>
        </div>

        {/* Horizontal Donate Card */}
        <div className="max-w-[744px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-40">
            <div className="flex items-center gap-4">
              {/* Icon Box */}
              <div className="w-14 h-16 relative flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-0 bg-neutral-800 rounded-lg shadow-[inset_0_1px_0_#333333]" />
                <div className="relative text-[#E8DDC0]">
                  <DollarSign className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium text-white font-['IBM_Plex_Sans']">
                  Donate to TTT project
                </h3>
                <p className="text-sm text-neutral-400 leading-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]">
                  Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et porttitor purus.
                </p>
              </div>
            </div>
            {/* Button */}
            <button className="px-4 py-2.5 bg-[#C9A96E] rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-[#B89858] transition-colors flex-shrink-0">
              <span className="text-sm font-medium text-[#332217]">
                Donate via PayPal
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
