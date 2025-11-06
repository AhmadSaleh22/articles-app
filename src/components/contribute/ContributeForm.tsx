'use client'

import { useState } from 'react'
import { User, PenTool, IdCard, Palette, Music, Book, Camera, FileText, Globe, ChevronDown } from 'lucide-react'
import { ContributeTopicCard } from './ContributeTopicCard'
import { FileUploadArea } from './FileUploadArea'
import { UploadedFileItem } from './UploadedFileItem'

const TOPICS = [
  { id: 'personal-story', label: 'Personal Story', icon: User },
  { id: 'testimony', label: 'Testimony', icon: PenTool },
  { id: 'biography', label: 'Biography', icon: IdCard },
  { id: 'artwork', label: 'Artwork', icon: Palette },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'literature', label: 'Literature', icon: Book },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'history-document', label: 'History document', icon: FileText },
  { id: 'other', label: 'Other', icon: Globe },
]

interface UploadedFile {
  id: string
  name: string
  size: number
}

export function ContributeForm() {
  const [selectedTopic, setSelectedTopic] = useState<string>('personal-story')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formData, setFormData] = useState({
    title: '',
    collection: '',
    description: '',
    name: '',
    email: '',
  })

  const handleFilesSelected = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      topic: selectedTopic,
      ...formData,
      files: uploadedFiles,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      {/* Topic Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-4">
          What would you like to contribute?
        </label>
        <div className="grid grid-cols-3 gap-4">
          {TOPICS.map((topic) => (
            <ContributeTopicCard
              key={topic.id}
              icon={topic.icon}
              label={topic.label}
              selected={selectedTopic === topic.id}
              onClick={() => setSelectedTopic(topic.id)}
            />
          ))}
        </div>
      </div>

      {/* Contribution Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
          Contribution title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title for your contribution"
          required
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
        />
      </div>

      {/* Choose Collection */}
      <div>
        <label htmlFor="collection" className="block text-sm font-medium mb-2">
          <span className="text-white">Choose collection</span>
          <span className="text-neutral-400"> (Optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="collection"
            name="collection"
            value={formData.collection}
            onChange={handleChange}
            placeholder="Enter or select collection"
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a description for the contribution"
          required
          rows={5}
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors resize-y"
        />
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <span className="text-white">Upload files</span>
          <span className="text-neutral-400"> Upload as many as you want</span>
        </label>
        <FileUploadArea onFilesSelected={handleFilesSelected} />

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-4">
            {uploadedFiles.map((file) => (
              <UploadedFileItem
                key={file.id}
                fileName={file.name}
                fileSize={formatFileSize(file.size)}
                onDelete={() => handleDeleteFile(file.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Your Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
        />
      </div>

      {/* Your Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Your email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
          className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
        />
      </div>

      {/* Terms */}
      <p className="text-xs text-neutral-500 leading-relaxed">
        By submitting this content, you agree Trace of the Tides permission to review, archive, and potentially publish this material while maintaining attribution to me as the original creator.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors"
      >
        Submit Contribution
      </button>
    </form>
  )
}
