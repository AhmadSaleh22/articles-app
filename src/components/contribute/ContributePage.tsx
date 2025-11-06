'use client'

import { PenTool } from 'lucide-react'
import { Navbar } from '@/components/homepage/Navbar'
import { ContributeForm } from './ContributeForm'

export function ContributePage() {
  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Navbar */}
      <Navbar />

      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[213px] bg-gradient-to-b from-neutral-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative pt-32 pb-16 px-4">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center">
              <PenTool className="w-6 h-6 text-neutral-400" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-xl font-medium text-white mb-4">
            Contribute to Trace of the Tides
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla vel consequat arcu nulla velarcu amet vestibulum nibh.
          </p>
        </div>

        {/* Form */}
        <ContributeForm />
      </div>
    </div>
  )
}
