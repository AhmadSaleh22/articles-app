'use client'

import { Calendar } from 'lucide-react'

interface TimelineCardProps {
  date: string
  title: string
  description: string
  imageUrl?: string
  onClick?: () => void
}

export function TimelineCard({
  date,
  title,
  description,
  imageUrl,
  onClick,
}: TimelineCardProps) {
  return (
    <a
      onClick={onClick}
      className="flex gap-6 items-center cursor-pointer hover:bg-neutral-800/30 transition-colors rounded-lg p-2 -ml-2"
    >
      {/* Calendar Icon */}
      <div className="flex items-center justify-center w-8 h-8 bg-neutral-800 border border-neutral-700 rounded-lg shrink-0">
        <Calendar className="w-4 h-4 text-neutral-500" />
      </div>

      {/* Hexagonal Image */}
      <div
        className="relative w-[120px] h-[128px] shrink-0 overflow-hidden"
        style={{
          clipPath:
            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-700" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        {/* Date */}
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          {date}
        </p>

        {/* Title */}
        <h3 className="font-['IBM_Plex_Sans'] font-medium text-xl text-white leading-7">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-5 line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  )
}
