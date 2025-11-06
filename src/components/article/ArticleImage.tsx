'use client'

interface ArticleImageProps {
  imageUrl: string
  caption?: string
  alt?: string
}

export function ArticleImage({ imageUrl, caption, alt = 'Article image' }: ArticleImageProps) {
  return (
    <div className="my-8">
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <p className="text-sm text-neutral-400 mt-3">
          {caption}
        </p>
      )}
    </div>
  )
}
