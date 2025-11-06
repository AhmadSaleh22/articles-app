import Link from 'next/link'

interface HexCardProps {
  title: string
  author: string
  date: string
  type: string
  image: string | null
  href: string
}

export default function HexCard({ title, author, date, type, image, href }: HexCardProps) {
  // For audio and video types, check if the image is actually a media file (not an image)
  const isMediaFile = image && (image.endsWith('.mp4') || image.endsWith('.mp3') || image.endsWith('.wav') || image.endsWith('.ogg') || image.endsWith('.webm'))
  const shouldShowImage = image && !isMediaFile

  return (
    <Link href={href} className="group block w-full h-full">
      <div className="relative w-full h-full">
        {/* Background Image */}
        {shouldShowImage ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}

        {/* Dark gradient overlay - bottom heavy */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />

        {/* Content - positioned at bottom */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 py-10 backdrop-blur-sm">
          {/* Card Title */}
          <h3
            className="text-white text-xl leading-7 font-['IBM_Plex_Sans',sans-serif] font-medium text-center line-clamp-2 px-2"
            style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.24)' }}
          >
            {title}
          </h3>

          {/* Label Badge */}
          <div className="flex items-center backdrop-blur-sm bg-[rgba(23,23,23,0.8)] rounded-sm overflow-hidden">
            <div className="w-2 h-6 bg-[rgba(23,23,23,0.8)]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
            <div className="px-3 py-1">
              <span className="text-white text-xs font-medium leading-4 capitalize">{type}</span>
            </div>
            <div className="w-2 h-6 bg-[rgba(23,23,23,0.8)]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
          </div>
        </div>
      </div>
    </Link>
  )
}
