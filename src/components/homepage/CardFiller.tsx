'use client'

type FillerState = 'Up' | 'Right' | 'Left' | 'Down'

interface CardFillerProps {
  state?: FillerState
}

export function CardFiller({ state = 'Right' }: CardFillerProps) {
  if (state === 'Left') {
    return (
      <div className="h-[294px] w-[138px] flex items-center justify-center">
        <div className="w-[138px] h-[294px] transform rotate-180">
          <svg
            width="138"
            height="294"
            viewBox="0 0 138 294"
            fill="none"
            className="w-full h-full"
          >
            <path
              d="M0 147L69 0L138 73.5V220.5L69 294L0 220.5V73.5Z"
              fill="#171717"
              stroke="#000000"
              strokeWidth="6"
            />
          </svg>
        </div>
      </div>
    )
  }

  if (state === 'Down') {
    return (
      <div className="h-[67px] w-[276px]">
        <svg
          width="276"
          height="67"
          viewBox="0 0 276 67"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M138 0L248 34V67H28V34L138 0Z"
            fill="#171717"
            stroke="#000000"
            strokeWidth="6"
          />
        </svg>
      </div>
    )
  }

  if (state === 'Up') {
    return (
      <div className="h-[67px] w-[276px] flex items-center justify-center">
        <div className="w-[276px] h-[67px] transform scale-y-[-1]">
          <svg
            width="276"
            height="67"
            viewBox="0 0 276 67"
            fill="none"
            className="w-full h-full"
          >
            <path
              d="M138 0L248 34V67H28V34L138 0Z"
              fill="#171717"
              stroke="#000000"
              strokeWidth="6"
            />
          </svg>
        </div>
      </div>
    )
  }

  // Right (default)
  return (
    <div className="h-[294px] w-[138px]">
      <svg
        width="138"
        height="294"
        viewBox="0 0 138 294"
        fill="none"
        className="w-full h-full"
      >
        <path
          d="M0 147L69 0L138 73.5V220.5L69 294L0 220.5V73.5Z"
          fill="#171717"
          stroke="#000000"
          strokeWidth="6"
        />
      </svg>
    </div>
  )
}
