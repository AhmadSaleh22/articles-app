'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  FileText,
  Heart,
  Eye,
  Calendar,
  MapPin,
  Mail,
  Link as LinkIcon,
  Settings,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  LogOut,
  Plus,
  LayoutDashboard,
  FolderOpen
} from 'lucide-react'
import { Header } from '@/app/components/header'

interface UserData {
  firstName: string
  lastName: string
  email: string
  location?: string
  website?: string
  createdAt: string
  articlesCount: number
  contributionsCount?: number
  totalReads?: number
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [articlesExpanded, setArticlesExpanded] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const isCreateArticlePage = pathname === '/profile/create-article'

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserData()
    } else if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=' + pathname)
    }
  }, [status, session, router, pathname])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="text-white">Failed to load user data</div>
      </div>
    )
  }

  const fullName = `${userData.firstName} ${userData.lastName}`
  const initials = `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
  const joinedDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
  const daysActive = Math.floor((Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-[#171717] relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 right-0 h-[213px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_27.56%_at_50%_0%,rgba(201,169,110,0.24),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#333333] to-transparent" />
      </div>

      {/* Header/Navbar */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Profile Header Section */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[156px] pt-32 pb-12">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-[72px] h-[72px] rounded-full bg-[#DBC99E] flex items-center justify-center ring-1 ring-black/8">
            <span className="text-2xl font-medium text-[#332217]">{initials}</span>
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-[32px] font-medium text-white leading-10 font-['IBM_Plex_Sans']">
              {fullName}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5 text-[#7B7B7B]" />
                <span className="text-sm text-[#A3A3A3]">Joined {joinedDate}</span>
              </div>
              <span className="text-sm text-[#5C5C5C] font-medium">·</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5 text-[#7B7B7B]" />
                <span className="text-sm text-[#A3A3A3]">{userData.location || 'Location not set'}</span>
              </div>
              <span className="text-sm text-[#5C5C5C] font-medium">·</span>
              <div className="flex items-center gap-1">
                <Mail className="w-5 h-5 text-[#7B7B7B]" />
                <span className="text-sm text-[#A3A3A3]">{userData.email}</span>
              </div>
              {userData.website && (
                <>
                  <span className="text-sm text-[#5C5C5C] font-medium">·</span>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-5 h-5 text-[#7B7B7B]" />
                    <span className="text-sm text-[#C9A96E]">{userData.website}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 bg-[#333333] rounded-lg shadow-[inset_0px_1px_0px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
            <Link
              href="/profile/edit"
              className="px-4 py-2 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              href="/profile/create-article"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCreateArticlePage
                  ? 'bg-[#C9A96E]/50 text-[#332217] cursor-default'
                  : 'bg-[#C9A96E] text-[#332217] shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] hover:bg-[#B89A5E]'
              }`}
            >
              Create Article
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[156px] pb-8">
        <div className="flex gap-6">
          <StatCard icon={<FileText className="w-6 h-6 text-[#E8DDC0]" />} value={userData.articlesCount.toString()} label="Articles Published" />
          <StatCard icon={<Heart className="w-6 h-6 text-[#E8DDC0]" />} value={userData.contributionsCount?.toString() || '0'} label="Contributions" />
          <StatCard icon={<Eye className="w-6 h-6 text-[#E8DDC0]" />} value={userData.totalReads?.toLocaleString() || '0'} label="Total Reads" />
          <StatCard icon={<Calendar className="w-6 h-6 text-[#E8DDC0]" />} value={daysActive.toString()} label="Days Active" />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[156px] pb-16">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-[264px] shrink-0">
            <div className="border border-[#333333] rounded-lg overflow-hidden">
              {/* Main Dashboard */}
              <div className="p-6 border-b border-[#333333]">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-transparent hover:bg-[#262626] transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-[#A3A3A3]" />
                  <span className="text-sm font-medium text-[#A3A3A3]">Main Dashboard</span>
                </button>
              </div>

              {/* Articles Section */}
              <div className="p-4 border-b border-[#333333]">
                <button
                  onClick={() => setArticlesExpanded(!articlesExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#262626] border border-[#5C5C5C] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium text-white">Articles</span>
                  </div>
                  {articlesExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </button>

                {articlesExpanded && (
                  <div className="mt-4 space-y-2">
                    <Link
                      href="/profile"
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
                        pathname === '/profile'
                          ? 'border-2 border-[#C9A96E]'
                          : 'border-transparent hover:bg-[#262626]'
                      }`}
                    >
                      <FileText className={`w-5 h-5 ${pathname === '/profile' ? 'text-[#C9A96E]' : 'text-[#A3A3A3]'}`} />
                      <span className={`text-sm font-medium ${pathname === '/profile' ? 'text-[#C9A96E]' : 'text-[#A3A3A3]'}`}>All Articles</span>
                    </Link>
                    <Link
                      href="/profile/create-article"
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors ${
                        isCreateArticlePage
                          ? 'border-2 border-[#C9A96E]'
                          : 'border-transparent hover:bg-[#262626]'
                      }`}
                    >
                      <Plus className={`w-5 h-5 ${isCreateArticlePage ? 'text-[#C9A96E]' : 'text-[#A3A3A3]'}`} />
                      <span className={`text-sm font-medium ${isCreateArticlePage ? 'text-[#C9A96E]' : 'text-[#A3A3A3]'}`}>Create Articles</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Contributions */}
              <div className="p-4 border-b border-[#333333]">
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#262626] border border-[#333333] hover:border-[#5C5C5C] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-[#A3A3A3]" />
                    <span className="text-sm font-medium text-[#A3A3A3]">Contributions</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#A3A3A3]" />
                </button>
              </div>

              {/* Settings */}
              <div className="p-4 border-b border-[#333333]">
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#262626] border border-[#333333] hover:border-[#5C5C5C] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#A3A3A3]" />
                    <span className="text-sm font-medium text-[#A3A3A3]">Settings</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#A3A3A3]" />
                </button>
              </div>

              {/* User Footer */}
              <div className="p-6 flex items-center gap-4">
                <div className="w-[34px] h-[34px] rounded-full bg-[#DBC99E] flex items-center justify-center">
                  <span className="text-base font-medium text-[#332217]">{initials}</span>
                </div>
                <span className="flex-1 text-base font-medium text-white truncate">{fullName}</span>
                <LogOut className="w-6 h-6 text-[#A3A3A3] cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Main Content Area - Rendered by child pages */}
          {children}
        </div>
      </div>
    </div>
  )
}

/** Stat Card Component */
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex-1 border border-[#333333] rounded-lg p-6 flex flex-col items-center gap-2">
      {icon}
      <div className="flex flex-col items-center gap-1">
        <span className="text-base font-medium text-white">{value}</span>
        <span className="text-xs font-medium text-[#7B7B7B]">{label}</span>
      </div>
    </div>
  )
}
