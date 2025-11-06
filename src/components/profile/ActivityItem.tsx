'use client'

import { MapPin, Calendar, ChevronRight } from 'lucide-react'

interface ActivityItemProps {
  type: string
  title: string
  date: string
  onClick?: () => void
}

export function ActivityItem({ type, title, date, onClick }: ActivityItemProps) {
  return (
    <div className="relative flex flex-col w-full cursor-pointer hover:bg-neutral-900/50 transition-colors" onClick={onClick}>
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
      <div className="border-l border-r border-neutral-700 flex items-center gap-4 px-6 py-3">
        {/* Icon */}
        <div className="w-8 h-10 flex items-center justify-center shrink-0">
          <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white">{type}</span>
            <span className="text-[#C9A96E]">{title}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>{date}</span>
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-4 h-4 text-neutral-500 shrink-0" strokeWidth={1.5} />
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
