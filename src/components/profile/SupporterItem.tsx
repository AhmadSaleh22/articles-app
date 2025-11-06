'use client'

interface SupporterItemProps {
  name: string
  initials: string
  amount: number
  timeAgo: string
}

export function SupporterItem({ name, initials, amount, timeAgo }: SupporterItemProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-10 h-10 bg-[#DBC99E] border border-black/[0.08] rounded-full flex items-center justify-center shrink-0">
        <span className="text-sm font-medium text-[#332217]">{initials}</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <span className="text-sm text-white font-medium">{name}</span>
        <span className="text-xs text-neutral-400">{timeAgo}</span>
      </div>

      {/* Amount */}
      <span className="text-sm font-medium text-[#C9A96E]">${amount}</span>
    </div>
  )
}
