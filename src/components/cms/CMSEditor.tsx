'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  GripVertical,
  Image as ImageIcon,
  Type,
  Video,
  Music,
  Quote,
  List,
  Trash2,
  Upload
} from 'lucide-react'
import { useAlert } from '@/hooks/useAlert'

interface ContentBlock {
  id: string
  type: 'text' | 'image' | 'video' | 'audio' | 'quote' | 'list' | 'gallery'
  content: any
  order: number
}

interface ThreadPost {
  id: string
  blocks: ContentBlock[]
  order: number
}

interface CMSEditorProps {
  type: string
  id: string
}

const blockTypes = [
  { id: 'text', name: 'Text', icon: Type, description: 'Add a paragraph of text' },
  { id: 'image', name: 'Image', icon: ImageIcon, description: 'Add an image' },
  { id: 'video', name: 'Video', icon: Video, description: 'Embed a video' },
  { id: 'audio', name: 'Audio', icon: Music, description: 'Embed audio' },
  { id: 'quote', name: 'Quote', icon: Quote, description: 'Add a quote' },
  { id: 'list', name: 'List', icon: List, description: 'Add a list' },
  { id: 'gallery', name: 'Gallery', icon: ImageIcon, description: 'Add multiple images' },
]

export function CMSEditor({ type, id }: CMSEditorProps) {
  const router = useRouter()
  const alert = useAlert()
  const { data: session } = useSession()
  const [title, setTitle] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [heroGallery, setHeroGallery] = useState<Array<{ url: string; caption?: string }>>([])
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [threadPosts, setThreadPosts] = useState<ThreadPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showBlockSelector, setShowBlockSelector] = useState(false)
  const [showBlockSelectorForPost, setShowBlockSelectorForPost] = useState<string | null>(null)
  const [uploadingBlocks, setUploadingBlocks] = useState<Record<string, boolean>>({})
  const [uploadingHero, setUploadingHero] = useState(false)
  const [contentStatus, setContentStatus] = useState<'draft' | 'published'>('draft')
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    if (id !== 'new') {
      fetchContent()
    } else {
      setLoading(false)
    }
  }, [id])

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/cms/contents/${id}`)
      if (response.ok) {
        const data = await response.json()
        setTitle(data.title || '')

        // Parse heroImage - for gallery type it's JSON array, otherwise it's a string
        if (data.type === 'gallery' && data.heroImage) {
          try {
            const parsed = JSON.parse(data.heroImage)
            setHeroGallery(Array.isArray(parsed) ? parsed : [])
          } catch {
            setHeroImage(data.heroImage || '')
          }
        } else {
          setHeroImage(data.heroImage || '')
        }

        // For threads, parse blocks as threadPosts
        if (data.type === 'thread') {
          setThreadPosts(data.blocks || [])
        } else {
          setBlocks(data.blocks || [])
        }

        setContentStatus(data.status || 'draft')
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (saveStatus: 'draft' | 'published' = 'draft') => {
    setSaving(true)
    try {
      // For gallery type, save heroGallery as JSON string, otherwise save heroImage
      const heroImageValue = type === 'gallery' ? JSON.stringify(heroGallery) : heroImage

      // For thread type, save threadPosts instead of blocks
      const blocksValue = type === 'thread' ? threadPosts : blocks

      const response = await fetch(`/api/cms/contents/${id}`, {
        method: id === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          heroImage: heroImageValue,
          blocks: blocksValue,
          status: saveStatus,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setContentStatus(saveStatus)
        alert.success(saveStatus === 'published' ? 'Content published successfully!' : 'Content saved successfully!')
        if (id === 'new') {
          router.push(`/cms/editor/${type}/${data.id}`)
        }
      } else {
        alert.error('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert.error('Error saving content')
    } finally {
      setSaving(false)
      setPublishing(false)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    await handleSave('published')
  }

  const addBlock = (blockType: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: blockType as any,
      content: getDefaultContent(blockType),
      order: blocks.length,
    }
    setBlocks([...blocks, newBlock])
    setShowBlockSelector(false)
  }

  const getDefaultContent = (blockType: string) => {
    switch (blockType) {
      case 'text':
        return { text: '' }
      case 'image':
        return { url: '', caption: '', alt: '' }
      case 'video':
        return { url: '', caption: '' }
      case 'audio':
        return { url: '', caption: '' }
      case 'quote':
        return { text: '', author: '' }
      case 'list':
        return { items: [''] }
      case 'gallery':
        return { images: [] }
      default:
        return {}
    }
  }

  const updateBlock = (blockId: string, content: any) => {
    setBlocks(blocks.map(block =>
      block.id === blockId ? { ...block, content } : block
    ))
  }

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId))
  }

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === blockId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) {
      return
    }

    const newBlocks = [...blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]

    setBlocks(newBlocks.map((block, idx) => ({ ...block, order: idx })))
  }

  // Thread post management functions
  const addThreadPost = () => {
    const newPost: ThreadPost = {
      id: `post-${Date.now()}`,
      blocks: [],
      order: threadPosts.length,
    }
    setThreadPosts([...threadPosts, newPost])
  }

  const deleteThreadPost = (postId: string) => {
    setThreadPosts(threadPosts.filter(post => post.id !== postId))
  }

  const addBlockToPost = (postId: string, blockType: string) => {
    const post = threadPosts.find(p => p.id === postId)
    if (!post) return

    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: blockType as any,
      content: getDefaultContent(blockType),
      order: post.blocks.length,
    }

    setThreadPosts(threadPosts.map(p =>
      p.id === postId ? { ...p, blocks: [...p.blocks, newBlock] } : p
    ))
    setShowBlockSelectorForPost(null)
  }

  const updateBlockInPost = (postId: string, blockId: string, content: any) => {
    setThreadPosts(threadPosts.map(post =>
      post.id === postId
        ? {
            ...post,
            blocks: post.blocks.map(block =>
              block.id === blockId ? { ...block, content } : block
            ),
          }
        : post
    ))
  }

  const deleteBlockFromPost = (postId: string, blockId: string) => {
    setThreadPosts(threadPosts.map(post =>
      post.id === postId
        ? { ...post, blocks: post.blocks.filter(block => block.id !== blockId) }
        : post
    ))
  }

  const moveBlockInPost = (postId: string, blockId: string, direction: 'up' | 'down') => {
    const post = threadPosts.find(p => p.id === postId)
    if (!post) return

    const index = post.blocks.findIndex(b => b.id === blockId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === post.blocks.length - 1)
    ) {
      return
    }

    const newBlocks = [...post.blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]

    setThreadPosts(threadPosts.map(p =>
      p.id === postId
        ? { ...p, blocks: newBlocks.map((block, idx) => ({ ...block, order: idx })) }
        : p
    ))
  }

  const movePost = (postId: string, direction: 'up' | 'down') => {
    const index = threadPosts.findIndex(p => p.id === postId)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === threadPosts.length - 1)
    ) {
      return
    }

    const newPosts = [...threadPosts]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newPosts[index], newPosts[targetIndex]] = [newPosts[targetIndex], newPosts[index]]

    setThreadPosts(newPosts.map((post, idx) => ({ ...post, order: idx })))
  }

  const handleFileUpload = async (file: File, blockId: string) => {
    if (!file) return

    setUploadingBlocks(prev => ({ ...prev, [blockId]: true }))

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        alert.error(error.error || 'Failed to upload file')
        return
      }

      const data = await response.json()

      // Update block with uploaded file URL
      const block = blocks.find(b => b.id === blockId)
      if (block) {
        updateBlock(blockId, { ...block.content, url: data.url })
      }

      alert.success('File uploaded successfully!')
    } catch (error) {
      console.error('Error uploading file:', error)
      alert.error('Failed to upload file')
    } finally {
      setUploadingBlocks(prev => ({ ...prev, [blockId]: false }))
    }
  }

  const handleHeroImageUpload = async (file: File) => {
    if (!file) return

    setUploadingHero(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        alert.error(error.error || 'Failed to upload file')
        return
      }

      const data = await response.json()
      setHeroImage(data.url)
      const mediaTypeLabel = type === 'video' ? 'video' : type === 'audio' ? 'audio' : 'image'
      alert.success(`Hero ${mediaTypeLabel} uploaded successfully!`)
    } catch (error) {
      console.error('Error uploading hero media:', error)
      alert.error('Failed to upload hero media')
    } finally {
      setUploadingHero(false)
    }
  }

  const handleGalleryUpload = async (files: FileList, blockId: string) => {
    if (!files || files.length === 0) return

    setUploadingBlocks(prev => ({ ...prev, [blockId]: true }))

    try {
      const block = blocks.find(b => b.id === blockId)
      if (!block) return

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload')
        }

        const data = await response.json()
        return { url: data.url, caption: '', alt: '' }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      const currentImages = block.content.images || []
      updateBlock(blockId, { images: [...currentImages, ...uploadedImages] })

      alert.success(`${uploadedImages.length} image(s) uploaded successfully!`)
    } catch (error) {
      console.error('Error uploading gallery images:', error)
      alert.error('Failed to upload some images')
    } finally {
      setUploadingBlocks(prev => ({ ...prev, [blockId]: false }))
    }
  }

  const handleHeroGalleryUpload = async (files: FileList) => {
    if (!files || files.length === 0) return

    setUploadingHero(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload')
        }

        const data = await response.json()
        return { url: data.url, caption: '' }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      setHeroGallery([...heroGallery, ...uploadedImages])

      alert.success(`${uploadedImages.length} image(s) uploaded successfully!`)
    } catch (error) {
      console.error('Error uploading hero gallery images:', error)
      alert.error('Failed to upload some images')
    } finally {
      setUploadingHero(false)
    }
  }

  // Get accept type based on content type
  const getHeroAcceptType = () => {
    if (type === 'video') return 'video/*'
    if (type === 'audio') return 'audio/*'
    return 'image/*'
  }

  const getHeroLabel = () => {
    if (type === 'video') return 'hero video'
    if (type === 'audio') return 'hero audio'
    return 'hero image'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Editor Header */}
      <div className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/cms')}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-400" />
            </button>
            <div>
              <h1 className="text-white font-semibold">
                {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Content'} Editor
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-neutral-400">
                  {id === 'new' ? 'Creating new content' : 'Editing content'}
                </p>
                {id !== 'new' && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      contentStatus === 'published'
                        ? 'bg-green-900/30 text-green-400 border border-green-700'
                        : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700'
                    }`}
                  >
                    {contentStatus === 'published' ? 'Published' : 'Draft'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave('draft')}
              disabled={saving || publishing}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving && !publishing ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={handlePublish}
              disabled={saving || publishing}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A96E] text-neutral-900 rounded-lg hover:bg-[#B89960] transition-colors font-medium disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              {publishing ? 'Publishing...' : contentStatus === 'published' ? 'Update & Publish' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Editor */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          {type === 'gallery' ? (
            // Gallery hero - supports multiple images
            <div className="space-y-4">
              <label className="block px-4 py-6 bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-xl hover:border-neutral-600 transition-colors cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-4">
                  <ImageIcon className="w-12 h-12 text-neutral-600" />
                  <p className="text-neutral-400">Upload Gallery Images (Multiple)</p>
                  <div className="px-4 py-2 bg-[#C9A96E] text-neutral-900 rounded-lg font-medium flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {uploadingHero ? 'Uploading...' : 'Select Images'}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled={uploadingHero}
                  onChange={(e) => {
                    const files = e.target.files
                    if (files) handleHeroGalleryUpload(files)
                  }}
                />
              </label>

              {heroGallery.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {heroGallery.map((image, idx) => (
                    <div key={idx} className="relative group">
                      <img src={image.url} alt="" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        onClick={() => {
                          const newGallery = heroGallery.filter((_, i) => i !== idx)
                          setHeroGallery(newGallery)
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={image.caption || ''}
                        onChange={(e) => {
                          const newGallery = [...heroGallery]
                          newGallery[idx] = { ...newGallery[idx], caption: e.target.value }
                          setHeroGallery(newGallery)
                        }}
                        placeholder="Caption (optional)"
                        className="mt-2 w-full px-3 py-1.5 text-sm bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {heroGallery.length === 0 && (
                <p className="text-sm text-neutral-500 text-center py-4">No images yet. Upload at least one image.</p>
              )}
            </div>
          ) : (
            // Single media hero - for video, audio, article, thread
            <div
              className="relative bg-neutral-800 border-2 border-dashed border-neutral-700 rounded-xl overflow-hidden group cursor-pointer hover:border-neutral-600 transition-colors"
              style={{ aspectRatio: '16/9' }}
            >
              {heroImage ? (
                <>
                  {type === 'video' ? (
                    <video src={heroImage} className="w-full h-full object-cover" controls />
                  ) : type === 'audio' ? (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                      <audio src={heroImage} controls className="w-3/4" />
                    </div>
                  ) : (
                    <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <label className="px-4 py-2 bg-white text-black rounded-lg font-medium cursor-pointer">
                      {uploadingHero ? 'Uploading...' : `Change ${type === 'video' ? 'Video' : type === 'audio' ? 'Audio' : 'Image'}`}
                      <input
                        type="file"
                        accept={getHeroAcceptType()}
                        className="hidden"
                        disabled={uploadingHero}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleHeroImageUpload(file)
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setHeroImage('')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  {type === 'video' ? (
                    <Video className="w-12 h-12 text-neutral-600" />
                  ) : type === 'audio' ? (
                    <Music className="w-12 h-12 text-neutral-600" />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-neutral-600" />
                  )}
                  <p className="text-neutral-400">Add {getHeroLabel()}</p>
                  <div className="flex flex-col gap-2 w-80">
                    <input
                      type="text"
                      placeholder={`Enter ${type === 'video' ? 'video' : type === 'audio' ? 'audio' : 'image'} URL`}
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex items-center gap-3">
                      <div className="flex-1 border-t border-neutral-600"></div>
                      <span className="text-neutral-500 text-sm">or</span>
                      <div className="flex-1 border-t border-neutral-600"></div>
                    </div>
                    <label className="w-full px-4 py-2 bg-[#C9A96E] text-neutral-900 rounded-lg hover:bg-[#B89960] transition-colors font-medium cursor-pointer flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      {uploadingHero ? 'Uploading...' : `Upload ${type === 'video' ? 'Video' : type === 'audio' ? 'Audio' : 'Image'}`}
                      <input
                        type="file"
                        accept={getHeroAcceptType()}
                        className="hidden"
                        disabled={uploadingHero}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleHeroImageUpload(file)
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here..."
            className="w-full text-4xl font-bold bg-transparent border-none text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        {/* Content Blocks or Thread Posts */}
        {type === 'thread' ? (
          // Thread Posts View
          <div className="space-y-8">
            {threadPosts.map((post, postIndex) => (
              <div
                key={post.id}
                className="relative bg-neutral-800/50 border-2 border-neutral-700 rounded-2xl p-6"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#C9A96E] rounded-full flex items-center justify-center text-neutral-900 font-bold text-sm">
                      {postIndex + 1}
                    </div>
                    <span className="text-neutral-400 text-sm">Post in thread</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => movePost(post.id, 'up')}
                      disabled={postIndex === 0}
                      className="p-1.5 hover:bg-neutral-700 rounded disabled:opacity-30 text-neutral-400"
                    >
                      <GripVertical className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteThreadPost(post.id)}
                      className="p-1.5 hover:bg-red-900/20 rounded text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Post Blocks */}
                <div className="space-y-4">
                  {post.blocks.map((block, blockIndex) => {
                    const blockKey = `${post.id}-${block.id}`
                    return (
                      <div
                        key={blockKey}
                        className="group relative bg-neutral-800 border border-neutral-600 rounded-lg p-4 hover:border-neutral-500 transition-colors"
                      >
                        {/* Block Controls */}
                        <div className="absolute -left-10 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                          <button
                            onClick={() => moveBlockInPost(post.id, block.id, 'up')}
                            disabled={blockIndex === 0}
                            className="p-1 hover:bg-neutral-700 rounded disabled:opacity-30"
                          >
                            <GripVertical className="w-3 h-3 text-neutral-400" />
                          </button>
                          <button
                            onClick={() => deleteBlockFromPost(post.id, block.id)}
                            className="p-1 hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>

                        {/* Block Content - Render based on type */}
                        {block.type === 'text' && (
                          <textarea
                            value={block.content.text || ''}
                            onChange={(e) => updateBlockInPost(post.id, block.id, { text: e.target.value })}
                            placeholder="Write your text here..."
                            className="w-full min-h-[80px] bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none resize-none"
                          />
                        )}

                        {block.type === 'image' && (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={block.content.url || ''}
                                onChange={(e) => updateBlockInPost(post.id, block.id, { ...block.content, url: e.target.value })}
                                placeholder="Image URL"
                                className="flex-1 px-3 py-2 text-sm bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                              />
                            </div>
                            {block.content.url && (
                              <img src={block.content.url} alt="" className="w-full rounded-lg max-h-64 object-cover" />
                            )}
                          </div>
                        )}

                        {block.type === 'video' && block.content.url && (
                          <video src={block.content.url} controls className="w-full rounded-lg" />
                        )}

                        {block.type === 'quote' && (
                          <div className="space-y-2">
                            <textarea
                              value={block.content.text || ''}
                              onChange={(e) => updateBlockInPost(post.id, block.id, { ...block.content, text: e.target.value })}
                              placeholder="Quote text..."
                              className="w-full min-h-[60px] bg-transparent border-l-4 border-[#C9A96E] pl-3 text-lg italic text-white placeholder-neutral-500 focus:outline-none resize-none"
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Add Block to Post */}
                  {showBlockSelectorForPost === post.id ? (
                    <div className="bg-neutral-700/50 border border-neutral-600 rounded-lg p-3">
                      <h4 className="text-white text-sm font-medium mb-3">Add Content</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {blockTypes.slice(0, 5).map((blockType) => {
                          const Icon = blockType.icon
                          return (
                            <button
                              key={blockType.id}
                              onClick={() => addBlockToPost(post.id, blockType.id)}
                              className="flex flex-col items-center gap-1 p-2 bg-neutral-600 hover:bg-neutral-500 rounded transition-colors"
                            >
                              <Icon className="w-4 h-4 text-[#C9A96E]" />
                              <span className="text-xs text-white">{blockType.name}</span>
                            </button>
                          )
                        })}
                      </div>
                      <button
                        onClick={() => setShowBlockSelectorForPost(null)}
                        className="mt-2 text-xs text-neutral-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowBlockSelectorForPost(post.id)}
                      className="w-full py-3 border border-dashed border-neutral-600 rounded-lg text-neutral-400 hover:border-neutral-500 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Content to Post
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add New Post Button */}
            <button
              onClick={addThreadPost}
              className="w-full py-6 border-2 border-dashed border-neutral-700 rounded-xl text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Post to Thread
            </button>
          </div>
        ) : (
          // Regular Blocks View (for article, video, audio, gallery)
          <div className="space-y-6">
            {blocks.map((block, index) => (
            <div
              key={block.id}
              className="group relative bg-neutral-800 border border-neutral-700 rounded-xl p-6 hover:border-neutral-600 transition-colors"
            >
              {/* Block Controls */}
              <div className="absolute -left-12 top-6 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <button
                  onClick={() => moveBlock(block.id, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-neutral-700 rounded disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4 text-neutral-400" />
                </button>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="p-1 hover:bg-red-900/20 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Block Content */}
              {block.type === 'text' && (
                <textarea
                  value={block.content.text || ''}
                  onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                  placeholder="Write your text here..."
                  className="w-full min-h-[120px] bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none resize-none"
                />
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={block.content.url || ''}
                      onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                      placeholder="Image URL or upload file below"
                      className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                    />
                    <label className="px-4 py-2 bg-[#C9A96E] text-neutral-900 rounded-lg hover:bg-[#B89960] transition-colors font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap">
                      <Upload className="w-4 h-4" />
                      {uploadingBlocks[block.id] ? 'Uploading...' : 'Upload'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingBlocks[block.id]}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, block.id)
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={block.content.caption || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, caption: e.target.value })}
                    placeholder="Caption (optional)"
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                  />
                  {block.content.url && (
                    <img src={block.content.url} alt="" className="w-full rounded-lg" />
                  )}
                </div>
              )}

              {block.type === 'quote' && (
                <div className="space-y-3">
                  <textarea
                    value={block.content.text || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                    placeholder="Quote text..."
                    className="w-full min-h-[80px] bg-transparent border-l-4 border-[#C9A96E] pl-4 text-xl italic text-white placeholder-neutral-500 focus:outline-none resize-none"
                  />
                  <input
                    type="text"
                    value={block.content.author || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, author: e.target.value })}
                    placeholder="Author (optional)"
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              )}

              {block.type === 'video' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={block.content.url || ''}
                      onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                      placeholder="Video URL or upload file below"
                      className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                    />
                    <label className="px-4 py-2 bg-[#C9A96E] text-neutral-900 rounded-lg hover:bg-[#B89960] transition-colors font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap">
                      <Upload className="w-4 h-4" />
                      {uploadingBlocks[block.id] ? 'Uploading...' : 'Upload'}
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        disabled={uploadingBlocks[block.id]}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, block.id)
                        }}
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={block.content.caption || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, caption: e.target.value })}
                    placeholder="Caption (optional)"
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                  />
                  {block.content.url && (
                    <video src={block.content.url} controls className="w-full rounded-lg" />
                  )}
                </div>
              )}

              {block.type === 'audio' && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={block.content.url || ''}
                      onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                      placeholder="Audio URL or upload file below"
                      className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                    />
                    <label className="px-4 py-2 bg-[#C9A96E] text-neutral-900 rounded-lg hover:bg-[#B89960] transition-colors font-medium cursor-pointer flex items-center gap-2 whitespace-nowrap">
                      <Upload className="w-4 h-4" />
                      {uploadingBlocks[block.id] ? 'Uploading...' : 'Upload'}
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        disabled={uploadingBlocks[block.id]}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, block.id)
                        }}
                      />
                    </label>
                  </div>
                  {block.content.url && (
                    <audio src={block.content.url} controls className="w-full" />
                  )}
                </div>
              )}

              {block.type === 'list' && (
                <div className="space-y-2">
                  {(block.content.items || ['']).map((item: string, idx: number) => (
                    <input
                      key={idx}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...block.content.items]
                        newItems[idx] = e.target.value
                        updateBlock(block.id, { items: newItems })
                      }}
                      placeholder={`List item ${idx + 1}`}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                    />
                  ))}
                  <button
                    onClick={() => updateBlock(block.id, { items: [...block.content.items, ''] })}
                    className="text-sm text-[#C9A96E] hover:underline"
                  >
                    + Add item
                  </button>
                </div>
              )}

              {block.type === 'gallery' && (
                <div className="space-y-4">
                  <label className="px-4 py-3 bg-[#C9A96E] text-neutral-900 rounded-lg hover:bg-[#B89960] transition-colors font-medium cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    {uploadingBlocks[block.id] ? 'Uploading...' : 'Upload Images (Multiple)'}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      disabled={uploadingBlocks[block.id]}
                      onChange={(e) => {
                        const files = e.target.files
                        if (files) handleGalleryUpload(files, block.id)
                      }}
                    />
                  </label>

                  {block.content.images && block.content.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {block.content.images.map((image: any, idx: number) => (
                        <div key={idx} className="relative group">
                          <img src={image.url} alt="" className="w-full h-40 object-cover rounded-lg" />
                          <button
                            onClick={() => {
                              const newImages = block.content.images.filter((_: any, i: number) => i !== idx)
                              updateBlock(block.id, { images: newImages })
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <input
                            type="text"
                            value={image.caption || ''}
                            onChange={(e) => {
                              const newImages = [...block.content.images]
                              newImages[idx] = { ...newImages[idx], caption: e.target.value }
                              updateBlock(block.id, { images: newImages })
                            }}
                            placeholder="Caption (optional)"
                            className="mt-2 w-full px-3 py-1.5 text-sm bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E]"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {(!block.content.images || block.content.images.length === 0) && (
                    <p className="text-sm text-neutral-500 text-center py-8">No images yet. Upload at least one image.</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add Block Button */}
          <div className="relative">
            {showBlockSelector ? (
              <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
                <h3 className="text-white font-medium mb-4">Add Content Block</h3>
                <div className="grid grid-cols-2 gap-3">
                  {blockTypes.map((blockType) => {
                    const Icon = blockType.icon
                    return (
                      <button
                        key={blockType.id}
                        onClick={() => addBlock(blockType.id)}
                        className="flex items-start gap-3 p-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors text-left"
                      >
                        <Icon className="w-5 h-5 text-[#C9A96E] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-white font-medium text-sm">{blockType.name}</div>
                          <div className="text-xs text-neutral-400">{blockType.description}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setShowBlockSelector(false)}
                  className="mt-3 text-sm text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowBlockSelector(true)}
                className="w-full py-4 border-2 border-dashed border-neutral-700 rounded-xl text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Content Block
              </button>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
