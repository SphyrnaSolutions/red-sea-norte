"use client"

import { Check } from "lucide-react"
import { useModalStore } from "@/lib/stores/useModalStore"
import { useInView } from "@/hooks/useInView"

interface ProgramSectionProps {
  title: string
  subtitle: string
  includes: string[]
  price: {
    amount: string
    badge: string
    perPerson: string
    highlight: string
  }
}

export function ProgramSection({ title, subtitle, includes, price }: ProgramSectionProps) {
  const { openModal } = useModalStore()
  const { ref, isInView } = useInView()

  return (
    <section
      ref={ref}
      className="relative py-40 md:py-48 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A2540 0%, #0D3A5D 100%)'
      }}
    >
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 md:gap-20">
          {/* Left Column - Includes List */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section Header */}
            <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2
                className="text-5xl md:text-6xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {title}
              </h2>
              <p className="text-xl text-white/80">
                {subtitle}
              </p>
            </div>

            {/* Includes List */}
            <div className="space-y-4 mt-12">
              {includes.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-700`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${(index + 2) * 100}ms`
                  }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF5722] flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Price Card */}
          <div className="lg:col-span-2">
            <div
              className={`sticky top-32 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 transition-all duration-700`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '200ms'
              }}
            >
              {/* Badge */}
              <div className="mb-6">
                <span
                  className="inline-block px-4 py-2 bg-[#FF5722] text-white text-sm font-bold rounded-full animate-pulse"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {price.badge}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div
                  className="text-7xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {price.amount}
                </div>
                <p className="text-lg text-white/70">
                  {price.perPerson}
                </p>
              </div>

              {/* Highlight */}
              <div className="mb-8">
                <p className="text-lg font-semibold text-[#00CED1]">
                  {price.highlight}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={openModal}
                className="w-full bg-[#FF5722] hover:bg-[#F4511E] text-white text-xl font-bold py-5 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Reservar Plaza
              </button>

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
