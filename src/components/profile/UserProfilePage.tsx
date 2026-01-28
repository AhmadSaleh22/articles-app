'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  FileText,
  Eye,
  Clock,
  MoreVertical,
  ArrowRight,
  Share2,
  Settings,
  Pencil
} from 'lucide-react'

type TabFilter = 'all' | 'drafts' | 'published' | 'scheduled'

interface Article {
  id: string
  title: string
  status: string
  updatedAt: string
  createdAt: string
  views?: number
  supporters?: number
}

interface UserData {
  firstName: string
  lastName: string
  email: string
  bio: string | null
  location?: string
  website?: string
  avatar: string | null
  createdAt: string
  articlesCount: number
  articles: Article[]
  contributionsCount?: number
  totalReads?: number
}

export function UserProfilePage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<TabFilter>('all')
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

  if (loading || status === 'loading' || !userData) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const filteredArticles = userData.articles.filter(article => {
    if (activeTab === 'all') return true
    if (activeTab === 'drafts') return article.status === 'DRAFT'
    if (activeTab === 'published') return article.status === 'PUBLISHED'
    if (activeTab === 'scheduled') return article.status === 'SCHEDULED'
    return true
  })

  const getStatusColor = (articleStatus: string) => {
    switch (articleStatus) {
      case 'PUBLISHED': return 'text-[#3EE089]'
      case 'DRAFT': return 'text-[#6895FF]'
      case 'SCHEDULED': return 'text-[#FFA468]'
      default: return 'text-[#A3A3A3]'
    }
  }

  const formatStatus = (articleStatus: string) => {
    return articleStatus.charAt(0) + articleStatus.slice(1).toLowerCase()
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Tab Filter */}
      <div className="border border-[#333333] rounded-xl overflow-hidden">
        <div className="p-1 bg-[#262626] shadow-[inset_0px_2px_4px_rgba(23,23,23,0.4)]">
          <div className="flex">
            {(['all', 'drafts', 'published', 'scheduled'] as TabFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#333333] text-[#F7F7F7] shadow-[0px_2px_4px_-1px_rgba(23,23,23,0.04),0px_4px_8px_-1px_rgba(23,23,23,0.08),inset_0px_1px_1px_rgba(255,255,255,0.08)]'
                    : 'text-[#7B7B7B] hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="border border-[#333333] rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center px-6 py-3 border-b border-[#333333]">
          <div className="w-[180px] text-sm font-medium text-[#C9A96E]">Title</div>
          <div className="w-[100px] text-sm font-medium text-[#C9A96E]">Status</div>
          <div className="w-[120px] text-sm font-medium text-[#C9A96E]">Last Updated</div>
          <div className="w-[80px] text-sm font-medium text-[#C9A96E]">Views</div>
          <div className="w-[100px] text-sm font-medium text-[#C9A96E]">Supporters</div>
          <div className="flex-1" />
        </div>

        {/* Table Rows */}
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article.id} className="flex items-center px-6 py-3 border-b border-[#333333] hover:bg-[#1A1A1A] transition-colors">
              <div className="w-[180px] text-sm font-medium text-[#DBC99E] truncate">
                {article.title || 'Untitled'}
              </div>
              <div className={`w-[100px] text-sm font-medium ${getStatusColor(article.status)}`}>
                {formatStatus(article.status)}
              </div>
              <div className="w-[120px] text-xs text-[#A3A3A3]">
                {new Date(article.updatedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="w-[80px] text-sm font-medium text-[#A3A3A3]">
                {article.views?.toLocaleString() || '0'}
              </div>
              <div className="w-[100px] text-sm font-medium text-[#A3A3A3]">
                {article.supporters || '0'}
              </div>
              <div className="flex-1 flex justify-end">
                <button className="p-1 hover:bg-[#333333] rounded transition-colors">
                  <MoreVertical className="w-5 h-5 text-[#A3A3A3]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-12 text-center text-[#7B7B7B]">
            No articles found
          </div>
        )}
      </div>

      {/* Draft Articles Cards */}
      {userData.articles.filter(a => a.status === 'DRAFT').length > 0 && (
        <div className="border border-[#333333] rounded-xl overflow-hidden">
          <div className="p-4 space-y-4">
            {userData.articles.filter(a => a.status === 'DRAFT').slice(0, 2).map((article) => (
              <ArticleCard
                key={article.id}
                type="draft"
                title={article.title || 'Untitled'}
                subtitle="Drafted Article"
                meta={`${Math.floor((Date.now() - new Date(article.updatedAt).getTime()) / (1000 * 60 * 60))} hours ago`}
                actionLabel="Continue Writing"
                actionHref={`/cms/editor/article/${article.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Articles Cards */}
      {userData.articles.filter(a => a.status === 'SCHEDULED').length > 0 && (
        <div className="border border-[#333333] rounded-xl overflow-hidden">
          <div className="p-4 space-y-4">
            {userData.articles.filter(a => a.status === 'SCHEDULED').slice(0, 3).map((article) => (
              <ArticleCard
                key={article.id}
                type="scheduled"
                title={article.title || 'Untitled'}
                subtitle="Scheduled Article"
                meta={new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                showEditButtons
              />
            ))}
          </div>
        </div>
      )}

      {/* Published Articles Cards */}
      {userData.articles.filter(a => a.status === 'PUBLISHED').length > 0 && (
        <div className="border border-[#333333] rounded-xl overflow-hidden">
          <div className="p-4 space-y-4">
            {userData.articles.filter(a => a.status === 'PUBLISHED').slice(0, 4).map((article) => (
              <ArticleCard
                key={article.id}
                type="published"
                title={article.title || 'Untitled'}
                subtitle="Published Article"
                meta={new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                views={article.views}
                showShareView
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** Article Card Component */
function ArticleCard({
  type,
  title,
  subtitle,
  meta,
  views,
  actionLabel,
  actionHref,
  showEditButtons,
  showShareView
}: {
  type: 'draft' | 'scheduled' | 'published'
  title: string
  subtitle: string
  meta: string
  views?: number
  actionLabel?: string
  actionHref?: string
  showEditButtons?: boolean
  showShareView?: boolean
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-3 border border-[#333333] rounded-lg">
      {/* Icon */}
      <div className="w-8 h-10 bg-[#262626] rounded-lg shadow-[inset_0px_1px_0px_1px_rgba(255,255,255,0.08)] flex items-center justify-center">
        <FileText className="w-4 h-4 text-[#A3A3A3]" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">{subtitle}</span>
          <span className="text-sm font-medium text-[#C9A96E]">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#A3A3A3]" />
          <span className="text-xs text-[#A3A3A3]">{meta}</span>
          {views !== undefined && (
            <>
              <Eye className="w-4 h-4 text-[#A3A3A3] ml-2" />
              <span className="text-xs text-[#A3A3A3]">{views.toLocaleString()} views</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="flex items-center gap-2 px-4 py-2 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors"
        >
          {actionLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}

      {showEditButtons && (
        <div className="flex items-center gap-2">
          <button className="p-2 bg-[#333333] rounded-lg shadow-[inset_0px_1px_0px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors">
            <Pencil className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-[#333333] rounded-lg shadow-[inset_0px_1px_0px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {showShareView && (
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors">
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors">
            <Eye className="w-5 h-5" />
            View
          </button>
        </div>
      )}
    </div>
  )
}
