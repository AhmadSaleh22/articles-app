'use client'

import { Heart } from 'lucide-react'
import { SupporterItem } from './SupporterItem'

interface Supporter {
  name: string
  initials: string
  amount: number
  timeAgo: string
}

interface SupportCardProps {
  totalTips: number
  totalSupporters: number
  currentMonthlyAmount: number
  monthlyGoal: number
  recentSupporters: Supporter[]
}

export function SupportCard({
  totalTips,
  totalSupporters,
  currentMonthlyAmount,
  monthlyGoal,
  recentSupporters,
}: SupportCardProps) {
  const progressPercentage = (currentMonthlyAmount / monthlyGoal) * 100

  return (
    <div className="relative flex flex-col w-full">
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
      <div className="border-l border-r border-neutral-700 flex flex-col gap-6 px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#C9A96E]" strokeWidth={1.5} fill="#C9A96E" />
          <h3 className="text-base font-medium text-white">Support my work</h3>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-2xl font-semibold text-white">${totalTips}</span>
            <span className="text-sm text-neutral-400">Total Tips</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-semibold text-white">{totalSupporters}</span>
            <span className="text-sm text-neutral-400">Supporters</span>
          </div>
        </div>

        {/* Monthly Goal */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400">Monthly goal</span>
            <span className="text-white font-medium">
              ${currentMonthlyAmount} / ${monthlyGoal}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A96E] rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Tip Buttons */}
        <div className="flex gap-2">
          {[1, 5, 10, 25].map((amount) => (
            <button
              key={amount}
              className="flex-1 px-4 py-2 bg-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700"
            >
              ${amount}
            </button>
          ))}
          <button className="flex-1 px-4 py-2 bg-neutral-800 text-white text-sm font-medium rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700">
            Custom
          </button>
        </div>

        {/* Recent Supporters Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-medium text-white">Recent Supporters</h4>
          <div className="flex flex-col gap-3">
            {recentSupporters.map((supporter, index) => (
              <SupporterItem
                key={index}
                name={supporter.name}
                initials={supporter.initials}
                amount={supporter.amount}
                timeAgo={supporter.timeAgo}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
          <span className="text-sm text-neutral-400">
            {recentSupporters.length}/{totalSupporters}
          </span>
          <button className="text-sm text-[#C9A96E] hover:text-[#DBC99E] transition-colors">
            Show all supporters
          </button>
        </div>
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
