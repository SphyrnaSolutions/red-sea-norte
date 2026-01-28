"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useModalStore } from "@/stores/useModalStore"

interface HeroSectionProps {
  backgroundImage: string
  badge: {
    text: string
    backgroundColor: string
  }
  title: string
  subtitle: string
  ctas: Array<{
    text: string
    variant: string
  }>
  trustLine: string
}

export function HeroSection({
  backgroundImage,
  badge,
  title,
  subtitle,
  ctas,
  trustLine,
}: HeroSectionProps) {
  const { openModal } = useModalStore()

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Overlay Gradient - from-black/90 via-black/50 to-black/70 */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)'
        }}
      />

      {/* SVG Grain Overlay - 3% opacity */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Vignette - radial gradient 40% opacity */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 1) 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-28 flex flex-col items-center">
        <div className="max-w-[900px] w-full flex flex-col items-center gap-6">

          {/* Badge - Backdrop blur with cyan translucent background */}
          <div
            className="rounded-full px-5 py-2.5 animate-fadeInUp backdrop-blur-md border border-white/20 mt-8"
            style={{
              backgroundColor: badge.backgroundColor,
              boxShadow: '0 4px 24px rgba(0, 206, 209, 0.2)'
            }}
          >
            <span className="text-white text-[11px] font-bold tracking-[3px] uppercase">
              {badge.text}
            </span>
          </div>

          {/* Title - Bebas Neue, 96px desktop / 56px mobile, text-shadow-lg */}
          <h1
            className="text-white text-[56px] md:text-[96px] leading-[0.95] text-center animate-fadeInUp delay-100 tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '400',
              textShadow: '0 4px 32px rgba(0, 0, 0, 0.8), 0 8px 64px rgba(0, 0, 0, 0.6)',
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </h1>

          {/* Subtitle - 24px, white/90, max-width 800px */}
          <p
            className="text-white/90 text-xl md:text-2xl leading-[1.6] text-center animate-fadeInUp delay-200 max-w-[800px]"
            style={{
              fontFamily: 'var(--font-sans)',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.6)'
            }}
          >
            {subtitle}
          </p>

          {/* CTAs - Primary coral (#FF5722) + Outline white */}
          <div className="flex flex-wrap gap-4 mt-4 animate-fadeInUp delay-300 justify-center">
            {ctas.map((cta, index) => (
              <Button
                key={index}
                onClick={openModal}
                variant={cta.variant === "primary" ? "primary" : "outline"}
                size="lg"
                className={
                  cta.variant === "primary"
                    ? "bg-[#FF5722] hover:bg-[#F4511E] text-white border-0 shadow-[0_4px_24px_rgba(255,87,34,0.4)] hover:shadow-[0_8px_32px_rgba(255,87,34,0.6)] hover:scale-[1.03] transition-all duration-300 font-semibold text-lg px-12 h-14 min-w-[240px]"
                    : "border-2 border-white/90 text-white hover:bg-white hover:text-[#0A2540] backdrop-blur-sm transition-all duration-300 font-semibold text-lg px-12 h-14 min-w-[240px] hover:scale-[1.03]"
                }
              >
                {cta.text}
              </Button>
            ))}
          </div>

          {/* Trust Line - 16px, white/80, flex with bullets */}
          <div
            className="text-white/80 text-base mt-6 animate-fadeInUp delay-400 flex flex-wrap items-center justify-center gap-2"
            style={{
              fontFamily: 'var(--font-sans)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
            }}
          >
            {trustLine.split('•').map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {item.trim()}
                {index < trustLine.split('•').length - 1 && (
                  <span className="text-white/40">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - ChevronDown animated bouncing */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/60" strokeWidth={2} />
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent z-[4] pointer-events-none" />
    </section>
  )
}
