"use client"

import { HexagonCard } from "./hexagon-card"

interface GridCard {
  title: string
  image: string | null
  type: string
  href?: string
  articleCount?: number
}

interface HexagonalGridProps {
  cards: GridCard[]
  className?: string
}

export function HexagonalGrid({ cards, className = "" }: HexagonalGridProps) {
  return (
    <section className={`relative py-20 px-4 overflow-hidden ${className}`}>
      <div className="container mx-auto max-w-[1400px]">
        <div className="hexagon-grid">
          {cards.map((card, index) => {
            const row = Math.floor(index / 4)
            const col = index % 2
            const isOddRow = row % 2 === 1

            return (
              <div
                key={index}
                className="hexagon-item"
                style={{
                  gridRow: row + 1,
                  gridColumn: col + 1,
                  transform: isOddRow ? "translateX(50%)" : "translateX(0)",
                }}
              >
                <HexagonCard {...card} />
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .hexagon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }

        .hexagon-item {
          position: relative;
          margin-bottom: -20%;
          padding: 0 0.5%;
        }

        @media (max-width: 1024px) {
          .hexagon-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .hexagon-item {
            margin-bottom: -18%;
          }
        }

        @media (max-width: 768px) {
          .hexagon-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .hexagon-item {
            transform: none !important;
            margin-bottom: 0;
            padding: 0;
          }
        }

        @media (max-width: 640px) {
          .hexagon-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
