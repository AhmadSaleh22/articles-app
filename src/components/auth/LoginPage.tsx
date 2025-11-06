'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    setError(null)
    setIsLoading(true)

    try {
      // Use redirect: false to manually handle redirect
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      } else if (result?.ok) {
        // Successful login - force redirect to profile
        window.location.href = '/profile'
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred during login')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 relative overflow-hidden">
      {/* Hexagonal Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="84" height="72" patternUnits="userSpaceOnUse">
              <path
                d="M21 0l21 12v24L21 48 0 36V12L21 0zm42 0l21 12v24L63 48 42 36V12L63 0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900 to-black -z-10" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-7 relative">
                <svg
                  viewBox="0 0 57 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M0 14L7 0L14 7V21L7 28L0 21V7Z"
                    fill="#C9A96E"
                  />
                  <path
                    d="M21.5 14L28.5 0L35.5 7V21L28.5 28L21.5 21V7Z"
                    fill="#C9A96E"
                  />
                  <path
                    d="M43 14L50 0L57 7V21L50 28L43 21V7Z"
                    fill="#C9A96E"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-medium text-white mb-4">
              Welcome back!
            </h1>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel
              consequat arcu, vel vestibulum nibh.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm
            onSubmit={handleLogin}
            loading={isLoading}
            error={error || undefined}
          />

          {/* Footer Link */}
          <div className="text-center mt-8">
            <span className="text-sm text-neutral-400">Back to </span>
            <Link
              href="/"
              className="text-sm text-[#C9A96E] hover:underline"
            >
              Home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
