"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

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
  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover"
        priority
        quality={75}
      />

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

      {/* Animated subtle gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0066CC]/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00CED1]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 container-custom py-[100px] flex flex-col items-center gap-6">
        <div className="max-w-[800px] flex flex-col items-center gap-6">
        {/* Badge */}
        <div
          className="rounded-[20px] px-4 py-2 animate-fadeInUp backdrop-blur-sm border border-white/20"
          style={{ backgroundColor: badge.backgroundColor }}
        >
          <span className="text-white text-sm font-semibold tracking-wider">{badge.text}</span>
        </div>

        {/* Title */}
        <h1 className="text-white text-[56px] font-bold leading-[1.1] text-center animate-fadeInUp delay-100 drop-shadow-2xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-xl leading-[1.4] text-center animate-fadeInUp delay-200">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex gap-4 animate-fadeInUp delay-300">
          {ctas.map((cta, index) => (
            <Button
              key={index}
              variant={cta.variant === "primary" ? "gradient" : "outline"}
              size="lg"
              rounded="default"
              className={
                cta.variant === "outline"
                  ? "border-white text-white hover:bg-white/10 backdrop-blur-sm"
                  : "shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              }
            >
              {cta.text}
            </Button>
          ))}
        </div>

        {/* Trust Line */}
        <p className="text-white/70 text-sm mt-2 animate-fadeInUp delay-400">
          {trustLine}
        </p>
        </div>
      </div>
    </section>
  )
}
