'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Video,
  Music,
  Images,
  MessageSquare,
  Megaphone,
  Plane,
  FolderOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Inbox,
  Clock,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  type: string
  status: string
  createdAt: string
  updatedAt: string
}

interface Submission {
  id: string
  title: string
  description: string
  type: string
  status: string
  createdAt: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  openCall?: {
    id: string
    title: string
    slug: string
  }
}

const contentTypes = [
  {
    id: 'article',
    name: 'Article',
    icon: FileText,
    color: 'bg-blue-600',
    description: 'Create a standard article with text and images',
    category: 'media'
  },
  {
    id: 'video',
    name: 'Video Article',
    icon: Video,
    color: 'bg-purple-600',
    description: 'Create an article with embedded video',
    category: 'media'
  },
  {
    id: 'audio',
    name: 'Audio Article',
    icon: Music,
    color: 'bg-green-600',
    description: 'Create an article with embedded audio',
    category: 'media'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    icon: Images,
    color: 'bg-orange-600',
    description: 'Create a photo gallery article',
    category: 'media'
  },
  {
    id: 'thread',
    name: 'Thread',
    icon: MessageSquare,
    color: 'bg-pink-600',
    description: 'Create a discussion thread',
    category: 'media'
  },
  {
    id: 'collection',
    name: 'Collection',
    icon: FolderOpen,
    color: 'bg-indigo-600',
    description: 'Create a collection to group related articles',
    category: 'media'
  },
  {
    id: 'open_call',
    name: 'Open Call',
    icon: Megaphone,
    color: 'bg-yellow-600',
    description: 'Create an open call for contributions',
    category: 'business'
  },
  {
    id: 'trip',
    name: 'Trip',
    icon: Plane,
    color: 'bg-cyan-600',
    description: 'Create a new trip opportunity',
    category: 'business'
  },
]

export function CMSDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contents, setContents] = useState<ContentItem[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchContents()
      fetchSubmissions()
    }
  }, [status])

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/cms/contents')
      if (response.ok) {
        const data = await response.json()
        setContents(data.contents || [])
      }
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions || [])
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const handleCreateNew = (type: string) => {
    router.push(`/cms/editor/${type}/new`)
  }

  const handleEdit = (id: string, type: string) => {
    router.push(`/cms/editor/${type}/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const response = await fetch(`/api/cms/contents/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchContents()
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const handleUpdateSubmissionStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
          <p className="text-neutral-400">Create and manage your articles, videos, galleries, and threads</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Create New Content Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Create New Content</h2>

          {/* Media Content */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-neutral-300 mb-4">Media Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {contentTypes.filter(t => t.category === 'media').map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => handleCreateNew(type.id)}
                    className="group relative bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-neutral-600 rounded-xl p-6 transition-all text-left"
                  >
                    <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-sm text-neutral-400">{type.description}</p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Business Content */}
          <div>
            <h3 className="text-lg font-medium text-neutral-300 mb-4">Business Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {contentTypes.filter(t => t.category === 'business').map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => handleCreateNew(type.id)}
                    className="group relative bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-neutral-600 rounded-xl p-6 transition-all text-left"
                  >
                    <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-sm text-neutral-400">{type.description}</p>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent Content Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Your Content</h2>
          {contents.length > 0 ? (
            <div className="space-y-3">
              {contents.map((content) => (
                <div
                  key={content.id}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 flex items-center justify-between hover:border-neutral-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      contentTypes.find(t => t.id === content.type)?.color || 'bg-gray-600'
                    }`}>
                      {(() => {
                        const Icon = contentTypes.find(t => t.id === content.type)?.icon || FileText
                        return <Icon className="w-5 h-5 text-white" />
                      })()}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{content.title || 'Untitled'}</h3>
                      <p className="text-sm text-neutral-400">
                        {content.type.charAt(0).toUpperCase() + content.type.slice(1)} • {content.status} • Updated {new Date(content.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(content.id, content.type)}
                      className="p-2 hover:bg-neutral-700 rounded-lg transition-colors group"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="p-2 hover:bg-red-900/20 rounded-lg transition-colors group"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-12 text-center">
              <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No content yet</h3>
              <p className="text-neutral-400">Create your first piece of content to get started</p>
            </div>
          )}
        </section>

        {/* Submissions Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Join Requests & Submissions</h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-yellow-900/20 text-yellow-400 text-sm font-medium rounded-full">
                {submissions.filter(s => s.status === 'pending').length} Pending
              </span>
            </div>
          </div>

          {submissions.length > 0 ? (
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-5 hover:border-neutral-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-medium">{submission.title}</h3>
                        {submission.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-yellow-900/20 text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                        {submission.status === 'approved' && (
                          <span className="px-2 py-0.5 bg-green-900/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </span>
                        )}
                        {submission.status === 'rejected' && (
                          <span className="px-2 py-0.5 bg-red-900/20 text-red-400 text-xs font-medium rounded-full flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Rejected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-300 mb-2">{submission.description}</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {submission.user.firstName} {submission.user.lastName}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{submission.type}</span>
                        {submission.openCall && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Megaphone className="w-3 h-3" />
                              {submission.openCall.title}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex gap-2 pt-3 border-t border-neutral-700">
                      <button
                        onClick={() => handleUpdateSubmissionStatus(submission.id, 'approved')}
                        className="flex-1 px-4 py-2 bg-green-900/20 hover:bg-green-900/30 text-green-400 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateSubmissionStatus(submission.id, 'rejected')}
                        className="flex-1 px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-12 text-center">
              <Inbox className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No submissions yet</h3>
              <p className="text-neutral-400">Submissions from open calls will appear here</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
