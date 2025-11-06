'use client'

import { Facebook, Twitter, Youtube, Instagram, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-900 px-4 md:px-10 py-8 md:py-10">
      <div className="flex flex-col gap-6">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Brand column */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="h-6 w-12">
              <svg viewBox="0 0 49 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12L12 0L24 12L12 24L0 12Z" fill="#5C5C5C" />
                <path d="M25 12L37 0L49 12L37 24L25 12Z" fill="#5C5C5C" opacity="0.6" />
              </svg>
            </div>
            <p className="text-sm leading-5 tracking-tight max-w-xs">
              <span className="font-medium text-white">Trace of the tide</span>{' '}
              <span className="text-neutral-400">
                Preserving our collective memory through stories, testimonies, and cultural artifacts.
              </span>
            </p>
            <div className="flex gap-3">
              <button className="p-1 hover:bg-neutral-800 rounded-md transition-colors">
                <Facebook className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-1 hover:bg-neutral-800 rounded-md transition-colors">
                <Twitter className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-1 hover:bg-neutral-800 rounded-md transition-colors">
                <Youtube className="w-4 h-4 text-neutral-400" />
              </button>
              <button className="p-1 hover:bg-neutral-800 rounded-md transition-colors">
                <Instagram className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Palestine column */}
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-xs font-medium text-neutral-400">
              Palestine (Architecture of stories)
            </h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <p className="text-sm leading-5">
                  <span className="text-white">🪨 Stone </span>
                  <span className="text-xs text-neutral-400">Witness of life</span>
                </p>
              </a>
              <a href="#" className="hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <p className="text-sm leading-5">
                  <span className="text-white">🧂 Salt </span>
                  <span className="text-xs text-white">Trace of time</span>
                </p>
              </a>
              <a href="#" className="hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <p className="text-sm leading-5">
                  <span className="text-white">🗺️ Compass </span>
                  <span className="text-xs text-white">Trace of place</span>
                </p>
              </a>
            </div>
          </div>

          {/* Fields column */}
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-xs font-medium text-neutral-400">
              Fields (Mosaic of Baʿli trails)
            </h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <p className="text-sm leading-5">
                  <span className="text-white">⚓ Harbour trails </span>
                  <span className="text-xs text-neutral-400">Mujaawarah with Culture</span>
                </p>
              </a>
              <a href="#" className="hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <p className="text-sm leading-5">
                  <span className="text-white">🌿 Courtyard trails </span>
                  <span className="text-xs text-white">Mujaawarah with Knowledge</span>
                </p>
              </a>
              <a href="#" className="hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <p className="text-sm leading-5">
                  <span className="text-white">🌕 Hill trails </span>
                  <span className="text-xs text-white">Mujaawarah with Arts</span>
                </p>
              </a>
            </div>
          </div>

          {/* Contact column */}
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-xs font-medium text-neutral-400">Contact</h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:director@traceofthetides.org"
                className="flex items-center gap-2 hover:bg-neutral-800 rounded px-0 py-1 transition-colors"
              >
                <Mail className="w-5 h-5 text-white" />
                <span className="text-sm text-white">director@traceofthetides.org</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:bg-neutral-800 rounded px-0 py-1 transition-colors">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-sm text-white">Everywhere</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-800" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 text-center md:text-left">
            © 2025 Trace of the Tides. All rights reserved.
          </p>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
            <a href="#" className="text-xs text-white hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-white hidden md:inline">·</span>
            <a href="#" className="text-xs text-white hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
            <span className="text-white hidden md:inline">·</span>
            <a href="#" className="text-xs text-white hover:text-neutral-300 transition-colors">
              GDPR
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
