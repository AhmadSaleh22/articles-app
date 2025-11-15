'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Grid3X3, UserPlus, Gift, Pencil } from 'lucide-react'
import HoneycombGridSVG from '@/components/HoneycombGridSVG'

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/contents')
        if (!response.ok) {
          throw new Error('Failed to fetch contents')
        }
        const data = await response.json()
        setContents(data.contents)
      } catch (err) {
        console.error('Error fetching contents:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [])

  const getPath = (type: string, slug: string) => {
    switch (type) {
      case 'video':
        return `/video/${slug}`
      case 'audio':
        return `/audio/${slug}`
      case 'gallery':
        return `/gallery/${slug}`
      case 'thread':
        return `/threads/${slug}`
      case 'collection':
        return `/collection/${slug}`
      case 'open_call':
        return `/open-call/${slug}`
      case 'trip':
        return `/trip/${slug}`
      default:
        return `/article/${slug}`
    }
  }

  const getHeroImage = (content: Content) => {
    if (content.type === 'gallery' && content.heroImage) {
      try {
        const parsed = JSON.parse(content.heroImage)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].url
        }
      } catch (e) {
        return null
      }
    }
    return content.heroImage
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Prepare content data for HoneycombGrid
  // 4 mock cards will create 1 full row (component adds 5th card automatically per row)
  const mockCardsForGrid = Array(4).fill(null).map((_, i) => ({
    id: `grid-mock-${i}`,
    title: '',
    author: '',
    date: '',
    type: 'mock',
    image: null,
    href: '#',
  }))

  const honeycombContents = [
    ...mockCardsForGrid,
    ...contents.map((content) => ({
      id: content.id,
      title: content.title,
      author: content.author.name,
      date: formatDate(content.createdAt),
      type: content.type,
      image: getHeroImage(content),
      href: getPath(content.type, content.slug),
      articleCount: content.articleCount
    }))
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-10">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img src="/Brand.svg" alt="Trace of The Tide" className="h-8" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-end gap-4 flex-1">
              {/* Main Actions */}
              <div className="flex items-center gap-1">
                <Link href="#" className="flex items-center gap-1 px-2 py-1 rounded-md text-[#a3a3a3] hover:bg-neutral-800/50 transition-colors">
                  <Grid3X3 className="w-5 h-5 stroke-[#a3a3a3]" />
                  <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Fields</span>
                </Link>
                <Link href="#" className="flex items-center gap-1 px-2 py-1 rounded-md text-[#a3a3a3] hover:bg-neutral-800/50 transition-colors">
                  <UserPlus className="w-5 h-5 stroke-[#a3a3a3]" />
                  <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Be a neighbor</span>
                </Link>
                <Link href="#" className="flex items-center gap-1 px-2 py-1 rounded-md text-[#a3a3a3] hover:bg-neutral-800/50 transition-colors">
                  <Gift className="w-5 h-5 stroke-[#a3a3a3]" />
                  <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Gift a trace</span>
                </Link>
                <Link href="#" className="flex items-center gap-1 px-2 py-1 rounded-md text-[#a3a3a3] hover:bg-neutral-800/50 transition-colors">
                  <Pencil className="w-5 h-5 stroke-[#a3a3a3]" />
                  <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Trace a story</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-[rgba(255,255,255,0.12)]"></div>

              {/* Language Selector */}
              <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[#a3a3a3] hover:bg-neutral-800/50 transition-colors">
                <span className="text-sm font-normal leading-5 tracking-[-0.07px]">EN</span>
              </button>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href="/cms"
                  className="px-2 py-1 bg-[#333333] text-white rounded-md hover:bg-[#444444] transition-colors text-sm font-normal leading-5 tracking-[-0.07px] text-center relative overflow-hidden"
                  style={{ boxShadow: 'inset 0px 1px 1px 0px rgba(255,255,255,0.08)' }}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-2 py-1 bg-[#C9A96E] text-[#332217] rounded-md hover:bg-[#D4AF37] transition-colors text-sm font-medium leading-5 tracking-[-0.07px] text-center relative overflow-hidden"
                  style={{ boxShadow: 'inset 0px 1px 0px 0px rgba(255,255,255,0.4)' }}
                >
                  Sign up
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-neutral-800 pt-4">
              <Link href="#" className="flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors">
                <Grid3X3 className="w-5 h-5 stroke-[#a3a3a3]" />
                <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Fields</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors">
                <UserPlus className="w-5 h-5 stroke-[#a3a3a3]" />
                <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Be a neighbor</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors">
                <Gift className="w-5 h-5 stroke-[#a3a3a3]" />
                <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Gift a trace</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors">
                <Pencil className="w-5 h-5 stroke-[#a3a3a3]" />
                <span className="text-sm font-normal leading-5 tracking-[-0.07px]">Trace a story</span>
              </Link>
              <div className="w-full h-px bg-[rgba(255,255,255,0.12)]"></div>
              <button className="text-[#a3a3a3] hover:text-white transition-colors text-left text-sm font-normal leading-5 tracking-[-0.07px]">EN</button>
              <div className="flex flex-col gap-2">
                <Link
                  href="/cms"
                  className="px-4 py-2 bg-[#333333] text-white rounded-md hover:bg-[#444444] transition-colors text-sm font-normal leading-5 tracking-[-0.07px] text-center"
                  style={{ boxShadow: 'inset 0px 1px 1px 0px rgba(255,255,255,0.08)' }}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-[#C9A96E] text-[#332217] rounded-md hover:bg-[#D4AF37] transition-colors text-sm font-medium leading-5 tracking-[-0.07px] text-center"
                  style={{ boxShadow: 'inset 0px 1px 0px 0px rgba(255,255,255,0.4)' }}
                >
                  Sign up
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-visible pointer-events-none">
        {/* Background hexagon pattern - decorative mock hexagons */}
        <div className="absolute top-0 left-0 right-0 -z-20 opacity-30" style={{ filter: 'blur(8px)' }}>
          <HoneycombGridSVG
            contents={Array(10).fill(null).map((_, i) => ({
              id: `hero-bg-${i}`,
              title: '',
              author: '',
              date: '',
              type: 'mock',
              image: null,
              href: '#',
            }))}
            hexSize={550}
            gap={1}
          />
        </div>

        {/* Blur gradient overlay - pronounced gradient from top to bottom */}
        <div
          className="absolute top-0 left-0 right-0 h-full pointer-events-none z-0"
          style={{
            backdropFilter: 'blur(12px)',
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.2) 80%, transparent 100%)'
          }}
        />

        <div className="relative z-10 flex flex-col gap-6 items-start pt-40 pb-20 px-6 lg:px-[156px] w-full pointer-events-auto">
          <div className="flex flex-col gap-4 w-full text-white">
            <h1 className="font-['IBM_Plex_Sans',sans-serif] font-medium max-w-[680px]" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.24)' }}>
              <span className="text-[48px] leading-[56px]">Trace </span>
              <span className="text-[40px] leading-[48px] text-neutral-400">The Living Archive</span>
            </h1>
            <p className="font-['Inter',sans-serif] font-normal text-base leading-6 tracking-[-0.16px] max-w-[680px] whitespace-pre-wrap" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.24)' }}>
              We practice knowledge like tending the land: digging, planting, waiting. Culture lives and breathes with us, passed down like stories. Art is an architecture of the senses, built on feeling and instinct. From this rhythm, Trace of the Tide emerges — a community of creation, knowledge, and transformation. A living current between art and thought, culture and creation, the human and more-than-human.
            </p>
          </div>
          <button className="relative flex items-center justify-center bg-[#C9A96E] text-[#332217] rounded-lg px-3 py-2 overflow-hidden hover:bg-[#D4AF37] transition-colors">
            <div className="flex items-center justify-center gap-2 px-1 py-0.5">
              <span className="font-['Inter',sans-serif] font-medium text-sm leading-5 tracking-[-0.07px] text-center">
                Call to Action
              </span>
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4)]" />
          </button>
        </div>
      </section>

      {/* Hexagonal Card Grid - starts behind hero with negative margin */}
      <section className="-mt-[400px] pb-20 px-6 relative z-0">
        <div className="">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <HoneycombGridSVG contents={honeycombContents} hexSize={550} gap={1} />
          )}
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="py-20 px-6 bg-[#171717]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-neutral-800 rounded-full">
            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Share your story</h2>
          <p className="text-neutral-300 mb-8 leading-relaxed">
            Every story shared, from the extraordinary to the everyday, has a place in the digital archive. We want every voice to be heard, by anyone and everyone who is ready to share. Your story matters—start preserving it and history.
          </p>
          <Link
            href="/cms"
            className="inline-block px-8 py-3 bg-[#D4AF37] text-black rounded-lg hover:bg-[#C9A96E] transition-colors font-semibold"
          >
            Contribute Article
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-semibold mb-4">Trace of the title</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Preserving our collective memories, traditions, and history for future generations.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-4">Features (Resources or menu)</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="#" className="hover:text-white transition-colors">DIGITAL ARCHIVE</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">INTERACTIVE MAP</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">ORAL HISTORIES</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">For help/information contact:</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="mailto:Info@Thetitlearchives.org" className="hover:text-white transition-colors flex items-center gap-2">
                    <span>📧</span> Info@Thetitlearchives.org
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> Everywhere
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Follow us</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">YouTube</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-800 text-center text-sm text-neutral-400">
            <p>&copy; 2024 Trace of The Title. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
