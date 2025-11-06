'use client'

import { useState } from 'react'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface SignUpFormProps {
  onSubmit?: (data: { firstName: string; lastName: string; email: string; password: string }) => void
  isLoading?: boolean
}

export function SignUpForm({ onSubmit, isLoading = false }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreedToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md mx-auto">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A96E] rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A96E] rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A96E] rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A96E] rounded-br-2xl" />

      <form onSubmit={handleSubmit} className="p-10 space-y-6">
        {/* First Name / Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              First name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Last name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@domain.com"
              required
              className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (18 characters)"
              required
              minLength={8}
              className="w-full pl-10 pr-12 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
            className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-[#C9A96E] focus:ring-[#C9A96E] focus:ring-offset-0"
          />
          <label htmlFor="terms" className="text-sm text-neutral-400">
            I agree to the{' '}
            <Link href="/terms" className="text-[#C9A96E] hover:underline">
              terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#C9A96E] hover:underline">
              privacy policy
            </Link>
            .
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.agreedToTerms || isLoading}
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating account...' : 'Create a new account'}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-sm text-neutral-400">Already have an account? </span>
          <Link
            href="/auth/login"
            className="text-sm text-[#C9A96E] hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}
