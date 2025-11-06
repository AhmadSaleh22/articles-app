'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  className?: string
}

export function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (images.length === 0) return null

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div className="relative w-full h-[483px] rounded-2xl overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-[-64px] top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors border border-neutral-700"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-[-64px] top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors border border-neutral-700"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
