'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchInputProps {
  placeholder?: string
  onSearch?: (value: string) => void
}

export function SearchInput({
  placeholder = 'Search content...',
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onSearch?.(e.target.value)
  }

  return (
    <div className="w-full max-w-[320px]">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-neutral-500" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all"
        />
      </div>
    </div>
  )
}
