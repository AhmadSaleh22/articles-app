'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl: string
  coverImage?: string
  title: string
  duration?: string
  className?: string
}

export function AudioPlayer({ audioUrl, coverImage, title, duration = '24 min', className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0

  // Generate waveform bars with varying heights
  const waveformBars = Array.from({ length: 272 }, (_, i) => {
    const heights = [32, 40, 40, 32, 88, 32, 32, 72, 32, 72, 32, 88, 88, 56, 88, 88, 40, 56, 32, 40, 40, 88, 88, 88, 40, 72, 72, 88, 32, 32, 56, 32, 32, 40, 40, 32, 88, 88, 32, 40, 88, 40, 72, 32, 56, 32, 32, 88, 88, 32, 88, 88, 40, 32, 40, 56, 88, 88, 40, 72, 72, 32, 88, 72, 72, 88, 32, 72, 56, 40, 56, 40, 88, 32, 88, 40, 88, 88, 40, 88, 40, 40, 88, 88, 32, 88, 88, 88, 32, 56, 56, 32, 72, 72, 72, 88, 88, 88, 56, 72, 40, 72, 56, 88, 32, 56, 88, 72, 32, 32, 32, 32, 56, 40, 88, 88, 40, 32, 88, 32, 32, 32, 88, 88, 72, 32, 40, 88, 88, 40, 88, 88, 40, 40, 88, 32, 88, 32, 32, 88, 32, 32, 32, 72, 88, 88, 32, 88, 56, 40, 88, 56, 88, 32, 88, 32, 32, 72, 40, 88, 88, 40, 88, 88, 40, 40, 88, 32, 88, 88, 32, 88, 32, 88, 32, 32, 72, 40, 88, 88, 32, 88, 56, 40, 88, 32, 32, 88, 40, 88, 40, 56, 88, 88, 32, 40, 40, 32, 40, 72, 40, 72, 40, 40, 72, 88, 32, 72, 88, 88, 88, 72, 56, 32, 72, 88, 32, 40, 56, 40, 32, 72, 40, 32, 32, 40, 56, 88, 56, 88, 56, 88, 32, 40, 88, 72, 56, 32, 72, 40, 32, 88, 72, 72, 72, 56, 32, 40, 56, 40, 88, 40, 32, 56, 40, 32, 32, 32, 40, 56, 88, 88, 88, 88, 88, 88, 32, 88, 72, 88, 88, 88, 88]
    return heights[i % heights.length]
  })

  return (
    <div className={`relative ${className}`}>
      {/* Audio Element */}
      <audio ref={audioRef} src={audioUrl} />

      {/* Container with background */}
      <div className="relative w-full bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-6 px-12 py-20">
          {/* Cover Image with Play Button */}
          <div className="relative shrink-0">
            <div className="w-[264px] h-[264px] rounded-lg overflow-hidden">
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Audio cover"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Play Button Overlay */}
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" fill="white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              )}
            </button>
          </div>

          {/* Waveform Section */}
          <div className="flex-1 relative">
            {/* Title */}
            <h3 className="text-2xl font-medium text-white mb-4 line-clamp-1">{title}</h3>

            {/* Waveform Container */}
            <div className="relative h-[88px] flex items-center gap-[3px] mb-3">
              {waveformBars.map((height, index) => {
                const barProgress = (index / waveformBars.length) * 100
                const isPlayed = barProgress <= progressPercentage

                return (
                  <div
                    key={index}
                    className={`w-[1px] transition-colors ${
                      isPlayed ? 'bg-[#C9A96E]' : 'bg-neutral-700'
                    }`}
                    style={{ height: `${height}px` }}
                  />
                )
              })}

              {/* Time Tooltip */}
              {isPlaying && (
                <div
                  className="absolute -top-8 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded"
                  style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%)' }}
                >
                  {formatTime(currentTime)}
                </div>
              )}
            </div>

            {/* Duration */}
            <p className="text-sm text-neutral-400">Audio time: {duration}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
