'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="relative inline-flex items-center h-16">
      {/* Left Rounded Edge */}
      <div className="h-16 w-6 relative shrink-0">
        <svg width="24" height="64" viewBox="0 0 24 64" fill="none" className="absolute inset-0">
          <path d="M24 0H8C3.58172 0 0 3.58172 0 8V56C0 60.4183 3.58172 64 8 64H24V0Z" fill="#262626"/>
        </svg>
      </div>

      {/* Content */}
      <div className="bg-[#262626] flex items-center gap-2 h-16 relative">
        {/* Home Icon */}
        <Home className="w-5 h-5 text-[#a3a3a3]" strokeWidth={1.5} />

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={index} className="flex items-center gap-2">
              {/* Separator */}
              <ChevronRight className="w-4 h-4 text-[#5c5c5c]" strokeWidth={2} />

              {/* Breadcrumb Item */}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[14px] leading-5 text-[#a3a3a3] hover:text-white transition-colors tracking-[-0.07px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`text-[14px] leading-5 tracking-[-0.07px] ${isLast ? 'text-white font-medium' : 'text-[#a3a3a3]'}`}>
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Right Rounded Edge */}
      <div className="h-16 w-6 relative shrink-0">
        <svg width="24" height="64" viewBox="0 0 24 64" fill="none" className="absolute inset-0">
          <path d="M0 0H16C20.4183 0 24 3.58172 24 8V56C24 60.4183 20.4183 64 16 64H0V0Z" fill="#262626"/>
        </svg>
      </div>

      {/* Inset Shadow Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08)]" />
    </div>
  )
}
