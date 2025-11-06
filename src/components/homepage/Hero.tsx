'use client'

export function Hero() {
  return (
    <section className="relative flex flex-col gap-4 md:gap-6 items-start px-6 md:px-20 lg:px-40 pt-20 md:pt-32 lg:pt-40 pb-0 bg-gradient-to-b from-neutral-900 to-transparent backdrop-blur-sm">
      <div className="flex flex-col gap-3 md:gap-4 text-white max-w-full md:max-w-2xl">
        <h1 className="font-['IBM_Plex_Sans'] font-medium text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-md">
          <span className="text-3xl md:text-4xl lg:text-5xl">Trace </span>
          <span className="text-2xl md:text-3xl lg:text-4xl text-neutral-400">The Living Archive</span>
        </h1>
        <p className="font-normal text-sm md:text-base leading-relaxed tracking-tight drop-shadow-md max-w-full md:max-w-[680px]">
          We practice knowledge like tending the land: digging, planting, waiting. Culture lives and
          breathes with us, passed down like stories. Art is an architecture of the senses, built on
          feeling and instinct. From this rhythm, Trace of the Tide emerges — a community of creation,
          knowledge, and transformation. A living current between art and thought, culture and creation,
          the human and more-than-human.
        </p>
      </div>
      <button className="bg-[#C9A96E] px-4 py-2 rounded-lg text-sm font-medium text-[#332217] hover:bg-[#B89858] transition-colors shadow-inner shadow-white/40">
        Call to Action
      </button>
    </section>
  )
}
