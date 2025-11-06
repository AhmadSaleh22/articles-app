'use client'

interface HeroBannerProps {
  imageUrl?: string
}

export function HeroBanner({ imageUrl }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[320px] overflow-hidden rounded-2xl">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Collection banner"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
      )}
    </div>
  )
}
