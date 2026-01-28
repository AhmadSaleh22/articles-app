"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

interface OpenCallCardProps {
  title: string
  creator?: string
  timeline: string
  description?: string
  href: string
  image?: string | null
}

export function OpenCallCard({ title, creator = "Creator", timeline, description, href, image }: OpenCallCardProps) {
  // Generate unique IDs for this card instance
  const uniqueId = Math.random().toString(36).substr(2, 9)

  return (
    <Link href={href} className="block group">
      <div className="relative w-full max-w-[320px]">
        {/* SVG Hexagon Container */}
        <svg
          viewBox="0 0 361 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            {/* Gradient border */}
            <linearGradient id={`borderGradient-${uniqueId}`} x1="180.5" y1="0" x2="180.5" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#444444" />
              <stop offset="0.85" stopColor="#333333" stopOpacity="0.2" />
            </linearGradient>

            {/* Clip path for inner hexagon image */}
            <clipPath id={`imageClip-${uniqueId}`}>
              <path
                d="M173.509 27.3965C177.923 25.252 183.077 25.252 187.491 27.3965L241.491 53.6297C247.002 56.3067 250.5 61.8951 250.5 68.0214V129.979C250.5 136.105 247.002 141.693 241.491 144.37L187.491 170.604C183.077 172.748 177.923 172.748 173.509 170.604L119.509 144.37C113.998 141.693 110.5 136.105 110.5 129.979V68.0214C110.5 61.8951 113.998 56.3067 119.509 53.6297L173.509 27.3965Z"
              />
            </clipPath>

            {/* Drop shadow for image */}
            <filter id={`imageShadow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Hexagon outer shape */}
          <path
            d="M170.032 5.07434C176.643 1.86976 184.357 1.86976 190.968 5.07434L346.968 80.6918C355.244 84.7033 360.5 93.0914 360.5 102.288V317.712C360.5 326.909 355.244 335.297 346.968 339.308L190.968 414.926C184.357 418.13 176.643 418.13 170.032 414.926L14.0316 339.308C5.75566 335.297 0.5 326.909 0.5 317.712V102.288C0.5 93.0915 5.75566 84.7033 14.0316 80.6918L170.032 5.07434Z"
            fill="transparent"
            stroke={`url(#borderGradient-${uniqueId})`}
            strokeWidth="1"
          />

          {/* Decorative inner border */}
          <path
            d="M170.032 5.07434C176.643 1.86976 184.357 1.86976 190.968 5.07434L346.968 80.6918C355.244 84.7033 360.5 93.0914 360.5 102.288V317.712C360.5 326.909 355.244 335.297 346.968 339.308L190.968 414.926C184.357 418.13 176.643 418.13 170.032 414.926L14.0316 339.308C5.75566 335.297 0.5 326.909 0.5 317.712V102.288C0.5 93.0915 5.75566 84.7033 14.0316 80.6918L170.032 5.07434Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.05"
          />

          {/* Top highlight line */}
          <path
            d="M169.255 12.6885C176.675 9.10385 185.325 9.10384 192.745 12.6885L329.001 78.5163C333.892 80.8793 337 85.8325 337 91.2646L189.266 19.8916C184.044 17.369 177.956 17.369 172.734 19.8916L25 91.2646C25 85.8325 28.108 80.8793 32.9992 78.5163L169.255 12.6885Z"
            fill="#5C5C5C"
            opacity="0.2"
          />

          {/* Inner hexagon with image */}
          <g filter={`url(#imageShadow-${uniqueId})`}>
            {/* Image background hexagon */}
            <path
              d="M173.509 27.3965C177.923 25.252 183.077 25.252 187.491 27.3965L241.491 53.6297C247.002 56.3067 250.5 61.8951 250.5 68.0214V129.979C250.5 136.105 247.002 141.693 241.491 144.37L187.491 170.604C183.077 172.748 177.923 172.748 173.509 170.604L119.509 144.37C113.998 141.693 110.5 136.105 110.5 129.979V68.0214C110.5 61.8951 113.998 56.3067 119.509 53.6297L173.509 27.3965Z"
              fill="#2a2a2a"
            />

            {/* Image inside hexagon */}
            {image && (
              <image
                href={image}
                x="110.5"
                y="27"
                width="140"
                height="144"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#imageClip-${uniqueId})`}
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            )}

            {/* Hexagon border */}
            <path
              d="M173.509 27.3965C177.923 25.252 183.077 25.252 187.491 27.3965L241.491 53.6297C247.002 56.3067 250.5 61.8951 250.5 68.0214V129.979C250.5 136.105 247.002 141.693 241.491 144.37L187.491 170.604C183.077 172.748 177.923 172.748 173.509 170.604L119.509 144.37C113.998 141.693 110.5 136.105 110.5 129.979V68.0214C110.5 61.8951 113.998 56.3067 119.509 53.6297L173.509 27.3965Z"
              fill="none"
              stroke="#444"
              strokeWidth="1"
            />
          </g>
        </svg>

        {/* Text content overlaid on the hexagon */}
        <div className="absolute inset-0 flex flex-col items-center px-8 pt-[52%] pb-8">
          {/* Title */}
          <h2 className="text-center text-lg md:text-xl font-semibold text-white mb-3 line-clamp-2 leading-tight">
            {title}
          </h2>

          {/* Creator & Timeline */}
          <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
            {/* Creator avatar */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C9A96E] text-[#332217] font-bold text-xs">
                {creator.charAt(0).toUpperCase()}
              </div>
              <span className="text-[#C9A96E]/90 font-medium text-xs">{creator}</span>
            </div>

            {/* Divider */}
            <span className="text-neutral-600 mx-0.5">|</span>

            {/* Timeline */}
            <div className="flex items-center gap-1 text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{timeline}</span>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-center text-neutral-400 text-xs leading-relaxed max-w-[220px] line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* CTA Button */}
          <button className="px-5 py-2 rounded-lg bg-[#C9A96E] text-[#332217] font-semibold text-sm hover:bg-[#D4B978] transition-colors shadow-lg group-hover:shadow-xl group-hover:scale-105 transform transition-transform duration-300">
            Join now!
          </button>
        </div>
      </div>
    </Link>
  )
}
