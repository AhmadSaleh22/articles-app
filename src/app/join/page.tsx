import { Suspense } from 'react'
import { JoinCollective } from '@/components/join'

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <JoinCollective />
    </Suspense>
  )
}
