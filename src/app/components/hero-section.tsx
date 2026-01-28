"use client"


export function HeroSection(): React.JSX.Element {
  return (
    <section className="relative pt-40 pb-20 px-6 lg:px-24">
      {/* Overlay gradient for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent pointer-events-none" />
      
      {/* Radial gradient for atmospheric glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,rgba(201,169,110,0.08),transparent)] pointer-events-none" />
      
      {/* Subtle noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-light mb-6"
          style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.5), 0px 4px 16px rgba(0,0,0,0.3)" }}
        >
          <span className="text-white">Trace </span>
          <span className="font-semibold text-[#A3A3A3]">The Living Archive</span>
        </h1>

        <p
          className="text-base md:text-lg text-white/90 leading-relaxed mb-8"
          style={{ textShadow: "0px 1px 4px rgba(0,0,0,0.4), 0px 2px 8px rgba(0,0,0,0.2)" }}
        >
          We practice knowledge like tending the land: digging, planting, waiting.
          Culture lives and breathes with us, passed down like stories. Art is an
          architecture of the senses, built on feeling and instinct. From this rhythm,
          Trace of the Tide emerges — a community of creation, knowledge, and transformation.
          A living current between art and thought, culture and creation, the human and more-than-human.
        </p>

      </div>
      
      {/* Bottom fade for smooth transition to cards */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent via-[#0A0A0A]/20 to-transparent pointer-events-none" />
    </section>
  )
}
