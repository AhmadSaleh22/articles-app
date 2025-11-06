'use client'

import { useState } from 'react'
import { Plus, Link as LinkIcon } from 'lucide-react'

interface JoinFormProps {
  onSubmit?: (data: FormData) => void
}

export function JoinForm({ onSubmit }: JoinFormProps) {
  const [additionalLinks, setAdditionalLinks] = useState<string[]>([])
  const [showAddLink, setShowAddLink] = useState(false)

  const handleAddLink = () => {
    setShowAddLink(true)
  }

  const handleSaveLink = (link: string) => {
    if (link) {
      setAdditionalLinks([...additionalLinks, link])
      setShowAddLink(false)
    }
  }

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A96E] rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A96E] rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A96E] rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A96E] rounded-br-2xl" />

      <form className="p-10 space-y-6">
        {/* First Name / Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              First name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Last name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="Placeholder..."
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
          <p className="mt-2 text-xs text-neutral-500">
            Don't forget to write the phone number with your country code
          </p>
        </div>

        {/* Experience Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Experience field
          </label>
          <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors">
            <option value="">Select or write your experience field</option>
            <option value="journalist">Journalist</option>
            <option value="researcher">Researcher</option>
            <option value="historian">Historian</option>
            <option value="academic">Academic</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Trace (Optional) */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Trace (Optional)
          </label>
          <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors">
            <option value="">Select [TTT] project(s) you want to join</option>
            <option value="trace1">Trace Project 1</option>
            <option value="trace2">Trace Project 2</option>
            <option value="trace3">Trace Project 3</option>
          </select>
          <p className="mt-2 text-xs text-neutral-500">
            Select as many project as you wish
          </p>
        </div>

        {/* Tell us about yourself */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Tell us about yourself
          </label>
          <textarea
            rows={4}
            placeholder="Describe yourself, experience, or your projects, and why we should accept you in the collective team..."
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
          />
        </div>

        {/* Share your social media accounts (Optional) */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-4">
            Share your social media accounts (Optional)
          </label>
          <div className="space-y-3">
            {/* Facebook */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg">
              <LinkIcon className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-400">Facebook</span>
              <input
                type="url"
                className="flex-1 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* X / Twitter */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg">
              <LinkIcon className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-400">X / Twitter</span>
              <input
                type="url"
                className="flex-1 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg">
              <LinkIcon className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-400">Instagram</span>
              <input
                type="url"
                className="flex-1 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg">
              <LinkIcon className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-400">LinkedIn</span>
              <input
                type="url"
                className="flex-1 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* Add any other links button */}
            {!showAddLink && (
              <button
                type="button"
                onClick={handleAddLink}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white hover:border-[#C9A96E] transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="text-sm">Add any other links</span>
              </button>
            )}

            {/* Add new link input */}
            {showAddLink && (
              <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg">
                <LinkIcon className="w-4 h-4 text-neutral-500" />
                <input
                  type="url"
                  placeholder="Add new link"
                  className="flex-1 bg-transparent border-none text-white placeholder-neutral-500 focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSaveLink((e.target as HTMLInputElement).value)
                    }
                  }}
                />
                <button
                  type="button"
                  className="text-[#C9A96E] hover:text-[#B89960]"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Additional links */}
            {additionalLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg"
              >
                <LinkIcon className="w-4 h-4 text-neutral-500" />
                <span className="flex-1 text-sm text-white truncate">{link}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-[#C9A96E] focus:ring-[#C9A96E] focus:ring-offset-0"
          />
          <label htmlFor="terms" className="text-sm text-neutral-400">
            I agree to the{' '}
            <a href="#" className="text-[#C9A96E] hover:underline">
              terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#C9A96E] hover:underline">
              privacy policy
            </a>
            .
          </label>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors"
        >
          Continue
        </button>

        {/* Go Back Link */}
        <div className="text-center">
          <span className="text-sm text-neutral-400">Go back to </span>
          <a
            href="/"
            className="text-sm text-[#C9A96E] hover:underline"
          >
            Home page
          </a>
        </div>
      </form>
    </div>
  )
}
