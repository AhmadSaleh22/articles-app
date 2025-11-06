'use client'

import { File, Trash2 } from 'lucide-react'

interface UploadedFileItemProps {
  fileName: string
  fileSize: string
  onDelete?: () => void
}

export function UploadedFileItem({ fileName, fileSize, onDelete }: UploadedFileItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-neutral-800 border border-neutral-700 rounded-lg">
      {/* File Icon */}
      <div className="flex items-center justify-center w-10 h-10 border border-neutral-700 rounded bg-transparent shrink-0">
        <File className="w-6 h-6 text-neutral-400" />
      </div>

      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/70 truncate">
          {fileName}
        </p>
        <p className="text-xs text-white/50">
          {fileSize}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="p-1 hover:bg-neutral-700 rounded transition-colors shrink-0"
        type="button"
        aria-label="Delete file"
      >
        <Trash2 className="w-4 h-4 text-neutral-400" />
      </button>
    </div>
  )
}
