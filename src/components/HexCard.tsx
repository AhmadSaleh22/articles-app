import Link from 'next/link'

interface HexCardProps {
  title: string
  author: string
  date: string
  type: string
  image: string | null
  href: string
  articleCount?: number
}

export default function HexCard({ title, author, date, type, image, href, articleCount }: HexCardProps) {
  // For audio and video types, check if the image is actually a media file (not an image)
  const isMediaFile = image && (image.endsWith('.mp4') || image.endsWith('.mp3') || image.endsWith('.wav') || image.endsWith('.ogg') || image.endsWith('.webm'))
  const shouldShowImage = image && !isMediaFile

  // Hexagon polygon points (matching the border polygon)
  const hexagonPath = "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)"

  return (
    <Link href={href} className="block w-full h-full">
      <div
        // className="relative w-full h-full group"
        // style={{ clipPath: hexagonPath }}
      >
        {/* Base background layer */}
        {/* <div className="absolute inset-0 w-full h-full bg-neutral-900" /> */}

        {/* Background Image or gradient */}
        {shouldShowImage ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}

        {/* Gradient overlay - bottom heavy for text readability */}
        <div
          className="absolute inset-0 w-full h-full backdrop-blur-[4px]"
          style={{ background: 'linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.95) 100%)' }}
        />

        {/* Content container - positioned at bottom */}
        {/* <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 py-8 z-10">
          <h3
            className="text-white text-xl leading-7 font-['IBM_Plex_Sans',sans-serif] font-medium text-center line-clamp-2 w-full"
            style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}
          >
            {title}
          </h3>

          <div className="flex flex-col items-center gap-1 w-full">
            <span
              className="text-neutral-200 text-sm font-['Inter'] leading-5 text-center"
              style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
            >
              {author}
            </span>
            <span
              className="text-neutral-400 text-xs font-['Inter'] leading-4 text-center"
              style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }}
            >
              {date}
            </span>
          </div>

          <div className="flex items-center backdrop-blur-sm bg-[rgba(23,23,23,0.9)] rounded-sm overflow-hidden border border-neutral-700/50">
            <div className="px-4 py-1.5">
              <span className="text-white text-xs font-['Inter'] font-medium leading-4 tracking-wide">
                {articleCount ? `${articleCount} articles` : type.toUpperCase()}
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </Link>
  )
}
