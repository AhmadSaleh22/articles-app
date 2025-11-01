'use client'

import { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Video,
  Music,
  Link as LinkIcon,
  Highlighter,
} from 'lucide-react'
import { useRef } from 'react'

interface MenuBarProps {
  editor: Editor
  onFileUpload: (file: File, type: 'image' | 'video' | 'audio') => void
}

export function MenuBar({ editor, onFileUpload }: MenuBarProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileUpload(file, 'image')
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileUpload(file, 'video')
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileUpload(file, 'audio')
  }

  const handleLinkAdd = () => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run()
  }

  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setHighlight({ color: e.target.value }).run()
  }

  const Button = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void
    active?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        active ? 'bg-gray-300' : ''
      }`}
      title={title}
      type="button"
    >
      {children}
    </button>
  )

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Bold"
      >
        <Bold size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <Italic size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Underline"
      >
        <UnderlineIcon size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="Code"
      >
        <Code size={18} />
      </Button>

      <div className="w-px bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </Button>

      <div className="w-px bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote size={18} />
      </Button>

      <div className="w-px bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight size={18} />
      </Button>

      <div className="w-px bg-gray-300 mx-1" />

      <Button onClick={handleLinkAdd} active={editor.isActive('link')} title="Add Link">
        <LinkIcon size={18} />
      </Button>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <Button onClick={() => imageInputRef.current?.click()} title="Upload Image">
        <Image size={18} />
      </Button>

      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleVideoUpload}
      />
      <Button onClick={() => videoInputRef.current?.click()} title="Upload Video">
        <Video size={18} />
      </Button>

      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleAudioUpload}
      />
      <Button onClick={() => audioInputRef.current?.click()} title="Upload Audio">
        <Music size={18} />
      </Button>

      <div className="w-px bg-gray-300 mx-1" />

      <label className="p-2 flex items-center gap-1 cursor-pointer" title="Text Color">
        <input
          type="color"
          onChange={handleColorChange}
          className="w-6 h-6 cursor-pointer"
        />
      </label>

      <label className="p-2 flex items-center gap-1 cursor-pointer" title="Highlight">
        <Highlighter size={18} />
        <input
          type="color"
          onChange={handleHighlightChange}
          className="w-6 h-6 cursor-pointer"
        />
      </label>

      <div className="w-px bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo size={18} />
      </Button>

      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo size={18} />
      </Button>
    </div>
  )
}
