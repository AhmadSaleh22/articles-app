'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

interface AvailabilityCalendarProps {
  frequency: 'weekly' | 'monthly'
  onSelectionChange?: (selectedDates: Date[], timeSlots: Record<string, string[]>) => void
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
]

export function AvailabilityCalendar({ frequency, onSelectionChange }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedDateForTime, setSelectedDateForTime] = useState<Date | null>(null)
  const [timeSlotsByDate, setTimeSlotsByDate] = useState<Record<string, string[]>>({})

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const weekDays: Date[] = []
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek)
      weekDay.setDate(startOfWeek.getDate() + i)
      weekDays.push(weekDay)
    }
    return weekDays
  }

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isDateSelected = (date: Date | null) => {
    if (!date) return false
    return selectedDates.some((selectedDate) => isSameDay(selectedDate, date))
  }

  const toggleDate = (date: Date | null) => {
    if (!date) return

    const isSelected = isDateSelected(date)
    let newSelectedDates: Date[]

    if (isSelected) {
      newSelectedDates = selectedDates.filter((d) => !isSameDay(d, date))
      // Remove time slots for this date
      const dateKey = date.toISOString().split('T')[0]
      const newTimeSlots = { ...timeSlotsByDate }
      delete newTimeSlots[dateKey]
      setTimeSlotsByDate(newTimeSlots)
    } else {
      newSelectedDates = [...selectedDates, date]
    }

    setSelectedDates(newSelectedDates)
    onSelectionChange?.(newSelectedDates, timeSlotsByDate)
  }

  const toggleTimeSlot = (timeSlot: string) => {
    if (!selectedDateForTime) return

    const dateKey = selectedDateForTime.toISOString().split('T')[0]
    const currentSlots = timeSlotsByDate[dateKey] || []

    let newSlots: string[]
    if (currentSlots.includes(timeSlot)) {
      newSlots = currentSlots.filter((slot) => slot !== timeSlot)
    } else {
      newSlots = [...currentSlots, timeSlot]
    }

    const newTimeSlotsByDate = {
      ...timeSlotsByDate,
      [dateKey]: newSlots,
    }

    setTimeSlotsByDate(newTimeSlotsByDate)
    onSelectionChange?.(selectedDates, newTimeSlotsByDate)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 7)
    } else {
      newDate.setDate(currentDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  const days = frequency === 'monthly' ? getDaysInMonth(currentDate) : getWeekDays(currentDate)

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => frequency === 'monthly' ? navigateMonth('prev') : navigateWeek('prev')}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-400" />
          </button>
          <button
            type="button"
            onClick={() => frequency === 'monthly' ? navigateMonth('next') : navigateWeek('next')}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        {/* Days of week header */}
        <div className={`grid ${frequency === 'monthly' ? 'grid-cols-7' : 'grid-cols-7'} gap-2 mb-2`}>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-neutral-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className={`grid ${frequency === 'monthly' ? 'grid-cols-7' : 'grid-cols-7'} gap-2`}>
          {days.map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleDate(day)}
              disabled={!day}
              className={`
                aspect-square rounded-lg p-2 text-sm font-medium transition-all
                ${!day ? 'invisible' : ''}
                ${
                  isDateSelected(day)
                    ? 'bg-[#C9A96E] text-[#171717] hover:bg-[#B89960]'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }
                ${
                  day && isSameDay(day, new Date())
                    ? 'ring-2 ring-[#C9A96E] ring-offset-2 ring-offset-neutral-900'
                    : ''
                }
              `}
            >
              {day?.getDate()}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Dates Summary */}
      {selectedDates.length > 0 && (
        <div className="pt-4 border-t border-neutral-800">
          <p className="text-sm text-neutral-400 mb-3">
            Selected dates ({selectedDates.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedDateForTime(date)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                  ${
                    selectedDateForTime && isSameDay(selectedDateForTime, date)
                      ? 'bg-[#C9A96E] text-[#171717]'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }
                `}
              >
                <Clock className="w-4 h-4" />
                <span>
                  {monthNames[date.getMonth()].slice(0, 3)} {date.getDate()}
                </span>
                <span className="text-xs opacity-75">
                  ({timeSlotsByDate[date.toISOString().split('T')[0]]?.length || 0} slots)
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Slots Selection */}
      {selectedDateForTime && (
        <div className="pt-4 border-t border-neutral-800">
          <p className="text-sm text-neutral-400 mb-3">
            Select time slots for {monthNames[selectedDateForTime.getMonth()]} {selectedDateForTime.getDate()}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => {
              const dateKey = selectedDateForTime.toISOString().split('T')[0]
              const isSelected = timeSlotsByDate[dateKey]?.includes(slot)
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleTimeSlot(slot)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? 'bg-[#C9A96E] text-[#171717]'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300'
                    }
                  `}
                >
                  {slot}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
