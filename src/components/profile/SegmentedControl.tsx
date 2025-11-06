'use client'

import { useState } from 'react'
import { FileText, Activity, IdCard } from 'lucide-react'

type Tab = 'articles' | 'activity' | 'about'

interface SegmentedControlProps {
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
}

const tabs = [
  { id: 'articles' as Tab, label: 'Articles', icon: FileText },
  { id: 'activity' as Tab, label: 'Activity', icon: Activity },
  { id: 'about' as Tab, label: 'About', icon: IdCard },
]

export function SegmentedControl({ activeTab = 'articles', onTabChange }: SegmentedControlProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>(activeTab)

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="bg-neutral-800 p-1 rounded-xl flex gap-1 w-full relative shadow-[inset_0px_2px_4px_0px_rgba(23,23,23,0.4)]">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = selectedTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all
              ${isActive
                ? 'bg-neutral-700 text-white shadow-[0px_4px_8px_-1px_rgba(23,23,23,0.08),0px_2px_4px_-1px_rgba(23,23,23,0.04)] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.08)]'
                : 'text-neutral-500 hover:text-neutral-400'
              }
            `}
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
