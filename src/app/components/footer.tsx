"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from "lucide-react"

interface FooterLinkProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

interface FooterSectionProps {
  title: string
  children: React.ReactNode
}

interface FooterItemProps {
  icon?: React.ReactNode
  primaryText: string
  secondaryText?: string
  href?: string
}

function FooterLink({ children, href, onClick }: FooterLinkProps): React.JSX.Element {
  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:")
    return (
      <a
        href={href}
        className="text-white text-xs font-normal leading-none hover:text-gray-300 transition-colors"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className="text-white text-xs font-normal leading-none hover:text-gray-300 transition-colors text-left"
      type="button"
    >
      {children}
    </button>
  )
}

function FooterSection({ title, children }: FooterSectionProps): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-4">
      <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
        {title}
      </h3>
      <div className="w-full flex flex-col justify-start items-start gap-3">
        {children}
      </div>
    </div>
  )
}

function FooterItem({ icon, primaryText, secondaryText, href }: FooterItemProps): React.JSX.Element {
  return (
    <div className="flex items-start gap-2">
      {icon && (
        <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
          {icon}
        </div>
      )}
      <div className="flex flex-col justify-start items-start gap-1">
        <FooterLink href={href}>{primaryText}</FooterLink>
        {secondaryText && (
          <span className="text-gray-500 text-xs font-normal leading-none">
            {secondaryText}
          </span>
        )}
      </div>
    </div>
  )
}

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }): React.JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
      aria-label={label}
    >
      <div className="w-4 h-4 text-gray-400 hover:text-white transition-colors">
        {icon}
      </div>
    </a>
  )
}

export function Footer(): React.JSX.Element {
  return (
    <footer className="w-full p-10 bg-[#0A0A0A] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="block">
              <Image src="/Brand.svg" alt="Trace of The Tide" width={120} height={24} className="h-6 w-auto" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              <span className="text-white font-medium">Trace of the tide </span>
              Preserving our collective memory through stories, testimonies, and cultural artifacts.
            </p>
            <div className="flex items-center gap-1">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} href="https://facebook.com" label="Facebook" />
              <SocialIcon icon={<Twitter className="w-4 h-4" />} href="https://twitter.com" label="Twitter" />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} href="https://instagram.com" label="Instagram" />
              <SocialIcon icon={<Youtube className="w-4 h-4" />} href="https://youtube.com" label="YouTube" />
            </div>
          </div>

          {/* Palestine Section */}
          <FooterSection title="Palestine (Architecture of stories)">
            <FooterItem primaryText="🪨 Stone" secondaryText="Witness of life" />
            <FooterItem primaryText="🧂 Salt" secondaryText="Trace of time" />
            <FooterItem primaryText="🗺️ Compass" secondaryText="Trace of place" />
          </FooterSection>

          {/* Fields Section */}
          <FooterSection title="Fields (Mosaic of Baʿli trails)">
            <FooterItem primaryText="⚓ Harbour trails" secondaryText="Mujaawarah with Culture" />
            <FooterItem primaryText="🌿 Courtyard trails" secondaryText="Mujaawarah with Knowledge" />
            <FooterItem primaryText="🌕 Hill trails" secondaryText="Mujaawarah with Arts" />
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Contact">
            <FooterItem
              icon={<Mail className="w-4 h-4 text-[#C9A96E]" />}
              primaryText="director@traceofthetides.org"
              href="mailto:director@traceofthetides.org"
            />
            <FooterItem
              icon={<MapPin className="w-4 h-4 text-[#C9A96E]" />}
              primaryText="Everywhere"
            />
          </FooterSection>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-800" />

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-normal">
            © 2025 Trace of the Tides. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <span className="text-neutral-600">·</span>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <span className="text-neutral-600">·</span>
            <FooterLink href="/gdpr">GDPR</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
