'use client'

import { useMemo } from 'react'
import styled from 'styled-components'
import { defineHex, Grid, rectangle, Orientation } from 'honeycomb-grid'

const GridContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const HexagonWrapper = styled.div<{ size: number; left: number; top: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`

const HexagonInner = styled.div`
  width: 100%;
  height: 100%;
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
`

interface HoneycombGridProps {
  items: React.ReactNode[]
  hexSize?: number
  gap?: number
}

export default function HoneycombGrid({ items, hexSize = 280, gap = 10 }: HoneycombGridProps) {
  const { hexPositions, gridWidth, gridHeight } = useMemo(() => {
    // Define a hexagon with the honeycomb-grid library
    const Hex = defineHex({
      dimensions: hexSize,
      orientation: Orientation.POINTY
    })

    // Calculate grid dimensions based on number of items
    const cols = Math.ceil(Math.sqrt(items.length * 1.5))
    const rows = Math.ceil(items.length / cols) + 1

    // Create a rectangular grid
    const grid = new Grid(Hex, rectangle({ width: cols, height: rows }))

    // Get all hexagons and convert to pixel positions
    const hexPositions = [...grid].map(hex => {
      // Convert hex cube coordinates to pixel coordinates
      // For pointy orientation:
      const x = hexSize * (Math.sqrt(3) * hex.q + Math.sqrt(3)/2 * hex.r)
      const y = hexSize * (3/2 * hex.r)
      return { x, y }
    })

    // Calculate container dimensions
    const maxX = Math.max(...hexPositions.map(p => p.x))
    const maxY = Math.max(...hexPositions.map(p => p.y))
    const minX = Math.min(...hexPositions.map(p => p.x))
    const minY = Math.min(...hexPositions.map(p => p.y))

    return {
      hexPositions,
      gridWidth: maxX - minX + hexSize + gap * 2,
      gridHeight: maxY - minY + hexSize + gap * 2
    }
  }, [items.length, hexSize, gap])

  return (
    <GridContainer>
      <div style={{ position: 'relative', width: gridWidth, height: gridHeight }}>
        {items.map((item, index) => {
          if (index >= hexPositions.length) return null

          const position = hexPositions[index]

          return (
            <HexagonWrapper
              key={index}
              size={hexSize}
              left={position.x + gap}
              top={position.y + gap}
            >
              <HexagonInner>{item}</HexagonInner>
            </HexagonWrapper>
          )
        })}
      </div>
    </GridContainer>
  )
}
