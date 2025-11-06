'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'

interface SubmissionFormProps {
  onSubmit?: (data: FormData) => void
}

export function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E] rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A96E] rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A96E] rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E] rounded-br-2xl" />

      <form className="space-y-6">
        {/* Title */}
        <h2 className="font-['IBM_Plex_Sans'] font-medium text-2xl text-white">
          Submit Your Story
        </h2>

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
            placeholder="Enter your email"
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
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
          />
          <p className="mt-2 text-xs text-neutral-500">
            We'll contact you via this number
          </p>
        </div>

        {/* Experience Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Experience field
          </label>
          <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#C9A96E] transition-colors">
            <option value="">Select your field</option>
            <option value="journalist">Journalist</option>
            <option value="researcher">Researcher</option>
            <option value="historian">Historian</option>
            <option value="academic">Academic</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Tell us about yourself */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Tell us about yourself
          </label>
          <textarea
            rows={4}
            placeholder="Share your story and why you want to contribute..."
            className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
          />
        </div>

        {/* Country / City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Country
            </label>
            <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#C9A96E] transition-colors">
              <option value="">Select country</option>
              <option value="ps">Palestine</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              City
            </label>
            <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#C9A96E] transition-colors">
              <option value="">Select city</option>
              <option value="gaza">Gaza</option>
              <option value="jerusalem">Jerusalem</option>
              <option value="ramallah">Ramallah</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Upload your story
          </label>
          {!uploadedFile ? (
            <label className="block">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
              <div className="border-2 border-dashed border-neutral-700 rounded-lg p-8 text-center cursor-pointer hover:border-[#C9A96E] transition-colors">
                <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
                <p className="text-neutral-400 mb-1">
                  <span className="text-[#C9A96E] font-medium">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-sm text-neutral-500">
                  PDF, DOC, DOCX or TXT (max. 10MB)
                </p>
              </div>
            </label>
          ) : (
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg">
              <span className="text-white text-sm">{uploadedFile.name}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
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
              terms and conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#C9A96E] hover:underline">
              privacy policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors"
        >
          Submit Your Story
        </button>

        {/* Go Back Link */}
        <div className="text-center">
          <a
            href="/"
            className="text-sm text-neutral-400 hover:text-[#C9A96E] transition-colors"
          >
            Go back to Home page
          </a>
        </div>
      </form>
    </div>
  )
}
