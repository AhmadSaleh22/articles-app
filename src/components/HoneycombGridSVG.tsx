/* eslint-disable react-hooks/preserve-manual-memoization */
'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { HexagonCard } from '@/app/components/hexagon-card'

interface ContentItem {
  id: string
  title: string
  author: string
  date: string
  type: string
  image: string | null
  href: string
  articleCount?: number
}

interface HoneycombGridProps {
  contents: ContentItem[]
  hexSize?: number
  gap?: number
}

export default function HoneycombGridSVG({ contents, hexSize = 280, gap = 30 }: HoneycombGridProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const gridData = useMemo(() => {
    // Responsive columns based on screen width
    let cols = 4
    let cardWidth = 280 // Base card width in px

    if (windowWidth < 640) {
      cols = 1
      cardWidth = Math.min(280, windowWidth - 48)
    } else if (windowWidth < 768) {
      cols = 2
      cardWidth = 200
    } else if (windowWidth < 1024) {
      cols = 3
      cardWidth = 220
    } else if (windowWidth < 1280) {
      cols = 3
      cardWidth = 260
    } else if (windowWidth < 1536) {
      cols = 4
      cardWidth = 280
    } else {
      cols = 5
      cardWidth = 300
    }

    // Card aspect ratio (approximately 328:397 from Card.svg)
    const aspectRatio = 397 / 328
    const cardHeight = cardWidth * aspectRatio

    // Calculate vertical spacing for honeycomb pattern (slight overlap for visual cohesion)
    const verticalOverlap = cardHeight * 0.12 // Reduced overlap for more spacing
    const horizontalOffset = (cardWidth + gap) * 0.5 // Offset for odd rows

    // Filter out mock cards that are just for spacing in the old implementation
    const realContents = contents.filter(c => !c.id.startsWith('grid-mock-') && !c.id.startsWith('hero-bg-'))

    // Calculate positions for each card
    const positions = realContents.map((content, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      const isOddRow = row % 2 === 1

      // X position: column * card width + offset for odd rows
      const x = col * (cardWidth + gap) + (isOddRow ? horizontalOffset : 0)

      // Y position: row * (card height - overlap)
      const y = row * (cardHeight - verticalOverlap)

      return { content, x, y, row, col }
    })

    // Calculate total grid dimensions
    const maxCol = cols - 1
    const maxRow = Math.ceil(realContents.length / cols) - 1
    const isLastRowOdd = maxRow % 2 === 1

    const totalWidth = (maxCol + 1) * (cardWidth + gap) + (isLastRowOdd ? horizontalOffset : 0) + cardWidth
    const totalHeight = (maxRow + 1) * (cardHeight - verticalOverlap) + verticalOverlap

    return {
      positions,
      totalWidth,
      totalHeight,
      cardWidth,
      cardHeight,
      cols
    }
  }, [contents, hexSize, gap, windowWidth])

  // Single column layout for mobile
  if (gridData.cols === 1) {
    return (
      <div className="flex flex-col items-center gap-4 px-4">
        {gridData.positions.map(({ content }) => (
          <div key={content.id} style={{ width: gridData.cardWidth }}>
            <HexagonCard
              title={content.title}
              image={content.image}
              type={content.type}
              href={content.href}
              articleCount={content.articleCount}
              isMock={content.type === 'mock'}
            />
          </div>
        ))}

        {/* Gradient blur spacer */}
        <div className="relative w-full h-32 mt-8" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(23, 23, 23, 0.5) 50%, #171717 100%)'
        }} />
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center relative px-8 md:px-12 lg:px-16">
      <div
        className="relative"
        style={{
          width: gridData.totalWidth,
          height: gridData.totalHeight,
          maxWidth: '100%'
        }}
      >
        {gridData.positions.map(({ content, x, y }) => (
          <div
            key={content.id}
            className="absolute transition-transform duration-300"
            style={{
              left: x,
              top: y,
              width: gridData.cardWidth
            }}
          >
            <HexagonCard
              title={content.title}
              image={content.image}
              type={content.type}
              href={content.href}
              articleCount={content.articleCount}
              isMock={content.type === 'mock'}
            />
          </div>
        ))}
      </div>

      {/* Gradient blur spacer */}
      <div style={{
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        background: 'linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.01) 8%, rgba(23, 23, 23, 0.02) 16%, rgba(23, 23, 23, 0.04) 22%, rgba(23, 23, 23, 0.08) 29%, rgba(23, 23, 23, 0.12) 35%, rgba(23, 23, 23, 0.16) 41%, rgba(23, 23, 23, 0.24) 47%, rgba(23, 23, 23, 0.32) 53%, rgba(23, 23, 23, 0.40) 59%, rgba(23, 23, 23, 0.48) 65%, rgba(23, 23, 23, 0.56) 71%, rgba(23, 23, 23, 0.64) 78%, rgba(23, 23, 23, 0.80) 84%, rgba(23, 23, 23, 0.88) 92%, #171717 100%)',
        position: 'absolute',
        bottom: -80,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '200px',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
      }} />
    </div>
  )
}
