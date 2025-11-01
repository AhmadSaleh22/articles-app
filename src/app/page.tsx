'use client'

import { useState, useEffect } from 'react'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { ArticleViewer } from '@/components/editor/ArticleViewer'
import { Plus, Edit2, Trash2, Eye, FileText, ArrowLeft, Folder, FolderOpen, ChevronDown, ChevronRight, FolderPlus, BookOpen, Send, Save, X, Newspaper } from 'lucide-react'

interface Topic {
  id: string
  name: string
  icon?: string
  color?: string
  articles: Article[]
}

interface Article {
  id: string
  title: string
  content: string
  coverImage?: string
  status: string
  topicId?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export default function Dashboard() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [uncategorizedArticles, setUncategorizedArticles] = useState<Article[]>([])
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [showNewTopicModal, setShowNewTopicModal] = useState(false)
  const [newTopicName, setNewTopicName] = useState('')

  useEffect(() => {
    fetchTopicsAndArticles()
  }, [])

  const fetchTopicsAndArticles = async () => {
    try {
      // Fetch topics with their articles
      const topicsResponse = await fetch('/api/topics')
      if (topicsResponse.ok) {
        const topicsData = await topicsResponse.json()
        setTopics(Array.isArray(topicsData) ? topicsData : [])
      } else {
        setTopics([])
      }

      // Fetch uncategorized articles
      const articlesResponse = await fetch('/api/articles')
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json()
        const uncategorized = Array.isArray(articlesData)
          ? articlesData.filter((a: Article) => !a.topicId)
          : []
        setUncategorizedArticles(uncategorized)
      } else {
        setUncategorizedArticles([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setTopics([])
      setUncategorizedArticles([])
    }
  }

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics)
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId)
    } else {
      newExpanded.add(topicId)
    }
    setExpandedTopics(newExpanded)
  }

  const handleCreateNewTopic = async () => {
    if (!newTopicName.trim()) return

    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTopicName }),
      })
      if (response.ok) {
        await fetchTopicsAndArticles()
        setNewTopicName('')
        setShowNewTopicModal(false)
      }
    } catch (error) {
      console.error('Error creating topic:', error)
    }
  }

  const handleDeleteTopic = async (topicId: string) => {
    if (!confirm('Are you sure you want to delete this topic? Articles will become uncategorized.')) return

    try {
      const response = await fetch(`/api/topics/${topicId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchTopicsAndArticles()
      }
    } catch (error) {
      console.error('Error deleting topic:', error)
    }
  }

  const handleCreateNew = () => {
    setSelectedArticle(null)
    setIsCreating(true)
    setIsViewing(false)
    setTitle('')
    setContent('')
    setSelectedTopicId(null)
  }

  const handleView = (article: Article) => {
    setSelectedArticle(article)
    setIsCreating(false)
    setIsViewing(true)
    setTitle(article.title)
    setContent(article.content)
    setSelectedTopicId(article.topicId || null)
  }

  const handleEdit = (article: Article) => {
    setSelectedArticle(article)
    setIsCreating(false)
    setIsViewing(false)
    setTitle(article.title)
    setContent(article.content)
    setSelectedTopicId(article.topicId || null)
  }

  const handleSave = async () => {
    try {
      if (selectedArticle) {
        // Update existing article
        const response = await fetch(`/api/articles/${selectedArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, topicId: selectedTopicId }),
        })
        if (response.ok) {
          await fetchTopicsAndArticles()
          alert('Article updated successfully!')
        }
      } else {
        // Create new article
        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, status: 'draft', topicId: selectedTopicId }),
        })
        if (response.ok) {
          await fetchTopicsAndArticles()
          setIsCreating(false)
          setTitle('')
          setContent('')
          setSelectedTopicId(null)
          alert('Article created successfully!')
        }
      }
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Failed to save article')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchTopicsAndArticles()
        if (selectedArticle?.id === id) {
          setSelectedArticle(null)
          setIsCreating(false)
        }
        alert('Article deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Failed to delete article')
    }
  }

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      })
      if (response.ok) {
        await fetchTopicsAndArticles()
        alert('Article published successfully!')
      }
    } catch (error) {
      console.error('Error publishing article:', error)
      alert('Failed to publish article')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar - Hierarchical Article List */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-600" size={28} />
              Articles Dashboard
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleCreateNew}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={20} />
                New Article
              </button>
              <button
                onClick={() => setShowNewTopicModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
                title="New Folder"
              >
                <FolderPlus size={20} />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-2">
            {/* Topics with Articles */}
            {topics.map((topic) => (
              <div key={topic.id} className="space-y-1">
                {/* Topic Header */}
                <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer group">
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {expandedTopics.has(topic.id) ? (
                      <ChevronDown size={16} className="text-gray-600" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-600" />
                    )}
                  </button>
                  {expandedTopics.has(topic.id) ? (
                    <FolderOpen size={20} className="text-amber-500" />
                  ) : (
                    <Folder size={20} className="text-amber-500" />
                  )}
                  <span className="font-semibold flex-1">{topic.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">{topic.articles.length}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTopic(topic.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all"
                    title="Delete Topic"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Articles in Topic */}
                {expandedTopics.has(topic.id) && (
                  <div className="ml-6 space-y-1">
                    {topic.articles.map((article) => (
                      <div
                        key={article.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedArticle?.id === article.id
                            ? 'bg-blue-50 border-blue-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleView(article)}
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {article.title || 'Untitled'}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              article.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {article.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(article.updatedAt).toLocaleDateString()}
                        </p>
                        <div className="flex gap-1 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(article)
                            }}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded transition-all"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(article.id)
                            }}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                          {article.status === 'draft' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handlePublish(article.id)
                              }}
                              className="text-green-500 hover:text-green-700 hover:bg-green-50 p-1.5 rounded transition-all"
                              title="Publish"
                            >
                              <Send size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Uncategorized Articles */}
            {uncategorizedArticles.length > 0 && (
              <div className="space-y-1 pt-4 border-t">
                <div className="p-2 text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Newspaper size={18} className="text-gray-500" />
                  Uncategorized
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium ml-auto">{uncategorizedArticles.length}</span>
                </div>
                {uncategorizedArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedArticle?.id === article.id
                        ? 'bg-blue-50 border-blue-300'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleView(article)}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm line-clamp-1">
                        {article.title || 'Untitled'}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          article.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(article.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-1 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(article)
                        }}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded transition-all"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(article.id)
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                      {article.status === 'draft' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePublish(article.id)
                          }}
                          className="text-green-500 hover:text-green-700 hover:bg-green-50 p-1.5 rounded transition-all"
                          title="Publish"
                        >
                          <Send size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Editor/Viewer */}
        <div className="flex-1 overflow-y-auto">
          {(selectedArticle || isCreating) ? (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                {isViewing ? (
                  // View Mode
                  <>
                    <div className="mb-6 flex items-center gap-4">
                      <button
                        onClick={() => {
                          setSelectedArticle(null)
                          setIsViewing(false)
                        }}
                        className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                      >
                        <ArrowLeft size={20} />
                        Back
                      </button>
                      <button
                        onClick={() => handleEdit(selectedArticle!)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
                      >
                        <Edit2 size={16} />
                        Edit Article
                      </button>
                    </div>
                    <h1 className="text-4xl font-bold mb-6">{title}</h1>
                    <ArticleViewer content={content} />
                  </>
                ) : (
                  // Edit/Create Mode
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Topic / Folder
                      </label>
                      <select
                        value={selectedTopicId || ''}
                        onChange={(e) => setSelectedTopicId(e.target.value || null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Uncategorized</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.icon} {topic.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Article Title"
                      className="w-full text-4xl font-bold mb-6 border-none focus:outline-none bg-transparent"
                    />

                    <RichTextEditor
                      content={content}
                      onChange={setContent}
                      placeholder="Start writing your article..."
                    />

                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save {selectedArticle ? 'Changes' : 'Article'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedArticle(null)
                          setIsCreating(false)
                        }}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <BookOpen size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-xl">Select an article or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Topic Modal */}
      {showNewTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Topic</h2>
            <input
              type="text"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="Topic name (e.g., 'Technical Articles')"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateNewTopic()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateNewTopic}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <FolderPlus size={18} />
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewTopicModal(false)
                  setNewTopicName('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
