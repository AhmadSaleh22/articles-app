'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TextStyle } from '@tiptap/extension-text-style'
import { Video } from './VideoExtension'
import { Audio } from './AudioExtension'
import { MenuBar } from './MenuBar'
import { useCallback } from 'react'
import { useAlertStore } from '@/store/useAlertStore'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  // Parse JSON content if it's a string
  const getInitialContent = () => {
    if (!content) return ''
    try {
      // If content is a JSON string, parse it
      if (typeof content === 'string' && content.startsWith('{')) {
        return JSON.parse(content)
      }
      return content
    } catch (e) {
      console.error('Error parsing content:', e)
      return ''
    }
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Video,
      Audio,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your article...',
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
    ],
    content: getInitialContent(),
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none p-8 min-h-[500px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()))
    },
  })

  const handleFileUpload = useCallback(
    async (file: File, type: 'image' | 'video' | 'audio') => {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 401) {
            useAlertStore.getState().error('Please log in to upload files.')
          } else if (response.status === 429) {
            useAlertStore.getState().error('Too many uploads. Please try again later.')
          } else if (response.status === 413) {
            useAlertStore.getState().error(data.error || 'File is too large. Maximum size is 50MB.')
          } else {
            useAlertStore.getState().error(data.error || 'Upload failed')
          }
          return
        }

        if (editor) {
          if (type === 'image') {
            editor.chain().focus().setImage({ src: data.url }).run()
          } else if (type === 'video') {
            (editor.chain().focus() as any).setVideo({ src: data.url }).run()
          } else if (type === 'audio') {
            (editor.chain().focus() as any).setAudio({ src: data.url }).run()
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        useAlertStore.getState().error('Failed to upload file. Please try again.')
      }
    },
    [editor]
  )

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} onFileUpload={handleFileUpload} />
      <EditorContent editor={editor} />
    </div>
  )
}
