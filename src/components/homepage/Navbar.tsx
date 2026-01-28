'use client'

import { UserPlus, Gift, PenLine, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

function UserProfileDropdown() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || session?.user?.email?.charAt(0).toUpperCase() || "U"
  const userName = session?.user?.name || "User"
  const userEmail = session?.user?.email || ""

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
        type="button"
      >
        <div className="w-8 h-8 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#332217] font-medium text-sm">
          {userInitial}
        </div>
        <span className="text-sm text-gray-300 font-normal hidden sm:block max-w-[120px] truncate">
          {userName}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#332217] font-semibold">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{userName}</p>
                <p className="text-xs text-gray-400 truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors"
            >
              <User className="w-4 h-4 text-gray-400" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border-t border-white/10 py-2">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors w-full"
              type="button"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthenticated = status === "authenticated"

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
          <Link
            href="/gift-a-trace"
            className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <Gift className="w-5 h-5 text-neutral-400" />
            <span className="text-sm text-neutral-400">Gift a trace</span>
          </Link>
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

        {isAuthenticated ? (
          <UserProfileDropdown />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/auth/login" className="bg-neutral-800 px-3 py-1.5 rounded-md text-sm text-white hover:bg-neutral-700 transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-[#C9A96E] px-3 py-1.5 rounded-md text-sm text-[#332217] font-medium hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40">
              Sign up
            </Link>
          </div>
        )}
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
          <Link href="/gift-a-trace" className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md">
            <Gift className="w-5 h-5" />
            <span className="text-sm">Gift a trace</span>
          </Link>
          <a href="#" className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md">
            <PenLine className="w-5 h-5" />
            <span className="text-sm">Trace a story</span>
          </a>
          <div className="h-px bg-white/12 my-2" />
          {isAuthenticated ? (
            <div className="space-y-2">
              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#332217] font-semibold">
                  {session?.user?.name?.charAt(0).toUpperCase() || session?.user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{session?.user?.name || "User"}</p>
                  <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">My Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-neutral-400 hover:bg-white/5 rounded-md"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  signOut({ callbackUrl: "/" })
                }}
                className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-white/5 rounded-md w-full"
                type="button"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login" className="flex-1 bg-neutral-800 px-3 py-2 rounded-md text-sm text-white text-center">
                Login
              </Link>
              <Link href="/auth/signup" className="flex-1 bg-[#C9A96E] px-3 py-2 rounded-md text-sm text-[#332217] font-medium text-center">
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
