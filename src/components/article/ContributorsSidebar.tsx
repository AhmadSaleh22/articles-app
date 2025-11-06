'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Contributor {
  id: string
  name: string
  avatar: string
  role: string
  href?: string
}

interface ContributorsSidebarProps {
  contributors: Contributor[]
}

export function ContributorsSidebar({ contributors }: ContributorsSidebarProps) {
  return (
    <div className="relative flex flex-col w-full">
      {/* Top Border with Corners */}
      <div className="flex items-start justify-between w-full h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
        <div className="flex-1 border-t border-neutral-700 h-px self-start" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-x-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>

      {/* Body */}
      <div className="border-l border-r border-neutral-700 px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-white mb-2">Contributors</h3>
          <p className="text-sm text-neutral-400">
            {contributors.length} contributed to this content
          </p>
        </div>

        {/* Contributors List */}
        <div className="flex flex-col gap-4">
          {contributors.map((contributor) => (
            <Link
              key={contributor.id}
              href={contributor.href || '#'}
              className="flex items-center gap-3 group hover:bg-neutral-900/50 rounded-lg transition-colors p-2 -m-2"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-[#DBC99E] border border-black/[0.08] rounded-full flex items-center justify-center shrink-0">
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-white font-medium group-hover:text-[#C9A96E] transition-colors">
                  {contributor.name}
                </h4>
                <p className="text-xs text-neutral-400">{contributor.role}</p>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-5 h-5 text-neutral-600 shrink-0" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Border with Corners */}
      <div className="flex items-end justify-between w-full h-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-y-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
        <div className="flex-1 border-b border-neutral-700 h-px self-end" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  )
}
