'use client'

import { useState, useRef, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Type,
  Heading,
  Image as ImageIcon,
  Video,
  Music,
  Quote,
  Minus,
  Code,
  X,
  Send,
  Save,
  Clock,
  FileText,
  FolderOpen,
  Tag,
  Globe,
  EyeOff,
  Upload,
  Trash2,
  Loader2
} from 'lucide-react'

type BlockType = 'text' | 'heading' | 'image' | 'video' | 'audio' | 'quote' | 'divider' | 'embed'

interface BlockContent {
  text?: string
  url?: string
  caption?: string
  alt?: string
  author?: string
  embedCode?: string
  filename?: string
}

interface ContentBlock {
  id: string
  type: BlockType
  content: BlockContent
  isUploading?: boolean
}

export function CreateArticlePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [dragActiveBlockId, setDragActiveBlockId] = useState<string | null>(null)

  // Article state
  const [title, setTitle] = useState('')
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: 'block-1', type: 'text', content: { text: '' } }
  ])
  const [showBlockPicker, setShowBlockPicker] = useState(false)

  // Settings state
  const [articleStatus, setArticleStatus] = useState('draft')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [language, setLanguage] = useState('English')
  const [visibility, setVisibility] = useState('Private')
  const [seoTitle, setSeoTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [newTagInput, setNewTagInput] = useState('')

  const addBlock = (type: BlockType) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type)
    }
    setBlocks([...blocks, newBlock])
    setShowBlockPicker(false)
  }

  const getDefaultContent = (type: BlockType): BlockContent => {
    switch (type) {
      case 'text': return { text: '' }
      case 'heading': return { text: '' }
      case 'image': return { url: '', caption: '' }
      case 'video': return { url: '', caption: '' }
      case 'audio': return { url: '', caption: '' }
      case 'quote': return { text: '', author: '' }
      case 'embed': return { url: '', embedCode: '' }
      default: return {}
    }
  }

  const updateBlock = (id: string, content: BlockContent) => {
    setBlocks(prevBlocks => prevBlocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  const setBlockUploading = (id: string, isUploading: boolean) => {
    setBlocks(prevBlocks => prevBlocks.map(block => 
      block.id === id ? { ...block, isUploading } : block
    ))
  }

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(block => block.id !== id))
    }
  }

  const handleFileUpload = async (file: File, blockId: string) => {
    if (!file) return
    setBlockUploading(blockId, true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error || 'Failed to upload file')
        return
      }

      const data = await response.json()
      // Use functional update to get the latest blocks state
      setBlocks(prevBlocks => prevBlocks.map(block => 
        block.id === blockId 
          ? { ...block, content: { ...block.content, url: data.url, filename: file.name } }
          : block
      ))
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
    } finally {
      setBlockUploading(blockId, false)
    }
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>, blockId: string, active: boolean) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveBlockId(active ? blockId : null)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, blockId: string, acceptType: string) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActiveBlockId(null)
    
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith(acceptType)) {
      handleFileUpload(file, blockId)
    } else {
      alert(`Please drop a valid ${acceptType.replace('/', ' ')} file`)
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const addTag = (newTag: string) => {
    const trimmedTag = newTag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
    }
  }

  const getArticlePayload = (status: string) => {
    // Find media from blocks
    const imageBlock = blocks.find(b => b.type === 'image' && b.content.url)
    const videoBlock = blocks.find(b => b.type === 'video' && b.content.url)
    const audioBlock = blocks.find(b => b.type === 'audio' && b.content.url)

    return {
      type: 'article',
      title,
      heroImage: imageBlock?.content.url || null,
      heroVideo: videoBlock?.content.url || null,
      heroAudio: audioBlock?.content.url || null,
      blocks: blocks.map((block, index) => ({
        id: block.id,
        type: block.type,
        content: block.content,
        order: index,
      })),
      status,
      category: category || null, // Backend will convert name to ID
      tags,
      metaTitle: seoTitle || null,
      metaDescription: metaDescription || null,
      excerpt: blocks.find(b => b.type === 'text')?.content.text?.slice(0, 200) || null,
    }
  }

  const handleSaveDraft = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/cms/contents/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getArticlePayload('draft'))
      })
      if (response.ok) {
        const data = await response.json()
        router.push(`/profile`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save draft')
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save draft')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/cms/contents/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getArticlePayload('published'))
      })
      if (response.ok) {
        router.push('/profile')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to publish')
      }
    } catch (error) {
      console.error('Error publishing:', error)
      alert('Failed to publish')
    } finally {
      setSaving(false)
    }
  }

  const blockTypes = [
    { type: 'text' as const, icon: Type, label: 'Text' },
    { type: 'heading' as const, icon: Heading, label: 'Heading' },
    { type: 'image' as const, icon: ImageIcon, label: 'Image' },
    { type: 'video' as const, icon: Video, label: 'Video' },
    { type: 'audio' as const, icon: Music, label: 'Audio' },
    { type: 'quote' as const, icon: Quote, label: 'Quote' },
    { type: 'divider' as const, icon: Minus, label: 'Divider' },
    { type: 'embed' as const, icon: Code, label: 'Embed' },
  ]

  const canPublish = title.trim().length > 0 && blocks.some(b => 
    b.content.text?.trim() || b.content.url?.trim() || b.type === 'divider'
  )

  const getUploadConfig = (type: BlockType) => {
    switch (type) {
      case 'image':
        return {
          accept: 'image/*',
          acceptType: 'image/',
          icon: ImageIcon,
          title: 'Cover image',
          description: 'Drag & Drop or',
          highlight: 'choose file',
          suffix: 'to upload',
          hint: 'Recommended: 1200x630px'
        }
      case 'video':
        return {
          accept: 'video/*',
          acceptType: 'video/',
          icon: Video,
          title: 'Video',
          description: 'Drag and drop files here, or click to browse',
          highlight: '',
          suffix: '',
          hint: 'Supported formats: MP4, WebM, OGG (Max 500MB)'
        }
      case 'audio':
        return {
          accept: 'audio/*',
          acceptType: 'audio/',
          icon: Music,
          title: 'Audio',
          description: 'Drag and drop files here, or click to browse',
          highlight: '',
          suffix: '',
          hint: 'Supported formats: MP3, WAV, OGG (Max 50MB)'
        }
      default:
        return null
    }
  }

  return (
    <>
      {/* Main Editor Area */}
      <div className="flex-1 border border-[#333333] rounded-lg">
        <div className="p-6 space-y-6">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your article title..."
            className="w-full text-sm font-medium text-white bg-transparent border-none outline-none placeholder-white"
          />

          {/* Content Blocks */}
          <div className="space-y-6">
            {blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                blocksCount={blocks.length}
                dragActiveBlockId={dragActiveBlockId}
                onUpdate={(content) => updateBlock(block.id, content)}
                onDelete={() => deleteBlock(block.id)}
                onFileUpload={(file) => handleFileUpload(file, block.id)}
                onDrag={(e, active) => handleDrag(e, block.id, active)}
                onDrop={(e) => {
                  const config = getUploadConfig(block.type)
                  if (config) handleDrop(e, block.id, config.acceptType)
                }}
                getUploadConfig={getUploadConfig}
              />
            ))}
          </div>

          {/* Add Block Button */}
          <div className="relative">
            <button
              onClick={() => setShowBlockPicker(!showBlockPicker)}
              className="flex items-center gap-2 px-4 py-2 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Block
            </button>

            {/* Block Picker Popup */}
            {showBlockPicker && (
              <div className="absolute top-full mt-2 left-0 p-3 bg-[#262626] border border-[#333333] rounded-lg z-10 shadow-xl">
                <div className="grid grid-cols-4 gap-4">
                  {blockTypes.map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => addBlock(type)}
                      className="flex flex-col items-center gap-1 p-3 hover:bg-[#333333] rounded-lg transition-colors"
                    >
                      <Icon className="w-5 h-5 text-[#A3A3A3]" />
                      <span className="text-xs font-medium text-[#A3A3A3]">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-6">
            <button
              onClick={handlePublish}
              disabled={!canPublish || saving}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                canPublish && !saving
                  ? 'bg-[#C9A96E] text-[#332217] hover:bg-[#B89A5E] shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)]'
                  : 'bg-[#262626] text-[#5C5C5C] cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              {saving ? 'Publishing...' : 'Publish Now'}
            </button>

            <div className="flex gap-4">
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                Save Draft
              </button>
              <button
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#333333] rounded-lg text-sm text-white shadow-[inset_0px_1px_1px_rgba(255,255,255,0.08)] hover:bg-[#404040] transition-colors disabled:opacity-50"
              >
                <Clock className="w-5 h-5" />
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Article Settings */}
      <div className="w-[200px] shrink-0">
        <div className="border border-[#333333] rounded-lg">
          {/* Header */}
          <div className="px-4 pb-4 pt-4 border-b border-[#333333]">
            <h3 className="text-base font-medium text-white font-['IBM_Plex_Sans']">Article Settings</h3>
          </div>

          {/* Status */}
          <SettingsField icon={<FileText className="w-5 h-5 text-[#A3A3A3]" />} label="Status">
            <select
              value={articleStatus}
              onChange={(e) => setArticleStatus(e.target.value)}
              className="w-full px-3 py-2 text-sm text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded-lg outline-none appearance-none cursor-pointer"
            >
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </SettingsField>

          {/* Category */}
          <SettingsField icon={<FolderOpen className="w-5 h-5 text-[#A3A3A3]" />} label="Category">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Art, Music"
              className="w-full px-3 py-2 text-sm text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#7B7B7B]"
            />
          </SettingsField>

          {/* Tags */}
          <SettingsField icon={<Tag className="w-5 h-5 text-[#A3A3A3]" />} label="Tags">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-[#333333] rounded">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTagInput.trim()) {
                      e.preventDefault()
                      addTag(newTagInput)
                      setNewTagInput('')
                    }
                  }}
                  placeholder="Add tag..."
                  className="flex-1 px-2 py-1 text-xs text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded outline-none placeholder-[#5C5C5C]"
                />
                <button
                  onClick={() => {
                    if (newTagInput.trim()) {
                      addTag(newTagInput)
                      setNewTagInput('')
                    }
                  }}
                  className="px-2 py-1 text-xs text-white bg-[#333333] rounded hover:bg-[#404040]"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </SettingsField>

          {/* Language */}
          <SettingsField icon={<Globe className="w-5 h-5 text-[#A3A3A3]" />} label="Language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded-lg outline-none appearance-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </SettingsField>

          {/* Visibility */}
          <SettingsField icon={<EyeOff className="w-5 h-5 text-[#A3A3A3]" />} label="Visibility">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-3 py-2 text-sm text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded-lg outline-none appearance-none cursor-pointer"
            >
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </SettingsField>

          {/* SEO Preview */}
          <SettingsField icon={<FileText className="w-5 h-5 text-[#A3A3A3]" />} label="SEO Preview">
            <div className="space-y-2">
              <div className="p-2 bg-[#262626] border border-[#333333] rounded-lg">
                <p className="text-xs text-white truncate">{title || 'Article Title'}</p>
                <p className="text-xs text-[#A3A3A3]">yoursite.com/articles/...</p>
                <p className="text-[10px] text-[#7B7B7B] line-clamp-2">
                  {metaDescription || 'Add a meta description to improve search visibility...'}
                </p>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="SEO Title"
                className="w-full px-3 py-2 text-sm text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#7B7B7B]"
              />
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta description"
                rows={2}
                className="w-full px-3 py-2 text-sm text-[#7B7B7B] bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#7B7B7B] resize-none"
              />
            </div>
          </SettingsField>
        </div>
      </div>
    </>
  )
}

/** Block Renderer Component */
function BlockRenderer({
  block,
  blocksCount,
  dragActiveBlockId,
  onUpdate,
  onDelete,
  onFileUpload,
  onDrag,
  onDrop,
  getUploadConfig
}: {
  block: ContentBlock
  blocksCount: number
  dragActiveBlockId: string | null
  onUpdate: (content: BlockContent) => void
  onDelete: () => void
  onFileUpload: (file: File) => void
  onDrag: (e: DragEvent<HTMLDivElement>, active: boolean) => void
  onDrop: (e: DragEvent<HTMLDivElement>) => void
  getUploadConfig: (type: BlockType) => {
    accept: string
    acceptType: string
    icon: typeof ImageIcon
    title: string
    description: string
    highlight: string
    suffix: string
    hint: string
  } | null
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadConfig = getUploadConfig(block.type)
  const isDragActive = dragActiveBlockId === block.id

  // Text Block
  if (block.type === 'text') {
    return (
      <div className="relative group">
        <div className="relative">
          <textarea
            value={block.content.text || ''}
            onChange={(e) => onUpdate({ ...block.content, text: e.target.value })}
            placeholder="Start writing your article..."
            className="w-full min-h-[80px] px-3 py-2 text-sm text-white bg-[#262626] border border-[#333333] rounded-lg outline-none resize-y placeholder-white focus:border-[#5C5C5C]"
          />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#5C5C5C] rounded-full" />
        </div>
        {blocksCount > 1 && <DeleteButton onDelete={onDelete} />}
      </div>
    )
  }

  // Heading Block
  if (block.type === 'heading') {
    return (
      <div className="relative group">
        <input
          type="text"
          value={block.content.text || ''}
          onChange={(e) => onUpdate({ ...block.content, text: e.target.value })}
          placeholder="Heading..."
          className="w-full px-3 py-2 text-lg font-bold text-white bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#5C5C5C] focus:border-[#5C5C5C]"
        />
        {blocksCount > 1 && <DeleteButton onDelete={onDelete} />}
      </div>
    )
  }

  // Quote Block
  if (block.type === 'quote') {
    return (
      <div className="relative group space-y-2">
        <div className="border-l-4 border-[#C9A96E] pl-4">
          <textarea
            value={block.content.text || ''}
            onChange={(e) => onUpdate({ ...block.content, text: e.target.value })}
            placeholder="Quote text..."
            className="w-full min-h-[60px] text-lg italic text-white bg-transparent outline-none resize-y placeholder-[#5C5C5C]"
          />
        </div>
        <input
          type="text"
          value={block.content.author || ''}
          onChange={(e) => onUpdate({ ...block.content, author: e.target.value })}
          placeholder="— Author name"
          className="w-full px-3 py-2 text-sm text-[#A3A3A3] bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#5C5C5C]"
        />
        {blocksCount > 1 && <DeleteButton onDelete={onDelete} />}
      </div>
    )
  }

  // Divider Block
  if (block.type === 'divider') {
    return (
      <div className="relative group py-4">
        <div className="border-t border-[#333333]" />
        {blocksCount > 1 && <DeleteButton onDelete={onDelete} />}
      </div>
    )
  }

  // Embed Block
  if (block.type === 'embed') {
    return (
      <div className="relative group space-y-2">
        <label className="text-sm font-medium text-white">Embed URL or Code</label>
        <input
          type="text"
          value={block.content.url || ''}
          onChange={(e) => onUpdate({ ...block.content, url: e.target.value })}
          placeholder="YouTube, Vimeo, SoundCloud URL..."
          className="w-full px-3 py-2 text-sm text-white bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#5C5C5C] focus:border-[#5C5C5C]"
        />
        <textarea
          value={block.content.embedCode || ''}
          onChange={(e) => onUpdate({ ...block.content, embedCode: e.target.value })}
          placeholder="Or paste embed HTML code..."
          rows={3}
          className="w-full px-3 py-2 text-sm text-white bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#5C5C5C] font-mono resize-none"
        />
        {block.content.url && isYouTubeUrl(block.content.url) && (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={getYouTubeEmbedUrl(block.content.url)}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
        {blocksCount > 1 && <DeleteButton onDelete={onDelete} />}
      </div>
    )
  }

  // Media Upload Blocks (Image, Video, Audio)
  if (uploadConfig) {
    const Icon = uploadConfig.icon
    const hasMedia = block.content.url

    return (
      <div className="relative group space-y-2">
        <label className="text-sm font-medium text-white">
          {uploadConfig.title}
          {block.type !== 'image' && <span className="text-[#A3A3A3] font-normal"> (Optional)</span>}
        </label>

        {hasMedia ? (
          <div className="relative">
            {block.type === 'image' && (
              <img src={block.content.url} alt="" className="w-full max-h-[200px] object-cover rounded-lg" />
            )}
            {block.type === 'video' && (
              <video src={block.content.url} controls className="w-full max-h-[200px] rounded-lg bg-black" />
            )}
            {block.type === 'audio' && (
              <div className="p-4 bg-[#1A1A1A] rounded-lg">
                <audio src={block.content.url} controls className="w-full" />
                {block.content.filename && (
                  <p className="text-xs text-[#7B7B7B] mt-2 truncate">{block.content.filename}</p>
                )}
              </div>
            )}
            <button
              onClick={() => onUpdate({ ...block.content, url: '', filename: '' })}
              className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(e) => onDrag(e, true)}
            onDragLeave={(e) => onDrag(e, false)}
            onDragOver={(e) => onDrag(e, true)}
            onDrop={onDrop}
            className={`p-6 bg-[#262626] rounded-lg border border-[#333333] cursor-pointer hover:border-[#5C5C5C] transition-colors flex flex-col items-center gap-2 ${
              isDragActive ? 'border-[#C9A96E] bg-[#C9A96E]/5' : ''
            }`}
          >
            {block.isUploading ? (
              <Loader2 className="w-6 h-6 text-[#A3A3A3] animate-spin" />
            ) : (
              <Icon className="w-6 h-6 text-[#A3A3A3]" />
            )}
            <div className="text-center">
              {uploadConfig.highlight ? (
                <p className="text-sm font-medium text-white">
                  {uploadConfig.description} <span className="text-[#AF7E47]">{uploadConfig.highlight}</span> {uploadConfig.suffix}
                </p>
              ) : (
                <p className="text-sm font-medium text-white">{uploadConfig.description}</p>
              )}
              <p className="text-xs text-[#A3A3A3]">{uploadConfig.hint}</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={uploadConfig.accept}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onFileUpload(file)
              }}
            />
          </div>
        )}

        {/* Caption for media blocks */}
        {hasMedia && (
          <input
            type="text"
            value={block.content.caption || ''}
            onChange={(e) => onUpdate({ ...block.content, caption: e.target.value })}
            placeholder="Add a caption (optional)"
            className="w-full px-3 py-2 text-sm text-[#A3A3A3] bg-[#262626] border border-[#333333] rounded-lg outline-none placeholder-[#5C5C5C]"
          />
        )}

        {blocksCount > 1 && <DeleteButton onDelete={onDelete} />}
      </div>
    )
  }

  return null
}

/** Delete Button Component */
function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      onClick={onDelete}
      className="absolute -right-8 top-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-900/30 rounded transition-all"
    >
      <Trash2 className="w-4 h-4 text-red-500" />
    </button>
  )
}

/** Settings Field Component */
function SettingsField({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-4 border-b border-[#333333] last:border-b-0">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium text-[#A3A3A3]">{label}</span>
      </div>
      {children}
    </div>
  )
}

/** Helper functions */
function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
  return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
}
