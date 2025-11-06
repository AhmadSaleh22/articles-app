'use client'

import { useState, useRef } from 'react'
import { CloudUpload } from 'lucide-react'

interface FileUploadAreaProps {
  onFilesSelected?: (files: File[]) => void
}

export function FileUploadArea({ onFilesSelected }: FileUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (onFilesSelected && files.length > 0) {
      onFilesSelected(files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (onFilesSelected && files.length > 0) {
      onFilesSelected(files)
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf,.mp3,.mp4,.doc,.docx"
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          flex flex-col items-center justify-center gap-2 p-6
          border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragging
            ? 'border-[#C9A96E] bg-neutral-800/50'
            : 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
          }
        `}
      >
        <CloudUpload className="w-6 h-6 text-neutral-400" />
        <div className="text-center">
          <p className="text-sm font-medium text-white mb-1">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-xs text-neutral-400">
            Supported formats: JPG, PNG, PDF, MP3, MP4, DOC (Max 20MB)
          </p>
        </div>
      </div>
    </div>
  )
}
