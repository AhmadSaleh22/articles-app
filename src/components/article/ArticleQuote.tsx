'use client'

interface ArticleQuoteProps {
  text: string
  author?: string
}

export function ArticleQuote({ text, author }: ArticleQuoteProps) {
  return (
    <div className="border-l-2 border-[#C9A96E] pl-6 py-4 my-6">
      <p className="text-base text-white italic leading-relaxed">
        {text}
      </p>
      {author && (
        <p className="text-sm text-neutral-400 mt-2">— {author}</p>
      )}
    </div>
  )
}
