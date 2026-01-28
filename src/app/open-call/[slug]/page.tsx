"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Calendar, Users, FileText, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface OpenCallDetail {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  requirements?: string
  heroImage?: string
  deadline?: string
  status: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export default function OpenCallDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [openCall, setOpenCall] = useState<OpenCallDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOpenCall = async () => {
      try {
        const response = await fetch(`/api/open-calls/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setOpenCall(data)
        } else if (response.status === 404) {
          setError("Open call not found")
        } else {
          setError("Failed to load open call")
        }
      } catch (err) {
        console.error("Error fetching open call:", err)
        setError("An error occurred while loading the open call")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchOpenCall()
    }
  }, [slug])

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  if (loading) {
    return (
      <main className="bg-black min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-[#C9A961] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !openCall) {
    return (
      <main className="bg-black min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl text-white mb-4">{error || "Open Call Not Found"}</h1>
          <Link href="/open-call" className="text-[#C9A961] hover:underline">
            Back to Open Calls
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const daysRemaining = openCall.deadline ? getDaysRemaining(openCall.deadline) : null
  const isActive = openCall.status === "PUBLISHED" && (!openCall.deadline || new Date(openCall.deadline) > new Date())
  const contentTypes = ["Article", "Document", "Image", "Audio", "Video"]

  return (
    <main className="bg-black">
      <Header />

      {/* Hero Section with Cover Image */}
      <section className="relative h-96 overflow-hidden">
        {openCall.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={openCall.heroImage}
              alt={openCall.title}
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          </div>
        )}

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Open Calls</span>
          </button>

          {/* Status Badge */}
          <div className="mb-4">
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full border ${
                isActive
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              }`}
            >
              {isActive ? "Active" : "Closed"}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {openCall.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {openCall.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">About This Call</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>{openCall.description}</p>
                  <p>
                    We are collecting stories, testimonies, documents, and materials that help preserve
                    the collective memory of Palestinian communities. Your contribution matters in building
                    a comprehensive archive for future generations.
                  </p>
                  <p>
                    This is a collaborative effort to document history, culture, and lived experiences.
                    Join us in creating a living archive that honors the past and informs the future.
                  </p>
                </div>
              </div>

              {/* What We're Looking For */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">What We&apos;re Looking For</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {contentTypes.map((type) => (
                      <span
                        key={type}
                        className="px-4 py-2 bg-[#C9A961]/10 text-[#C9A961] rounded-lg border border-[#C9A961]/30 text-sm font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 mt-4">
                    We welcome all forms of documentation including written accounts, photographs,
                    video recordings, audio testimonies, and historical documents.
                  </p>
                </div>
              </div>

              {/* How to Participate */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">How to Participate</h2>
                <ol className="space-y-4 text-gray-300">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-black rounded-full flex items-center justify-center font-bold">
                      1
                    </span>
                    <div>
                      <strong className="text-white">Fill out the participation form</strong>
                      <p className="text-sm text-gray-400 mt-1">
                        Provide your information and tell us about your contribution
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-black rounded-full flex items-center justify-center font-bold">
                      2
                    </span>
                    <div>
                      <strong className="text-white">Upload your materials</strong>
                      <p className="text-sm text-gray-400 mt-1">
                        Share your documents, photos, videos, or audio recordings
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-black rounded-full flex items-center justify-center font-bold">
                      3
                    </span>
                    <div>
                      <strong className="text-white">Submit your contribution</strong>
                      <p className="text-sm text-gray-400 mt-1">
                        Our team will review and include it in the archive
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-[#C9A961]" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-semibold">{isActive ? "Active" : "Closed"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FileText className="w-5 h-5 text-[#C9A961]" />
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-semibold">
                        {new Date(openCall.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {openCall.deadline && (
                    <>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-[#C9A961]" />
                        <div>
                          <p className="text-sm text-gray-500">Deadline</p>
                          <p className="font-semibold">
                            {new Date(openCall.deadline).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      {daysRemaining !== null && daysRemaining > 0 && (
                        <div className="flex items-center gap-3 text-gray-300">
                          <Clock className="w-5 h-5 text-[#C9A961]" />
                          <div>
                            <p className="text-sm text-gray-500">Time Remaining</p>
                            <p className="font-semibold">{daysRemaining} days</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Organizer Info */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Organized By</h3>
                <p className="text-gray-300">Trace of the Tides Archive</p>
                <p className="text-sm text-gray-500 mt-2">
                  Category: Historical Documentation
                </p>
              </div>

              {/* CTA Button */}
              <Link
                href={`/open-call/${openCall.slug}/join`}
                className="block w-full bg-[#C9A961] text-black text-center font-bold py-4 rounded-xl hover:bg-[#B89851] transition-colors shadow-lg"
              >
                Join This Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
