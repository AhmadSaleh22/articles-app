'use client'

import { UserPlus, Gift, PenLine, Menu } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative flex items-center justify-between gap-4 md:gap-10 p-4 md:p-6 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
      {/* Brand */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="h-6 w-12 md:h-7 md:w-14">
          <svg viewBox="0 0 57 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14L14 0L28 14L14 28L0 14Z" fill="#C9A96E" />
            <path d="M29 14L43 0L57 14L43 28L29 14Z" fill="#C9A96E" opacity="0.6" />
          </svg>
        </div>
        <p className="text-sm md:text-base font-medium text-white tracking-tight">
          Trace of The Tide
        </p>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 hover:bg-white/5 rounded-md transition-colors"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Main Navigation - Desktop */}
      <div className="hidden md:flex flex-1 items-center justify-end gap-4">
        <div className="hidden lg:flex items-center gap-1">
          <a
            href="#"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <span className="text-sm text-neutral-400">Fields</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <UserPlus className="w-5 h-5 text-neutral-400" />
            <span className="text-sm text-neutral-400">Be a neighbor</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <Gift className="w-5 h-5 text-neutral-400" />
            <span className="text-sm text-neutral-400">Gift a trace</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <PenLine className="w-5 h-5 text-neutral-400" />
            <span className="text-sm text-neutral-400">Trace a story</span>
          </a>
        </div>

        <div className="hidden lg:block h-4 w-px bg-white/12" />

        <a
          href="#"
          className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
        >
          <span className="text-sm text-neutral-400">EN</span>
        </a>

        <div className="flex items-center gap-2">
          <button className="bg-neutral-800 px-3 py-1.5 rounded-md text-sm text-white hover:bg-neutral-700 transition-colors">
            Login
          </button>
          <button className="bg-[#C9A96E] px-3 py-1.5 rounded-md text-sm text-[#332217] font-medium hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40">
            Sign up
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md md:hidden p-4 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md">
            <span className="text-sm">Fields</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md">
            <UserPlus className="w-5 h-5" />
            <span className="text-sm">Be a neighbor</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md">
            <Gift className="w-5 h-5" />
            <span className="text-sm">Gift a trace</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md">
            <PenLine className="w-5 h-5" />
            <span className="text-sm">Trace a story</span>
          </a>
          <div className="h-px bg-white/12 my-2" />
          <div className="flex gap-2">
            <button className="flex-1 bg-neutral-800 px-3 py-2 rounded-md text-sm text-white">
              Login
            </button>
            <button className="flex-1 bg-[#C9A96E] px-3 py-2 rounded-md text-sm text-[#332217] font-medium">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
