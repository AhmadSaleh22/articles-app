'use client'

import { ContentCard } from './ContentCard'
import { CardFiller } from './CardFiller'
import { Layers } from 'lucide-react'

// Sample data - you can replace this with actual data from your API
const cardsData = [
  {
    id: 1,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 2,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 3,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 4,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 5,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 6,
    title: 'Open Call',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 7,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 8,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 9,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 10,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 11,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
  {
    id: 12,
    title: 'Insert card title here',
    author: 'Author',
    date: 'Date',
    description: 'Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus.',
  },
]

export function CardGrid() {
  return (
    <section className="w-full bg-neutral-900 py-10 md:py-20">
      {/* Honeycomb grid layout */}
      <div className="container mx-auto px-4">
        {/* Desktop: Honeycomb layout with tight spacing */}
        <div className="hidden lg:block max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center" style={{ margin: '-67px -2px' }}>
            {cardsData.map((card, index) => {
              const rowIndex = Math.floor(index / 4)
              const colIndex = index % 4
              const isOffsetRow = rowIndex % 2 === 1

              return (
                <div
                  key={card.id}
                  className="relative"
                  style={{
                    marginLeft: colIndex === 0 && isOffsetRow ? '136px' : '-2px',
                    marginTop: '67px',
                    marginRight: '-2px',
                  }}
                >
                  {/* The card */}
                  <ContentCard
                    title={card.title}
                    author={card.author}
                    date={card.date}
                    description={card.description}
                    imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80"
                    icon={<Layers className="w-6 h-6 text-white" />}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Tablet: 2-3 columns */}
        <div className="hidden md:grid lg:hidden grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
          {cardsData.map((card) => (
            <ContentCard
              key={card.id}
              title={card.title}
              author={card.author}
              date={card.date}
              description={card.description}
              imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80"
              icon={<Layers className="w-6 h-6 text-white" />}
            />
          ))}
        </div>

        {/* Mobile: 1 column */}
        <div className="md:hidden flex flex-col gap-8 items-center">
          {cardsData.map((card) => (
            <ContentCard
              key={card.id}
              title={card.title}
              author={card.author}
              date={card.date}
              description={card.description}
              imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&q=80"
              icon={<Layers className="w-6 h-6 text-white" />}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
