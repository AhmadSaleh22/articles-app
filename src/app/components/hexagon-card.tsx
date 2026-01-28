"use client"

import Image from "next/image"
import Link from "next/link"

interface HexagonCardProps {
  title: string
  image: string | null
  type: string
  href?: string
  articleCount?: number
  isMock?: boolean
}

export function HexagonCard({ title, image, type, href = "#", articleCount, isMock = false }: HexagonCardProps) {
  // Check if image is a media file (video/audio)
  const isMediaFile = image && (
    image.endsWith('.mp4') ||
    image.endsWith('.mp3') ||
    image.endsWith('.wav') ||
    image.endsWith('.ogg') ||
    image.endsWith('.webm')
  )
  const shouldShowImage = image && !isMediaFile

  // Mock card - gray placeholder
  if (isMock) {
    return (
      <div className="hexagon-card-wrapper">
        <div className="hexagon-svg-container relative">
          <Image
            src="/Card.svg"
            alt=""
            className="hexagon-background w-full h-auto opacity-30"
            width={328}
            height={397}
          />
        </div>
      </div>
    )
  }

  // Get badge text
  const getBadgeText = () => {
    if (articleCount) return `${articleCount} articles`
    return type.toUpperCase().replace('_', ' ')
  }

  // Clip path matching Card.svg inner hexagon shape (elongated pointy-top)
  const hexClipPath = "polygon(50% 0%, 95.3% 20.1%, 95.3% 79.9%, 50% 100%, 4.7% 79.9%, 4.7% 20.1%)"

  return (
    <Link href={href} className="hexagon-card-wrapper group block">
      <div className="hexagon-svg-container relative">
        {/* Image layer - behind the frame */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: hexClipPath }}>
          {shouldShowImage ? (
            // Use native img for uploaded files, Next.js Image for external/static
            image.startsWith('/uploads/') || image.startsWith('http') ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={image}
                alt={title}
                width={362}
                height={437}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
          )}

          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)"
            }}
          />
        </div>

        {/* SVG Frame - on top */}
        <Image
          src="/Card.svg"
          alt=""
          className="hexagon-background w-full h-auto relative z-10 pointer-events-none"
          width={362}
          height={437}
        />
      </div>

      {/* Content overlay */}
      <div className="hexagon-content absolute z-20 text-center">
        <h3 className="text-white font-medium mb-2 line-clamp-2 drop-shadow-lg">{title}</h3>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
            {getBadgeText()}
          </span>
        </div>
      </div>

      <style jsx>{`
        .hexagon-card-wrapper {
          position: relative;
          width: 100%;
          cursor: pointer;
        }

        .hexagon-svg-container {
          position: relative;
        }

        .hexagon-content {
          position: absolute;
          bottom: 12%;
          left: 10%;
          right: 10%;
        }

        .hexagon-content h3 {
          font-size: clamp(0.75rem, 2vw, 1.125rem);
          line-height: 1.3;
        }

        .hexagon-content span {
          font-size: clamp(0.6rem, 1.5vw, 0.75rem);
        }
      `}</style>
    </Link>
  )
}
