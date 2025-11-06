'use client'

import { PenLine } from 'lucide-react'

export function ShareStory() {
  return (
    <section className="relative w-full bg-neutral-900 rounded-t-3xl">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 h-full opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1232 294"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M616 0C616 0 800 100 1000 200C1200 300 1232 294 1232 294V0H0V294C0 294 32 300 232 200C432 100 616 0 616 0Z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C9A96E" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-6 md:gap-8 px-4 md:px-10 py-12 md:py-16">
        {/* Icon */}
        <div className="relative w-16 h-16 md:w-20 md:h-22 flex items-center justify-center">
          <div className="absolute inset-0 bg-neutral-800 rounded-lg transform rotate-45" />
          <PenLine className="relative w-6 h-6 md:w-8 md:h-8 text-[#E8DDC0] z-10" />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2 items-center text-center max-w-full md:max-w-xl px-4">
          <h2 className="text-xl md:text-2xl font-['IBM_Plex_Sans'] font-medium text-white leading-7 md:leading-8">
            Share your story
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 leading-5 tracking-tight">
            Every story matters. Help us preserve the collective memory by contributing your personal
            experiences, testimonies, or knowledge of historical events.
          </p>
        </div>

        {/* Call to action button */}
        <button className="bg-[#C9A96E] px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-sm font-medium text-[#332217] hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40">
          Contribute Now!
        </button>
      </div>
    </section>
  )
}
