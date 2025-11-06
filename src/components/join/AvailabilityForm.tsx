'use client'

import { useState } from 'react'
import { Calendar, BarChart3 } from 'lucide-react'
import { AvailabilityCalendar } from './AvailabilityCalendar'

interface AvailabilityFormProps {
  onSubmit?: (data: { frequency: 'weekly' | 'monthly'; selectedDates: Date[]; timeSlots: Record<string, string[]> }) => void
}

export function AvailabilityForm({ onSubmit }: AvailabilityFormProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<'weekly' | 'monthly'>('weekly')
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [timeSlots, setTimeSlots] = useState<Record<string, string[]>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    if (onSubmit) {
      onSubmit({
        frequency: selectedFrequency,
        selectedDates,
        timeSlots,
      })
    }
  }

  const handleSelectionChange = (dates: Date[], slots: Record<string, string[]>) => {
    setSelectedDates(dates)
    setTimeSlots(slots)
  }

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A96E] rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A96E] rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A96E] rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A96E] rounded-br-2xl" />

      <form onSubmit={handleSubmit} className="p-10 space-y-6">
        {/* Set your availability label */}
        <label className="block text-sm font-medium text-neutral-400">
          Set your availability
        </label>

        {/* Frequency Selection Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Weekly Card */}
          <button
            type="button"
            onClick={() => setSelectedFrequency('weekly')}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
              selectedFrequency === 'weekly'
                ? 'bg-neutral-800 border-[#C9A96E]'
                : 'bg-neutral-800/50 border-neutral-700 hover:border-neutral-600'
            }`}
          >
            <Calendar className={`w-8 h-8 mb-3 ${
              selectedFrequency === 'weekly' ? 'text-[#C9A96E]' : 'text-neutral-500'
            }`} />
            <span className={`text-sm font-medium ${
              selectedFrequency === 'weekly' ? 'text-white' : 'text-neutral-400'
            }`}>
              Weekly
            </span>
          </button>

          {/* Monthly Card */}
          <button
            type="button"
            onClick={() => setSelectedFrequency('monthly')}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
              selectedFrequency === 'monthly'
                ? 'bg-neutral-800 border-[#C9A96E]'
                : 'bg-neutral-800/50 border-neutral-700 hover:border-neutral-600'
            }`}
          >
            <BarChart3 className={`w-8 h-8 mb-3 ${
              selectedFrequency === 'monthly' ? 'text-[#C9A96E]' : 'text-neutral-500'
            }`} />
            <span className={`text-sm font-medium ${
              selectedFrequency === 'monthly' ? 'text-white' : 'text-neutral-400'
            }`}>
              Monthly
            </span>
          </button>
        </div>

        {/* Availability Calendar */}
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
          <AvailabilityCalendar
            frequency={selectedFrequency}
            onSelectionChange={handleSelectionChange}
          />
        </div>

        {/* Join the collective team Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors"
        >
          Join the collective team
        </button>

        {/* Go Back Link */}
        <div className="text-center">
          <span className="text-sm text-neutral-400">Go </span>
          <a
            href="/join"
            className="text-sm text-[#C9A96E] hover:underline"
          >
            Back
          </a>
        </div>
      </form>
    </div>
  )
}
