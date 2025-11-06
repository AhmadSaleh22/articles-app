'use client'

interface Stat {
  value: string
  label: string
}

interface ArticleStatsProps {
  stats: Stat[]
}

export function ArticleStats({ stats }: ArticleStatsProps) {
  return (
    <div className="flex gap-4 my-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex-1 bg-neutral-800 rounded-lg p-6 border border-neutral-700"
        >
          <div className="text-3xl font-semibold text-white mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-neutral-400 leading-snug">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
