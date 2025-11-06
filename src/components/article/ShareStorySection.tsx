'use client'

import { PenTool } from 'lucide-react'
import Link from 'next/link'

export function ShareStorySection() {
  return (
    <div className="relative py-16 my-12">
      {/* Decorative Lines */}
      <div className="absolute inset-x-0 top-0 flex items-center">
        <div className="flex-1 border-t border-neutral-700" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center">
        <div className="flex-1 border-t border-neutral-700" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-20 h-22 bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 border border-neutral-700">
          <PenTool className="w-8 h-8 text-[#C9A96E]" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h2 className="text-3xl font-medium text-white mb-4">Share your story</h2>
        <p className="text-base text-neutral-400 max-w-[560px] mb-8">
          Every story matters. Help us preserve the collective memory by contributing your
          personal experiences, testimonies, or knowledge of historical events.
        </p>

        {/* Button */}
        <Link
          href="/contribute"
          className="px-6 py-3 bg-[#C9A96E] hover:bg-[#DBC99E] text-white font-medium rounded-lg transition-colors"
        >
          Contribute now
        </Link>
      </div>
    </div>
  )
}
