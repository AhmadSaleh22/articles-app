'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="relative flex flex-col w-[264px]">
      {/* Top Border with Corners */}
      <div className="flex items-start justify-between w-full h-6">
        {/* Top Left Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>

        {/* Top Border */}
        <div className="flex-1 border-t border-neutral-700 h-px self-start" />

        {/* Top Right Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-x-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>

      {/* Body */}
      <div className="border-l border-r border-neutral-700 flex flex-col items-center gap-2 px-10 pt-0 pb-8">
        <Icon className="w-6 h-6 text-[#E8DDC0]" strokeWidth={1.5} />
        <div className="flex flex-col items-center gap-1 text-center w-full">
          <p className="text-base font-medium text-white leading-6">
            {value}
          </p>
          <p className="text-xs font-medium text-neutral-500 leading-4 overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {label}
          </p>
        </div>
      </div>

      {/* Bottom Border with Corners */}
      <div className="flex items-end justify-between w-full h-6">
        {/* Bottom Left Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-y-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>

        {/* Bottom Border */}
        <div className="flex-1 border-b border-neutral-700 h-px self-end" />

        {/* Bottom Right Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  )
}
