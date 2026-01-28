"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useModalStore } from "@/stores/useModalStore"

import { CTAButton } from "@/lib/mock-data/types"

interface HeroOfferProps {
  backgroundImage: string
  badge?: string
  title: string
  subtitle: string
  primaryCTA?: CTAButton
  secondaryCTA?: CTAButton
  pricing: {
    original: number
    descuento: number
    actual: number
    moneda: string
  }
  urgencia: {
    plazasDisponibles: number
    personasViendo: number
  }
}

export function HeroOffer({
  backgroundImage,
  badge,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  pricing,
  urgencia,
}: HeroOfferProps) {
  const { openModal } = useModalStore()

  return (
    <section className="relative w-full h-[600px] md:h-[800px] lg:h-[1000px] flex items-center justify-center overflow-hidden">
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

      {/* Multi-layer Gradient Overlay - Darker */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl flex flex-col items-center text-center py-20">
        {/* Animated Badge - Orange Compact */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
            style={{
              backgroundColor: '#FF6B35',
              borderRadius: '20px',
              padding: '12px 32px',
            }}
          >
            <span className="text-white text-xs font-bold tracking-[2px] uppercase">
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title - Bebas Neue 84px/64px/48px */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white text-[48px] md:text-[64px] lg:text-[84px] leading-[0.95] text-center mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "900",
            textShadow:
              "0 4px 32px rgba(0, 0, 0, 0.8), 0 8px 64px rgba(0, 0, 0, 0.6)",
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle - Inter 22px */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 text-[22px] leading-[1.6] max-w-[800px] mb-8 text-center"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: "normal",
            textShadow: "0 2px 16px rgba(0, 0, 0, 0.6)",
          }}
        >
          {subtitle}
        </motion.p>

        {/* Pricing Box - Centrado y Mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center mb-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4">
            {/* Original Price - Más visible */}
            <div className="text-center">
              <p className="text-white/70 text-sm md:text-base mb-1 uppercase tracking-wide font-semibold">
                Precio Normal
              </p>
              <p className="text-white/80 text-3xl md:text-4xl line-through font-bold">
                {pricing.moneda}
                {pricing.original.toLocaleString()}
              </p>
            </div>

            {/* Discount Badge */}
            <div className="bg-red-500 rounded-lg px-5 py-3 shadow-lg">
              <p className="text-white text-2xl md:text-3xl font-bold">
                -{pricing.descuento}%
              </p>
            </div>

            {/* Current Price - Oro grande */}
            <div className="text-center">
              <p className="text-white/80 text-sm md:text-base mb-1 uppercase tracking-wide font-semibold">
                Oferta Limitada
              </p>
              <p
                className="text-[#FFD700] text-6xl md:text-7xl lg:text-[80px] font-bold leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow: "0 4px 24px rgba(255, 215, 0, 0.4)",
                }}
              >
                {pricing.moneda}
                {pricing.actual.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Savings Badge */}
          <div
            className="px-6 py-3 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
            }}
          >
            <p className="text-white text-lg md:text-xl font-semibold">
              ¡Ahorras {pricing.moneda}{(pricing.original - pricing.actual).toLocaleString()}!
            </p>
          </div>
        </motion.div>

        {/* Urgency Indicators - Gap 40px */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center mb-8"
          style={{ gap: '40px' }}
        >
          {/* Plazas Disponibles */}
          <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/40 rounded-lg px-4 py-2">
            <span className="text-2xl">🔥</span>
            <span className="text-white text-sm md:text-base font-semibold">
              Solo {urgencia.plazasDisponibles} plazas disponibles
            </span>
          </div>

          {/* Personas Viendo */}
          <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 rounded-lg px-4 py-2">
            <span className="text-2xl">👥</span>
            <span className="text-white text-sm md:text-base font-semibold">
              {urgencia.personasViendo} personas viendo ahora
            </span>
          </div>
        </motion.div>

        {/* CTA Massive - 80px height, 420px width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center"
        >
          {primaryCTA && (
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="text-white border-0 font-bold text-xl shadow-[0_4px_24px_rgba(255,107,53,0.5)] hover:shadow-[0_8px_32px_rgba(255,107,53,0.7)] transition-all duration-300"
              style={{
                backgroundColor: '#FF6B35',
                borderRadius: '40px',
                height: '80px',
                width: '100%',
                maxWidth: '420px',
              }}
            >
              {primaryCTA.text}
            </motion.button>
          )}
          {secondaryCTA && (
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="border-2 border-white/90 text-white hover:bg-white hover:text-[#0A2540] backdrop-blur-sm font-semibold text-lg transition-all duration-300"
              style={{
                borderRadius: '40px',
                height: '80px',
                width: '100%',
                maxWidth: '320px',
                padding: '0 40px',
              }}
            >
              {secondaryCTA.text}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-[4] pointer-events-none" />
    </section>
  )
}
