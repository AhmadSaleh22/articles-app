"use client"

import { useState, useEffect } from "react"
import { Header } from "./components/header"
import { HeroSection } from "./components/hero-section"
import { ShareSection } from "./components/share-section"
import { Footer } from "./components/footer"
import HoneycombGridSVG from "@/components/HoneycombGridSVG"

interface Content {
  id: string
  title: string
  slug: string
  type: string
  heroImage: string | null
  createdAt: string
  articleCount?: number
  author: {
    name: string
  }
}

export default function HomePage() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch("/api/contents")
        if (!response.ok) {
          throw new Error("Failed to fetch contents")
        }
        const data = await response.json()
        setContents(data.contents)
      } catch (err) {
        console.error("Error fetching contents:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [])

  const getPath = (type: string, slug: string) => {
    switch (type) {
      case "video":
        return `/video/${slug}`
      case "audio":
        return `/audio/${slug}`
      case "gallery":
        return `/gallery/${slug}`
      case "thread":
        return `/threads/${slug}`
      case "collection":
        return `/collection/${slug}`
      case "open_call":
        return `/open-call/${slug}`
      case "trip":
        return `/trip/${slug}`
      default:
        return `/article/${slug}`
    }
  }

  const getHeroImage = (content: Content) => {
    if (content.type === "gallery" && content.heroImage) {
      try {
        const parsed = JSON.parse(content.heroImage)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].url
        }
      } catch {
        return null
      }
    }
    return content.heroImage
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Prepare content data for HoneycombGrid
  const honeycombContents = contents.map((content) => ({
    id: content.id,
    title: content.title,
    author: content.author.name,
    date: formatDate(content.createdAt),
    type: content.type,
    image: getHeroImage(content),
    href: getPath(content.type, content.slug),
    articleCount: content.articleCount,
  }))

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative z-10">
        <HeroSection />
      </section>

      {/* Hexagonal Card Grid - hero overlaps these */}
      <section className="-mt-[200px] pb-20 relative z-0">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <HoneycombGridSVG contents={honeycombContents} />
        )}
      </section>

      <ShareSection />
      <Footer />
    </main>
  )
}
