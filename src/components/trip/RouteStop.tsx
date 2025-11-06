'use client'

import { Calendar, Clock, MapPin } from 'lucide-react'

interface RouteStopProps {
  number: number
  title: string
  date: string
  time: string
  description: string
  location?: string
  imageUrl?: string
  isLast?: boolean
}

export function RouteStop({
  number,
  title,
  date,
  time,
  description,
  location,
  imageUrl,
  isLast = false,
}: RouteStopProps) {
  return (
    <div className="flex gap-6">
      {/* Left side - Number and Line */}
      <div className="flex flex-col items-center">
        {/* Number Circle */}
        <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-white font-medium shrink-0">
          {number}
        </div>

        {/* Vertical Line */}
        {!isLast && <div className="w-px flex-1 bg-neutral-800 mt-2" />}
      </div>

      {/* Right side - Content */}
      <div className={`flex-1 ${!isLast ? 'pb-12' : ''}`}>
        {/* Header with Title and Date/Time */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h3 className="font-['IBM_Plex_Sans'] font-medium text-xl text-white">
            {title}
          </h3>

          {/* Date and Time */}
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-400 leading-relaxed mb-4">
          {description}
        </p>

        {/* Image */}
        {imageUrl && (
          <div className="w-full h-40 bg-neutral-800 rounded-lg overflow-hidden mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  )
}
