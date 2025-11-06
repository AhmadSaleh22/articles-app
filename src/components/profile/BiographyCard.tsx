'use client'

interface BiographyCardProps {
  biography: string
}

export function BiographyCard({ biography }: BiographyCardProps) {
  return (
    <div className="relative flex flex-col w-full">
      {/* Top Border with Corners */}
      <div className="flex items-start justify-between w-full h-6">
        {/* Top Left Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>

        {/* Top Border */}
        <div className="flex-1 border-t border-neutral-700 h-px self-start" />

        {/* Top Right Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-x-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>

      {/* Body */}
      <div className="border-l border-r border-neutral-700 flex flex-col gap-4 px-6 py-6">
        <h3 className="text-base font-medium text-white">Biography</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          {biography}
        </p>
      </div>

      {/* Bottom Border with Corners */}
      <div className="flex items-end justify-between w-full h-6">
        {/* Bottom Left Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-y-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>

        {/* Bottom Border */}
        <div className="flex-1 border-b border-neutral-700 h-px self-end" />

        {/* Bottom Right Corner */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 scale-[-1]">
          <path d="M0 24L0 8C0 3.58172 3.58172 0 8 0L24 0" stroke="#333333" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  )
}
