'use client'

interface InfoItem {
  title: string
  description: string
}

interface InfoSectionProps {
  title: string
  description: string
  items: InfoItem[]
  footerText?: string
}

export function InfoSection({
  title,
  description,
  items,
  footerText,
}: InfoSectionProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-['IBM_Plex_Sans'] font-medium text-3xl text-white mb-4">
          {title}
        </h1>
        <p className="text-neutral-400 leading-relaxed">{description}</p>
      </div>

      {/* Info Items */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <h3 className="font-['IBM_Plex_Sans'] font-medium text-lg text-white mb-2">
              {item.title}
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      {footerText && (
        <p className="text-neutral-400 leading-relaxed">{footerText}</p>
      )}
    </div>
  )
}
