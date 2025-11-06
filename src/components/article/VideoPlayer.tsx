'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Settings, Subtitles, Volume2, Maximize } from 'lucide-react'

interface VideoPlayerProps {
  videoUrl: string
  posterUrl?: string
  className?: string
}

export function VideoPlayer({ videoUrl, posterUrl, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={`relative w-full h-full group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-2xl"
        poster={posterUrl}
        src={videoUrl}
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 transition-opacity ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Play Button (Bottom Left) */}
        <button
          onClick={togglePlay}
          className="absolute bottom-6 left-6 w-14 h-14 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" fill="white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-6 left-[82px] right-[168px]">
          <div
            className="relative h-2 bg-neutral-700 rounded-full cursor-pointer hover:h-3 transition-all"
            onClick={handleProgressClick}
          >
            {/* Downloaded/Buffered Line */}
            <div className="absolute inset-0 w-[71%] bg-neutral-600 rounded-full" />

            {/* Played Line */}
            <div
              className="absolute inset-0 bg-[#C9A96E] rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Time Tooltip */}
            {showControls && (
              <div
                className="absolute -top-8 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded"
                style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%)' }}
              >
                {formatTime(currentTime)}
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-black/80" />
              </div>
            )}
          </div>
        </div>

        {/* Video Controls (Bottom Right) */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
          <button className="w-6 h-6 text-white hover:text-[#C9A96E] transition-colors">
            <Settings className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="w-6 h-6 text-white hover:text-[#C9A96E] transition-colors">
            <Subtitles className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="w-6 h-6 text-white hover:text-[#C9A96E] transition-colors">
            <Volume2 className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <button className="w-6 h-6 text-white hover:text-[#C9A96E] transition-colors">
            <Maximize className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
