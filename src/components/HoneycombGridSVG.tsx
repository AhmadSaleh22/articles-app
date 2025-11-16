/* eslint-disable react-hooks/preserve-manual-memoization */
'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { defineHex, Grid, rectangle, Orientation } from 'honeycomb-grid'

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

export default function HoneycombGridSVG({ contents, hexSize = 280, gap = 15 }: HoneycombGridProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsive font sizes and spacing based on window width
  const getResponsiveStyles = () => {
    if (windowWidth < 640) {
      return { title: '14px', badge: '8px', padding: '12px', gap: '6px', bottom: '60px' }
    } else if (windowWidth < 768) {
      return { title: '16px', badge: '9px', padding: '16px', gap: '8px', bottom: '80px' }
    } else if (windowWidth < 1024) {
      return { title: '20px', badge: '10px', padding: '18px', gap: '10px', bottom: '120px' }
    } else if (windowWidth < 1280) {
      return { title: '24px', badge: '11px', padding: '20px', gap: '12px', bottom: '160px' }
    }
    return { title: '30px', badge: '12px', padding: '24px', gap: '12px', bottom: '200px' }
  }

  const styles = getResponsiveStyles()

  const gridData = useMemo(() => {
    // Responsive columns and hex size based on screen width
    let cols = 5
    let cardsPerRow = 4
    let responsiveHexSize = hexSize

    if (windowWidth < 640) {
      // Mobile: 2 columns minimum for honeycomb pattern
      cols = 2
      cardsPerRow = 1 // 1 real card + 1 mock per row
      responsiveHexSize = hexSize * 0.35
    } else if (windowWidth < 768) {
      // Small tablet: 2 columns
      cols = 2
      cardsPerRow = 1
      responsiveHexSize = hexSize * 0.45
    } else if (windowWidth < 1024) {
      // Tablet: 3 columns
      cols = 3
      cardsPerRow = 2 // 2 real + 1 mock per row
      responsiveHexSize = hexSize * 0.55
    } else if (windowWidth < 1280) {
      // Small desktop: 4 columns
      cols = 4
      cardsPerRow = 3 // 3 real + 1 mock per row
      responsiveHexSize = hexSize * 0.7
    }
    // Desktop and above: 5 columns (default) - 4 real + 1 mock per row

    // Define hexagon using honeycomb-grid with proper beehive pattern
    const Hex = defineHex({
      dimensions: responsiveHexSize / 2, // radius, not diameter
      orientation: Orientation.POINTY
    })

    // Create pattern: real cards + 1 mock card per row

    // Insert a mock card after every 4 content cards
    const paddedContents: ContentItem[] = []
    for (let i = 0; i < contents.length; i++) {
      // Add real content card
      paddedContents.push(contents[i])

      // After every 4th card (or at the end), add a mock card
      if ((i + 1) % cardsPerRow === 0 || i === contents.length - 1) {
        paddedContents.push({
          id: `mock-${Math.floor(i / cardsPerRow)}`,
          title: '',
          author: '',
          date: '',
          type: 'mock',
          image: null,
          href: '#',
          articleCount: undefined
        })
      }
    }

    const rows = Math.ceil(paddedContents.length / cols)

    // Create honeycomb grid with offset rows (beehive pattern)
    const grid = new Grid(Hex, rectangle({ width: cols, height: rows }))

    // Get positions for each hex using library's coordinate system
    const hexes = [...grid].slice(0, paddedContents.length).map((hex: any) => {
      // Use honeycomb-grid's built-in coordinate conversion for proper beehive pattern
      // For pointy-top hexagons: offset even rows by half hex width
      const hexWidth = Math.sqrt(3) * (hexSize / 2)
      const hexHeight = 2 * (hexSize / 2)

      // Create extremely tight interlocking honeycomb pattern - minimal spacing
      const horizontalSpacing = hexWidth * 0.04  // Maximum horizontal compression
      const x = hex.q * horizontalSpacing + (hex.r % 2) * (horizontalSpacing / 2)  // Offset odd rows by half
      const y = hex.r * (hexHeight * 0.04)  // Maximum vertical compression

      // Get corner points for SVG rendering
      const corners = hex.corners

      return {
        q: hex.q,
        r: hex.r,
        x,
        y,
        corners: corners.map((c: any) => ({ x: c.x, y: c.y }))
      }
    })

    // Calculate bounds
    const allX = hexes.flatMap(h => h.corners.map((c: any) => h.x + c.x))
    const allY = hexes.flatMap(h => h.corners.map((c: any) => h.y + c.y))

    const minX = Math.min(...allX)
    const minY = Math.min(...allY)
    const maxX = Math.max(...allX)
    const maxY = Math.max(...allY)

    const padding = gap * 2
    const width = maxX - minX + padding
    const height = maxY - minY + padding

    // Normalize positions
    const normalizedHexes = hexes.map(hex => ({
      ...hex,
      x: hex.x - minX + gap,
      y: hex.y - minY + gap
    }))

    return {
      hexes: normalizedHexes,
      width,
      height,
      paddedContents
    }
  }, [contents.length, hexSize, gap, windowWidth])

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        {/* SVG Container with polygons and embedded content */}
        <svg
          style={{ width: '100%', height: 'auto' }}
          viewBox={`0 0 ${gridData.width} ${gridData.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {gridData.hexes.map((hex, index) => {
            if (index >= gridData.paddedContents.length) return null

            const content = gridData.paddedContents[index]
            const isMock = content.type === 'mock'
            const isMediaFile = content.image && (content.image.endsWith('.mp4') || content.image.endsWith('.mp3') || content.image.endsWith('.wav') || content.image.endsWith('.ogg') || content.image.endsWith('.webm'))
            const shouldShowImage = content.image && !isMediaFile

            // Calculate exact bounds from polygon corners
            const cornerXs = hex.corners.map((c: any) => hex.x + c.x)
            const cornerYs = hex.corners.map((c: any) => hex.y + c.y)
            const minX = Math.min(...cornerXs)
            const minY = Math.min(...cornerYs)
            const maxX = Math.max(...cornerXs)
            const maxY = Math.max(...cornerYs)
            const polygonWidth = maxX - minX
            const polygonHeight = maxY - minY

            // ForeignObject is 1.5x larger, so we need to center and recalculate clip-path
            const scale = 1.5
            const foreignWidth = polygonWidth * scale
            const foreignHeight = polygonHeight * scale
            const offsetX = minX - (polygonWidth * (scale - 1) / 2)
            const offsetY = minY - (polygonHeight * (scale - 1) / 2)

            // Create clip-path from actual polygon corners (in percentage relative to enlarged foreignObject bounds)
            const clipPathPoints = hex.corners.map((c: any) => {
              const absoluteX = hex.x + c.x
              const absoluteY = hex.y + c.y
              const relativeX = ((absoluteX - offsetX) / foreignWidth) * 100
              const relativeY = ((absoluteY - offsetY) / foreignHeight) * 100
              return `${relativeX}% ${relativeY}%`
            }).join(', ')
            const hexagonClipPath = `polygon(${clipPathPoints})`

            return (
              <g key={content.id}>
                {/* Hexagon polygon border */}
                <polygon
                  points={hex.corners.map((c: any) => `${hex.x + c.x},${hex.y + c.y}`).join(' ')}
                  fill="none"
                  stroke="#888"
                  strokeWidth="4"
                  opacity="0.8"
                />

                {/* Content inside the polygon using foreignObject - centered and enlarged */}
                <foreignObject
                  x={offsetX}
                  y={offsetY}
                  width={foreignWidth}
                  height={foreignHeight}
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      clipPath: hexagonClipPath,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isMock ? (
                      // Mock card - gray empty placeholder
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#404040'
                      }} />
                    ) : (
                      // Regular content card
                      <a
                        href={content.href}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          textDecoration: 'none',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        {/* Base background */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          background: '#171717'
                        }} />

                        {/* Background Image or gradient */}
                        {shouldShowImage ? (
                          <img
                            src={content.image || ''}
                            alt={content.title}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.7s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)'
                            }}
                          />
                        ) : (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(135deg, #404040 0%, #171717 100%)'
                          }} />
                        )}

                        {/* Gradient overlay */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          backdropFilter: 'blur(4px)',
                          background: 'linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.95) 100%)'
                        }} />

                        {/* Content container */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: styles.bottom,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: styles.gap,
                          width: '70%',
                          margin: '0 auto',
                          padding: styles.padding,
                          zIndex: 10
                        }}>
                          {/* Title */}
                          <h3 style={{
                            color: 'white',
                            fontSize: styles.title,
                            padding: '0 10px',
                            lineHeight: '28px',
                            fontFamily: 'IBM Plex Sans, sans-serif',
                            fontWeight: 500,
                            textAlign: 'center',
                            margin: 0,
                            width: '100%',
                            textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {content.title}
                          </h3>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backdropFilter: 'blur(12px)',
                            background: 'rgba(23, 23, 23, 0.8)',
                            borderRadius: '9999px',
                            overflow: 'hidden'
                          }}>
                            {/* Left gradient edge */}
                            <div style={{
                              height: '24px',
                              width: '8px',
                              background: 'linear-gradient(to right, transparent, rgba(23, 23, 23, 0.8))'
                            }} />

                            <span style={{
                              padding: '4px 12px',
                              color: 'white',
                              fontSize: styles.badge,
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 500
                            }}>
                              {content.articleCount ? `${content.articleCount} articles` : content.type.toUpperCase()}
                            </span>

                            {/* Right gradient edge */}
                            <div style={{
                              height: '24px',
                              width: '8px',
                              background: 'linear-gradient(to left, transparent, rgba(23, 23, 23, 0.8))'
                            }} />
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </foreignObject>
              </g>
            )
          })}
        </svg>

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
    </div>
  )
}
