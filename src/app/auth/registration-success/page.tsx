'use client'

import { Mail, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-600" size={48} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
              <Mail className="text-white" size={20} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Registration Submitted!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Thank you for registering. We've sent a confirmation email to your inbox.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 text-left">
          <h2 className="font-semibold text-gray-900 mb-2">Next Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Check your email inbox</li>
            <li>Click the verification link in the email</li>
            <li>Set up your password</li>
            <li>Start using your account!</li>
          </ol>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> The verification link will expire in 24 hours.
            If you don't see the email, please check your spam folder.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Go to Login Page
          </Link>
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
