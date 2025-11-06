'use client'

import { Calendar, Folder } from 'lucide-react'
import { useState } from 'react'

interface ContentCardProps {
  title: string
  author?: string
  date?: string
  category?: string
  description?: string
  imageUrl?: string
  showEdition?: boolean
  editionLabel?: string
  icon?: React.ReactNode
}

export function ContentCard({
  title,
  author,
  date,
  category,
  description,
  imageUrl,
  showEdition = true,
  editionLabel = 'Edition',
  icon,
}: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-[276px] h-[294px] flex flex-col items-center justify-between py-2 px-[110px] cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hexagonal container with thick black border */}
      <div className="absolute inset-0">
        {/* Outer hexagon - creates the thick black border */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Inner hexagon - content area */}
        <div
          className="absolute inset-[3px] overflow-hidden"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {/* Background Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Gradient Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-neutral-900 backdrop-blur-sm flex flex-col items-center justify-end px-6 transition-all duration-300 ${
              isHovered ? 'h-[164px] pt-6 pb-14' : 'h-[164px] pt-6 pb-14'
            }`}
          >
            {/* Title */}
            <h3 className="text-xl font-['IBM_Plex_Sans'] font-medium text-white text-center leading-7 drop-shadow-md line-clamp-2 mb-2">
              {title}
            </h3>

            {/* Metadata */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-2">
              {author && (
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-[#DBC99E] border border-black/5 flex items-center justify-center">
                    <span className="text-[8.5px] font-medium text-[#332217]">
                      {author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-neutral-300 drop-shadow-md">{author}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-neutral-300 drop-shadow-md">{date}</span>
                </div>
              )}
              {category && (
                <div className="flex items-center gap-1">
                  <Folder className="w-4 h-4 text-white" />
                  <span className="text-neutral-300 drop-shadow-md">{category}</span>
                </div>
              )}
            </div>

            {/* Description - Only shown on hover */}
            {isHovered && description && (
              <p className="text-xs text-white text-center leading-4 drop-shadow-md line-clamp-3 animate-fadeIn">
                {description}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Edition Label */}
      {showEdition && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center z-10">
          <div className="flex items-center backdrop-blur-md bg-neutral-900/80 rounded-full overflow-hidden">
            <div className="h-6 w-2 bg-gradient-to-r from-transparent to-neutral-900/80" />
            <span className="px-3 py-1 text-xs font-medium text-white">
              {editionLabel}
            </span>
            <div className="h-6 w-2 bg-gradient-to-l from-transparent to-neutral-900/80" />
          </div>
        </div>
      )}

      {/* Icon at top */}
      {icon && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-neutral-800/80 backdrop-blur-sm rounded-lg z-10">
          {icon}
        </div>
      )}
    </div>
  )
}
