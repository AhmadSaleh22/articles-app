"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"

export function ShareSection(): React.JSX.Element {
  return (
    <section className="py-20 px-6 bg-[#171717] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 opacity-50" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-neutral-800 rounded-full">
          <Pencil className="w-8 h-8 text-[#C9A96E]" />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white">
          Share your story
        </h2>

        <p className="text-lg text-neutral-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          Every story matters. Help us preserve the collective memory by contributing
          your personal experiences, testimonies, or knowledge of historical events.
        </p>

        <Link
          href="/contribute"
          className="inline-flex items-center justify-center bg-[#C9A96E] text-[#332217] font-medium px-6 py-3 rounded-md hover:bg-[#B89A5E] transition-colors shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)]"
        >
          Contribute Now!
        </Link>
      </div>
    </section>
  )
}
