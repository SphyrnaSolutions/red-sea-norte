"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel"
import { useRef } from "react"

interface DiveSite {
  name: string
  image: string
  depth: string
  highlight: string
}

interface DiveSitesSectionProps {
  title: string
  subtitle: string
  sites: DiveSite[]
}

export function DiveSitesSection({ title, subtitle, sites }: DiveSitesSectionProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="w-full bg-white pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="container-custom">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#0A2540',
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent>
              {sites.map((site, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <DiveSiteCard site={site} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />

            {/* Dots Indicator */}
            <CarouselDots />
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}

// Dive Site Card Component
function DiveSiteCard({ site }: { site: DiveSite }) {
  return (
    <motion.div
      className="relative h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image
        src={site.image}
        alt={site.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        {/* Badge - Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex self-start mb-4"
        >
          <div className="bg-[#FF6B35] rounded-lg px-4 py-2">
            <span className="text-white text-xs font-bold tracking-wider uppercase">
              {site.highlight}
            </span>
          </div>
        </motion.div>

        {/* Site Name */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white text-4xl font-bold mb-3 group-hover:translate-y-[-4px] transition-transform duration-300"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {site.name}
        </motion.h3>

        {/* Depth Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-[#5CE1E6]/20 backdrop-blur-sm flex items-center justify-center border border-[#5CE1E6]/30">
            <span className="text-[#5CE1E6] text-sm font-bold">↓</span>
          </div>
          <span className="text-white/90 text-lg font-semibold">
            {site.depth}
          </span>
        </motion.div>

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  )
}
