"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { MapPin, Users, Gift, BookOpen, Languages, Menu, X, User, Settings, LogOut, ChevronDown } from "lucide-react"

interface NavigationItemProps {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
}

interface ButtonProps {
  children: React.ReactNode
  variant: "primary" | "secondary"
  href?: string
}

function NavigationItem({ icon, label, href, onClick }: NavigationItemProps): React.JSX.Element {
  const content = (
    <>
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm text-gray-400 font-normal leading-5">
        {label}
      </span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  )
}

function Button({ children, variant, href }: ButtonProps): React.JSX.Element {
  const baseClasses = "px-2 py-1 rounded-md text-sm font-normal leading-5 transition-colors"
  const variantClasses = {
    primary: "bg-[#C9A96E] text-[#332217] font-medium shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] hover:bg-[#B89A5E]",
    secondary: "bg-[#333333] text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040]"
  }

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
        {children}
      </Link>
    )
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} type="button">
      {children}
    </button>
  )
}

function Logo(): React.JSX.Element {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image src="/Brand.svg" alt="Trace of The Tide" width={200} height={32} className="h-8 w-auto" />
    </Link>
  )
}

function LanguageSelector(): React.JSX.Element {
  return (
    <button
      className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
      type="button"
    >
      <Languages className="w-4 h-4 text-gray-400" />
      <span className="text-sm text-gray-400 font-normal leading-5">EN</span>
    </button>
  )
}

function UserProfileDropdown(): React.JSX.Element {
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

export function Header(): React.JSX.Element {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAuthenticated = status === "authenticated"

  const navigationItems = [
    { icon: <MapPin className="w-4 h-4 text-gray-400" />, label: "Fields", href: "/" },
    { icon: <Users className="w-4 h-4 text-gray-400" />, label: "Be a neighbor", href: "/join" },
    { icon: <Gift className="w-4 h-4 text-gray-400" />, label: "Gift a trace" },
    { icon: <BookOpen className="w-4 h-4 text-gray-400" />, label: "Trace a story" }
  ]

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
            <nav className="flex items-center gap-1">
              {navigationItems.map((item, index) => (
                <NavigationItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </nav>

            <div className="w-px h-4 bg-white/10" />

            <LanguageSelector />

            {isAuthenticated ? (
              <UserProfileDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="secondary" href="/auth/login">Login</Button>
                <Button variant="primary" href="/auth/signup">Sign up</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Logo />
              <button
                className="text-white p-2 hover:bg-white/5 rounded-md transition-colors"
                onClick={closeMobileMenu}
                type="button"
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {navigationItems.map((item, index) => (
                  <div key={index} onClick={closeMobileMenu}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>
                        <span className="text-base text-gray-300 font-normal">{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
                        type="button"
                      >
                        <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>
                        <span className="text-base text-gray-300 font-normal">{item.label}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="px-4 py-3">
                  <LanguageSelector />
                </div>
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-white/10 space-y-3">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg mb-4">
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
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-white/5 rounded-md transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      closeMobileMenu()
                      signOut({ callbackUrl: "/" })
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-white/5 rounded-md transition-colors"
                    type="button"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center bg-[#333333] text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] px-4 py-3 rounded-md text-base font-normal transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={closeMobileMenu}
                    className="block w-full text-center bg-[#C9A96E] text-[#332217] font-medium shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] hover:bg-[#B89A5E] px-4 py-3 rounded-md text-base transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
