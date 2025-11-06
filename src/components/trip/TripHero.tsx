'use client'

interface TripHeroProps {
  imageUrl?: string
  title: string
  tags?: string[]
  fromLocation: string
  toLocation: string
}

export function TripHero({
  imageUrl,
  title,
  tags = [],
  fromLocation,
  toLocation,
}: TripHeroProps) {
  return (
    <div className="relative w-full h-[360px] overflow-hidden">
      {/* Background Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-full px-6 md:px-20 lg:px-40 flex flex-col justify-end pb-12">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neutral-800/80 backdrop-blur-sm text-neutral-200 text-sm rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-['IBM_Plex_Sans'] font-medium text-3xl md:text-4xl text-white mb-4">
          {title}
        </h1>

        {/* Route */}
        <div className="flex items-center gap-3 text-neutral-300">
          <span>{fromLocation}</span>
          <span>→</span>
          <span>{toLocation}</span>
        </div>
      </div>
    </div>
  )
}
