'use client'

import { Heart } from 'lucide-react'

interface SupportSectionProps {
  onSupport?: () => void
}

export function SupportSection({ onSupport }: SupportSectionProps) {
  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E] rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A96E] rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A96E] rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E] rounded-br-2xl" />

      <div className="space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-[#C9A96E]" fill="#C9A96E" />
        </div>

        {/* Title */}
        <h3 className="font-['IBM_Plex_Sans'] font-medium text-2xl text-white">
          Support this trace
        </h3>

        {/* Description */}
        <p className="text-neutral-400 leading-relaxed">
          Help preserve this important story for future generations. Your support
          helps maintain and expand our archive of Palestinian history.
        </p>

        {/* Support Button */}
        <button
          onClick={onSupport}
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors"
        >
          Support this trace
        </button>

        {/* Additional Info */}
        <p className="text-sm text-neutral-500 text-center">
          Every contribution helps us preserve history
        </p>
      </div>
    </div>
  )
}
