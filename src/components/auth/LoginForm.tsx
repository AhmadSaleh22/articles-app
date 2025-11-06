'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string; rememberMe: boolean }) => void
  loading?: boolean
  error?: string
}

export function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
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
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

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
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-neutral-400">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#C9A96E] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-[#C9A96E] focus:ring-[#C9A96E] focus:ring-offset-0"
          />
          <label htmlFor="rememberMe" className="text-sm text-neutral-400">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-[#C9A96E] text-[#171717] rounded-lg font-medium hover:bg-[#B89960] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-sm text-neutral-400">Don't have an account? </span>
          <Link
            href="/auth/signup"
            className="text-sm text-[#C9A96E] hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
