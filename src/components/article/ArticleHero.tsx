'use client'

import { Breadcrumbs } from './Breadcrumbs'
import { VideoPlayer } from './VideoPlayer'
import { AudioPlayer } from './AudioPlayer'
import { ImageGallery } from './ImageGallery'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface ArticleHeroProps {
  imageUrl?: string
  galleryImages?: string[]
  videoUrl?: string
  audioUrl?: string
  audioTitle?: string
  audioDuration?: string
  breadcrumbs: BreadcrumbItem[]
}

export function ArticleHero({ imageUrl, galleryImages, videoUrl, audioUrl, audioTitle, audioDuration, breadcrumbs }: ArticleHeroProps) {
  // Audio article layout (shorter, different structure)
  if (audioUrl) {
    return (
      <div className="relative w-full">
        {/* Background with gradient */}
        <div className="absolute inset-0 h-[432px] bg-gradient-to-b from-neutral-900 to-transparent rounded-2xl" />

        {/* Breadcrumbs */}
        <div className="relative z-10 mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Audio Player */}
        <div className="relative z-10">
          <AudioPlayer
            audioUrl={audioUrl}
            coverImage={imageUrl}
            title={audioTitle || 'Audio Title'}
            duration={audioDuration}
          />
        </div>
      </div>
    )
  }

  // Gallery layout
  if (galleryImages && galleryImages.length > 0) {
    return (
      <div className="relative w-full">
        {/* Breadcrumbs */}
        <div className="absolute top-8 left-8 z-10">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Image Gallery */}
        <ImageGallery images={galleryImages} />
      </div>
    )
  }

  // Video or Image article layout (full height)
  return (
    <div className="relative w-full h-[571px] rounded-2xl overflow-hidden">
      {videoUrl ? (
        /* Video Player */
        <VideoPlayer videoUrl={videoUrl} posterUrl={imageUrl} className="absolute inset-0" />
      ) : (
        <>
          {/* Background Image */}
          <img
            src={imageUrl}
            alt="Article hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </>
      )}

      {/* Breadcrumbs */}
      <div className="absolute top-8 left-8 z-10">
        <Breadcrumbs items={breadcrumbs} />
      </div>
    </div>
  )
}
