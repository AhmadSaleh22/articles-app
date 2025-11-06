'use client'

import { Plus } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description: string
  showButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
}

export function PageHeader({
  title,
  description,
  showButton = false,
  buttonText = 'Contribute',
  onButtonClick,
}: PageHeaderProps) {
  return (
    <div className="flex items-center gap-6 px-6 md:px-20 lg:px-40 py-12">
      <div className="flex-1 flex flex-col gap-2 max-w-md">
        <h1 className="text-2xl font-['IBM_Plex_Sans'] font-medium text-white leading-8">
          {title}
        </h1>
        <p className="text-sm text-neutral-400 leading-5 tracking-tight">
          {description}
        </p>
      </div>
      {showButton && (
        <button
          onClick={onButtonClick}
          className="bg-[#C9A96E] px-3 py-2 rounded-lg text-sm font-medium text-[#332217] hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {buttonText}
        </button>
      )}
    </div>
  )
}
