'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { BookOpen, PenTool, TrendingUp, Calendar as CalendarIcon } from 'lucide-react'
import { Navbar } from '@/components/homepage/Navbar'
import { UserProfileHeader } from './UserProfileHeader'
import { StatCard } from './StatCard'
import { SegmentedControl } from './SegmentedControl'
import { ContentCard } from '@/components/homepage/ContentCard'
import { ActivityItem } from './ActivityItem'
import { ActivityFilters } from './ActivityFilters'
import { BiographyCard } from './BiographyCard'
import { SkillsCard } from './SkillsCard'
import { SupportCard } from './SupportCard'

type Tab = 'articles' | 'activity' | 'about'

interface UserData {
  firstName: string
  lastName: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  articlesCount: number
  articles: any[]
  activities: Array<{
    id: string
    type: string
    title: string
    date: string
  }>
}

export function UserProfilePage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<Tab>('articles')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserData()
    }
  }, [status, session])

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
        <div className="text-white">Loading...</div>
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

  // About tab data
  const biography = userData.bio || 'No biography available yet.'
  const skills: string[] = []
  const supporters: any[] = []

  return (
    <div className="min-h-screen bg-[#171717] relative">
      {/* Background gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-[213px] bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none z-0" />

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-0">
        {/* User Profile Header */}
        <div className="w-full max-w-[1440px] mx-auto px-40">
          <UserProfileHeader
            name={fullName}
            initials={initials}
            joinedDate={`Joined ${joinedDate}`}
            location="Location not set"
            email={userData.email}
            website=""
          />
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-[1440px] mx-auto px-40 pt-8 pb-12">
          <div className="flex gap-6">
            <StatCard
              icon={BookOpen}
              value={userData.articlesCount.toString()}
              label="Articles Published"
            />
            <StatCard
              icon={PenTool}
              value="0"
              label="Contributions"
            />
            <StatCard
              icon={TrendingUp}
              value="0"
              label="Total Reads"
            />
            <StatCard
              icon={CalendarIcon}
              value={Math.floor((Date.now() - new Date(userData.createdAt).getTime()) / (1000 * 60 * 60 * 24)).toString()}
              label="Days Active"
            />
          </div>
        </div>

        {/* Segmented Control */}
        <div className="w-full max-w-[1440px] mx-auto px-40 pb-12">
          <SegmentedControl activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <>
            {/* Section Header */}
            <div className="w-full max-w-[1440px] mx-auto px-40 pb-6">
              <p className="text-base font-medium text-white">
                Published articles <span className="text-neutral-500">({userData.articlesCount})</span>
              </p>
            </div>

            {/* Content Grid */}
            <div className="w-full max-w-[1440px] mx-auto px-40 pb-16">
              {userData.articles.length > 0 ? (
                <div className="grid grid-cols-4 gap-x-6 gap-y-6">
                  {userData.articles.map((article) => (
                    <ContentCard
                      key={article.id}
                      title={article.title || 'Untitled'}
                      imageUrl={article.heroImage || '/api/placeholder/276/290'}
                      author={fullName}
                      date={new Date(article.createdAt).toLocaleDateString()}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No articles published yet</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <>
            {/* Section Header with Filters */}
            <div className="w-full max-w-[1440px] mx-auto px-40 pb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-medium text-white">Recent activity</h2>
                <ActivityFilters />
              </div>
            </div>

            {/* Activity List */}
            <div className="w-full max-w-[1440px] mx-auto px-40 pb-16">
              {userData.activities.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {userData.activities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      type={activity.type}
                      title={activity.title}
                      date={activity.date}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No activity yet</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="w-full max-w-[1440px] mx-auto px-40 pb-16">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                <BiographyCard biography={biography} />
                <SkillsCard skills={skills} />
              </div>

              {/* Right Column */}
              <div>
                <SupportCard
                  totalTips={247}
                  totalSupporters={32}
                  currentMonthlyAmount={247}
                  monthlyGoal={500}
                  recentSupporters={supporters}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
