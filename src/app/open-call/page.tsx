"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { PageHeader, Input } from "../components/ui"
import { ContentType } from "../types"
import { Search, SlidersHorizontal, Clock } from "lucide-react"
import Link from "next/link"

interface OpenCallData {
  id: string
  title: string
  slug: string
  description: string
  deadline?: string
  heroImage?: string
  createdAt: string
}

export default function OpenCallsPage() {
  const [openCalls, setOpenCalls] = useState<OpenCallData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [contentTypeFilter, setContentTypeFilter] = useState<ContentType | "All">("All")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Fetch open calls from backend
  useEffect(() => {
    const fetchOpenCalls = async () => {
      try {
        const response = await fetch('/api/open-calls')
        if (response.ok) {
          const data = await response.json()
          setOpenCalls(data.openCalls || [])
        }
      } catch (error) {
        console.error('Error fetching open calls:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpenCalls()
  }, [])

  // Content type buttons
  const contentTypeButtons: (ContentType | "All")[] = ["All", "Article", "Video", "Audio", "Slide"]

  // Filter and sort open calls
  const filteredCalls = useMemo(() => {
    let filtered = openCalls

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(call =>
        call.title.toLowerCase().includes(query) ||
        call.description?.toLowerCase().includes(query)
      )
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
    })

    return sorted
  }, [openCalls, searchQuery, sortBy])

  // Calculate days remaining
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  return (
    <main className="bg-black relative min-h-screen">
      <Header />

      {/* Honeycomb Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="hexagon-bg w-full h-full"></div>
      </div>

      <div className="relative z-10">
        {/* Page Header */}
        <PageHeader
          title="Open Call"
          description="Lorem ipsum dolor sit amet adipiscing elit suscipit aliquam et tellus vel sapien porttitor purus."
          primaryAction={{
            label: "Contribute",
            onClick: () => console.log("Contribute clicked")
          }}
        >
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <Input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leadingIcon={<Search className="w-5 h-5" />}
                className="w-full"
              />
            </div>

            {/* Content Type Filters */}
            <div className="flex flex-wrap gap-3">
              {contentTypeButtons.map((type) => (
                <button
                  key={type}
                  onClick={() => setContentTypeFilter(type)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    contentTypeFilter === type
                      ? "bg-[#C9A961] text-black border-2 border-[#C9A961]"
                      : "bg-transparent text-gray-400 border-2 border-white/10 hover:border-[#C9A961]/50"
                  }`}
                >
                  {type === "All" ? "Show all" : `${type}s`}
                </button>
              ))}
            </div>

            {/* Sort and Filters */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] border-2 border-white/10 rounded-lg text-gray-400 hover:border-[#C9A961]/50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Sort by: Newest first</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] border-2 border-white/10 rounded-lg text-gray-400 hover:border-[#C9A961]/50 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>
        </PageHeader>

        {/* Open Calls Grid */}
        <section className="pb-20 pt-12 px-4">
          <div className="container mx-auto max-w-7xl">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredCalls.map((openCall) => {
                const daysRemaining = openCall.deadline ? getDaysRemaining(openCall.deadline) : null

                return (
                  <Link href={`/open-call/${openCall.slug}`} key={openCall.id} className="w-full max-w-[361px]">
                    <div className="open-call-card-wrapper group relative">
                      {/* SVG Hexagon Background */}
                      <svg
                        className="hexagon-svg w-full h-auto"
                        viewBox="0 0 361 420"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id={`paint0_linear_${openCall.id}`}
                            x1="180.5"
                            y1="0"
                            x2="180.5"
                            y2="420"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#444444" />
                            <stop offset="0.85" stopColor="#333333" stopOpacity="0" />
                          </linearGradient>
                          <clipPath id={`imageClip_${openCall.id}`}>
                            <path
                              d="M173.509 27.3965C177.923 25.252 183.077 25.252 187.491 27.3965L241.491 53.6297C247.002 56.3067 250.5 61.8951 250.5 68.0214V129.979C250.5 136.105 247.002 141.693 241.491 144.37L187.491 170.604C183.077 172.748 177.923 172.748 173.509 170.604L119.509 144.37C113.998 141.693 110.5 136.105 110.5 129.979V68.0214C110.5 61.8951 113.998 56.3067 119.509 53.6297L173.509 27.3965Z"
                            />
                          </clipPath>
                          <filter id={`shadow_${openCall.id}`} x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.4" />
                          </filter>
                        </defs>

                        {/* Outer hexagon */}
                        <path
                          d="M170.032 5.07434C176.643 1.86976 184.357 1.86976 190.968 5.07434L346.968 80.6918C355.244 84.7033 360.5 93.0914 360.5 102.288V317.712C360.5 326.909 355.244 335.297 346.968 339.308L190.968 414.926C184.357 418.13 176.643 418.13 170.032 414.926L14.0316 339.308C5.75566 335.297 0.5 326.909 0.5 317.712V102.288C0.5 93.0915 5.75566 84.7033 14.0316 80.6918L170.032 5.07434Z"
                          fill="transparent"
                          stroke={`url(#paint0_linear_${openCall.id})`}
                          strokeWidth="1"
                          className="transition-all duration-300"
                        />

                        {/* Inner hexagon with image */}
                        <g filter={`url(#shadow_${openCall.id})`}>
                          <path
                            d="M173.509 27.3965C177.923 25.252 183.077 25.252 187.491 27.3965L241.491 53.6297C247.002 56.3067 250.5 61.8951 250.5 68.0214V129.979C250.5 136.105 247.002 141.693 241.491 144.37L187.491 170.604C183.077 172.748 177.923 172.748 173.509 170.604L119.509 144.37C113.998 141.693 110.5 136.105 110.5 129.979V68.0214C110.5 61.8951 113.998 56.3067 119.509 53.6297L173.509 27.3965Z"
                            fill="#2a2a2a"
                          />
                          {openCall.heroImage && (
                            <image
                              href={openCall.heroImage}
                              x="110.5"
                              y="27"
                              width="140"
                              height="144"
                              preserveAspectRatio="xMidYMid slice"
                              clipPath={`url(#imageClip_${openCall.id})`}
                              className="grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          )}
                          <path
                            d="M173.509 27.3965C177.923 25.252 183.077 25.252 187.491 27.3965L241.491 53.6297C247.002 56.3067 250.5 61.8951 250.5 68.0214V129.979C250.5 136.105 247.002 141.693 241.491 144.37L187.491 170.604C183.077 172.748 177.923 172.748 173.509 170.604L119.509 144.37C113.998 141.693 110.5 136.105 110.5 129.979V68.0214C110.5 61.8951 113.998 56.3067 119.509 53.6297L173.509 27.3965Z"
                            fill="none"
                            stroke="#444"
                            strokeWidth="1"
                          />
                        </g>

                        {/* Top highlight */}
                        <path
                          d="M169.255 12.6885C176.675 9.10385 185.325 9.10384 192.745 12.6885L329.001 78.5163C333.892 80.8793 337 85.8325 337 91.2646L189.266 19.8916C184.044 17.369 177.956 17.369 172.734 19.8916L25 91.2646C25 85.8325 28.108 80.8793 32.9992 78.5163L169.255 12.6885Z"
                          fill="#5C5C5C"
                          opacity="0.2"
                        />
                      </svg>

                      {/* Card Content Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center px-8 pt-[48%] pb-8">
                        {/* Title */}
                        <h2 className="text-center text-lg font-semibold text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#C9A96E] transition-colors">
                          {openCall.title}
                        </h2>

                        {/* Creator & Timeline */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                          {/* Creator */}
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#DBC99E] text-[#332217] font-bold text-[8px]">
                              C
                            </div>
                            <span className="text-[#C9A96E] text-xs">Creator</span>
                          </div>

                          {/* Timeline */}
                          {daysRemaining !== null && (
                            <div className="flex items-center gap-1 text-[#A3A3A3]">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">Timeline: {daysRemaining} days</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-center text-[#A3A3A3] text-sm leading-relaxed max-w-[260px] line-clamp-3 mb-4">
                          {openCall.description.length > 100
                            ? openCall.description.substring(0, 100) + "..."
                            : openCall.description}
                        </p>

                        {/* Join Button */}
                        <button className="px-4 py-2 bg-[#C9A96E] text-[#332217] font-medium text-sm rounded-md hover:bg-[#D4B978] transition-colors shadow-[inset_0px_1px_0px_rgba(255,255,255,0.4)] group-hover:scale-105 transform transition-transform duration-300">
                          Join now!
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              })}

              {filteredCalls.length === 0 && !loading && (
                <div className="text-center py-20 col-span-full">
                  <h3 className="text-xl text-gray-400 mb-2">No open calls found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
            )}
          </div>
        </section>
      </div>

      <Footer />

      <style jsx>{`
        .hexagon-bg {
          background-image:
            linear-gradient(30deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%),
            linear-gradient(150deg, transparent 48%, rgba(255,255,255,0.05) 49%, rgba(255,255,255,0.05) 51%, transparent 52%);
          background-size: 100px 173px;
        }

        .open-call-card-wrapper {
          transition: transform 0.2s ease;
          position: relative;
        }

        .open-call-card-wrapper:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </main>
  )
}
