'use client'

import { Calendar, Clock, Users, Globe } from 'lucide-react'

interface TripInfoCardProps {
  date: string
  duration: string
  groupSize: string
  languages: string
}

export function TripInfoCard({
  date,
  duration,
  groupSize,
  languages,
}: TripInfoCardProps) {
  const stats = [
    { icon: Calendar, label: 'Date', value: date },
    { icon: Clock, label: 'Duration', value: duration },
    { icon: Users, label: 'Group size', value: groupSize },
    { icon: Globe, label: 'Languages', value: languages },
  ]

  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Icon */}
            <stat.icon className="w-6 h-6 text-[#C9A96E] mb-3" />

            {/* Label */}
            <p className="text-xs text-neutral-500 mb-2">{stat.label}</p>

            {/* Value */}
            <p className="text-sm text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
