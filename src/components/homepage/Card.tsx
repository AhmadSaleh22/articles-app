'use client'

interface CardProps {
  title: string
  articleCount?: number
  imageUrl?: string
}

export function Card({ title, articleCount = 12, imageUrl }: CardProps) {
  return (
    <div className="relative w-[360px] h-[435px] flex items-center justify-center group">
      <div className="absolute inset-0">
        <svg
          width="360"
          height="435"
          viewBox="0 0 360 435"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M180 0L340 90V345L180 435L20 345V90L180 0Z"
            fill="#171717"
            stroke="#333333"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[312px] h-[81px]">
        <svg
          width="312"
          height="82"
          viewBox="0 0 312 82"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M156 0L296 60V82H16V60L156 0Z"
            fill="#5C5C5C"
          />
        </svg>
      </div>
      <div className="relative w-[328px] h-[399px]">
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-900 flex flex-col items-center justify-end px-6 py-10 backdrop-blur-sm">
            <div className="flex flex-col gap-4 items-center">
              <h3 className="text-xl font-['IBM_Plex_Sans'] font-medium text-white text-center leading-7 drop-shadow-md line-clamp-2">
                {title}
              </h3>

              <div className="flex items-center backdrop-blur-md bg-neutral-900/80 rounded-full overflow-hidden">
                <div className="h-6 w-2 bg-gradient-to-r from-transparent to-neutral-900/80" />
                <span className="px-3 py-1 text-xs font-medium text-white">
                  {articleCount} articles
                </span>
                <div className="h-6 w-2 bg-gradient-to-l from-transparent to-neutral-900/80" />
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          >
            <svg
              width="328"
              height="399"
              viewBox="0 0 328 399"
              fill="none"
              className="w-full h-full"
            >
              <path
                d="M164 0L312 82V317L164 399L16 317V82L164 0Z"
                stroke="white"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
