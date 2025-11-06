'use client'

import { LucideIcon } from 'lucide-react'

interface ContributeTopicCardProps {
  icon: LucideIcon
  label: string
  selected?: boolean
  onClick?: () => void
}

export function ContributeTopicCard({ icon: Icon, label, selected = false, onClick }: ContributeTopicCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors
        ${selected
          ? 'bg-neutral-800 border-[#C9A96E]'
          : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
        }
      `}
      type="button"
    >
      <Icon
        className={`w-6 h-6 ${selected ? 'text-[#C9A96E]' : 'text-neutral-400'}`}
      />
      <span
        className={`text-sm font-medium ${selected ? 'text-[#C9A96E]' : 'text-white'}`}
      >
        {label}
      </span>
    </button>
  )
}
