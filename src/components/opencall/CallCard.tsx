'use client'

import Link from 'next/link'
import { Clock } from 'lucide-react'

interface CallCardProps {
  title: string
  creator: string
  timeline: string
  description: string
  buttonText?: string
  imageUrl?: string
  slug?: string
  onJoin?: () => void
}

export function CallCard({
  title,
  creator,
  timeline,
  description,
  buttonText = 'Join now!',
  imageUrl,
  slug,
  onJoin,
}: CallCardProps) {
  const content = (
    <div className="relative w-full max-w-[360px] h-[386px] bg-neutral-900 rounded-2xl p-6 flex flex-col items-center gap-6">
      {/* Hexagonal Image */}
      <div className="w-[140px] h-[150px] flex items-center justify-center">
        <div
          className="w-full h-full bg-neutral-700"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Title */}
        <h3 className="text-xl font-['IBM_Plex_Sans'] font-medium text-white text-center leading-7 line-clamp-2 drop-shadow-md">
          {title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#DBC99E] border border-black/5 flex items-center justify-center">
              <span className="text-[8.5px] font-medium text-[#332217]">
                {creator.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[#C9A96E]">{creator}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-400" />
            <div className="flex items-center gap-0.5 text-neutral-400">
              <span>Timeline:</span>
              <span>{timeline}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-neutral-400 text-center leading-6 tracking-tight line-clamp-3">
          {description}
        </p>
      </div>

      {/* Button */}
      {slug ? (
        <Link
          href={`/open-call/${slug}`}
          className="bg-[#C9A96E] px-3 py-1.5 rounded-md text-sm font-medium text-[#332217] hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          onClick={onJoin}
          className="bg-[#C9A96E] px-3 py-1.5 rounded-md text-sm font-medium text-[#332217] hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40"
        >
          {buttonText}
        </button>
      )}
    </div>
  )

  if (slug) {
    return (
      <Link href={`/open-call/${slug}`} className="block hover:scale-[1.02] transition-transform">
        {content}
      </Link>
    )
  }

  return content
}
