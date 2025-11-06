'use client'

import { Calendar, MapPin, Mail, Link as LinkIcon, MoreVertical } from 'lucide-react'

interface UserProfileHeaderProps {
  name: string
  initials: string
  joinedDate: string
  location: string
  email: string
  website?: string
}

export function UserProfileHeader({
  name,
  initials,
  joinedDate,
  location,
  email,
  website
}: UserProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 w-full py-12">
      {/* Avatar */}
      <div className="w-[72px] h-[72px] bg-[#DBC99E] border border-black/[0.08] rounded-full flex items-center justify-center shrink-0">
        <span className="text-2xl font-medium text-[#332217]">
          {initials}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Name */}
        <h1 className="text-[32px] font-medium text-white leading-10">
          {name}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
            <span>{joinedDate}</span>
          </div>
          <span className="text-neutral-600 font-medium">·</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
            <span>{location}</span>
          </div>
          <span className="text-neutral-600 font-medium">·</span>
          <div className="flex items-center gap-1">
            <Mail className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
            <span>{email}</span>
          </div>
          {website && (
            <>
              <span className="text-neutral-600 font-medium">·</span>
              <div className="flex items-center gap-1">
                <LinkIcon className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
                <a href={`https://${website}`} className="text-[#C9A96E] hover:underline">
                  {website}
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="w-10 h-10 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors flex items-center justify-center shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.08)]"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5 text-white" strokeWidth={1.5} />
        </button>
        <button className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-lg hover:bg-neutral-700 transition-colors shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.08)]">
          Support
        </button>
        <button className="px-4 py-2 bg-[#C9A96E] text-[#332217] text-sm font-medium rounded-lg hover:bg-[#B89960] transition-colors shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4)]">
          Follow
        </button>
      </div>
    </div>
  )
}
