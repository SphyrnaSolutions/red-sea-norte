"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { useModalStore } from "@/stores/useModalStore"

// Types
interface DepthCard {
  type: "depth"
  image: string
  label: string
  value: string
  description: string
}

interface NitroxCard {
  type: "nitrox"
  image: string
  title: string
  description: string
}

interface IconNavCard {
  type: "icon"
  image: string
  icon: string
  title: string
  description: string
}

interface ImageNavCard {
  type: "image"
  image: string
  title: string
  description: string
}

interface StatNavCard {
  type: "stat"
  image: string
  number: string
  label: string
  sublabel: string
}

type SpecialtyCard = DepthCard | NitroxCard
type NavCard = IconNavCard | ImageNavCard | StatNavCard

export interface SpecSectionProps {
  sectionLabel: string
  bigCard: {
    image: string
    title: string
    subtitle: string
  }
  specialtyCards: SpecialtyCard[]
  mainTitle: string
  navCards: NavCard[]
  cta: {
    price: string
    details: string
    buttonText: string
  }
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function SpecSection({
  sectionLabel,
  bigCard,
  specialtyCards,
  mainTitle,
  navCards,
  cta,
}: SpecSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { openModal } = useModalStore()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full bg-white py-20 md:py-28"
    >
      <div className="container-custom space-y-12 md:space-y-16">
        {/* Section Label */}
        <motion.div variants={itemVariants} className="flex justify-start">
          <div className="inline-flex bg-[#F57415] rounded-lg px-5 py-2.5">
            <span className="text-white text-xs font-bold tracking-wider uppercase">
              {sectionLabel}
            </span>
          </div>
        </motion.div>

        {/* Row 1: Hero Cards (Big Image + Side Stack) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-[850px_1fr] gap-6 h-auto lg:h-[480px]"
        >
          {/* Big Image Card */}
          <BigImageCard
            image={bigCard.image}
            title={bigCard.title}
            subtitle={bigCard.subtitle}
          />

          {/* Side Stack Cards */}
          <div className="flex flex-col gap-6">
            {specialtyCards.map((card, idx) => (
              <div key={idx} className="flex-1">
                {card.type === "depth" ? (
                  <DepthCard
                    image={card.image}
                    label={card.label}
                    value={card.value}
                    description={card.description}
                    isHovered={hoveredCard === `depth-${idx}`}
                    onHover={() => setHoveredCard(`depth-${idx}`)}
                    onLeave={() => setHoveredCard(null)}
                  />
                ) : (
                  <NitroxCard
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    isHovered={hoveredCard === `nitrox-${idx}`}
                    onHover={() => setHoveredCard(`nitrox-${idx}`)}
                    onLeave={() => setHoveredCard(null)}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          variants={itemVariants}
          className="text-[#2C3E50] text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight w-full"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
          }}
        >
          {mainTitle}
        </motion.h2>

        {/* Row 2: Navigation Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[380px_1fr_320px] gap-5 h-auto lg:h-[260px]"
        >
          {navCards.map((card, idx) => {
            const cardId = `nav-${idx}`
            const isHovered = hoveredCard === cardId

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(cardId)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {card.type === "icon" && (
                  <CompassCard
                    image={card.image}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    isHovered={isHovered}
                  />
                )}
                {card.type === "image" && (
                  <ControlImageCard
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    isHovered={isHovered}
                  />
                )}
                {card.type === "stat" && (
                  <SpecialtyStatCard
                    image={card.image}
                    number={card.number}
                    label={card.label}
                    sublabel={card.sublabel}
                    isHovered={isHovered}
                  />
                )}
              </div>
            )
          })}
        </motion.div>

        {/* CTA Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center gap-8 bg-[#0D3A5D] rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-white text-4xl md:text-5xl font-bold">
              {cta.price}
            </h3>
            <p className="text-white/65 text-base">{cta.details}</p>
          </div>
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#FF6B35] text-white rounded-xl px-10 py-5 font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto"
          >
            {cta.buttonText}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

// ====================================
// Inline Card Components
// ====================================

// 1. Big Image Card - Large card with wreck image
function BigImageCard({
  image,
  title,
  subtitle,
}: {
  image: string
  title: string
  subtitle: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl overflow-hidden h-[400px] lg:h-full shadow-xl cursor-pointer"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          opacity: isHovered ? 0.5 : 0.4,
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
        <motion.h3
          className="text-white text-4xl md:text-5xl font-bold leading-[1.05] mb-2"
          style={{ fontFamily: "var(--font-display)" }}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <p className="text-white/80 text-lg md:text-xl">{subtitle}</p>
      </div>
    </motion.div>
  )
}

// 2. Depth Card - Image card with depth info
function DepthCard({
  image,
  label,
  value,
  description,
  isHovered,
  onHover,
  onLeave,
}: {
  image: string
  label: string
  value: string
  description: string
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative rounded-2xl overflow-hidden p-8 h-full flex flex-col justify-end cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={value}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/47" />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="text-white/50 text-xs font-bold tracking-wider uppercase">
          {label}
        </div>
        <div
          className="text-white text-6xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
        </div>
        <div className="text-white/85 text-base">{description}</div>
      </div>
    </motion.div>
  )
}

// 3. Nitrox Card - Image card
function NitroxCard({
  image,
  title,
  description,
  isHovered,
  onHover,
  onLeave,
}: {
  image: string
  title: string
  description: string
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative rounded-2xl overflow-hidden p-8 h-full flex flex-col justify-end cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/47" />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <div
          className="text-white text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </div>
        <div className="text-white/75 text-sm max-w-xs">{description}</div>
      </div>
    </motion.div>
  )
}

// 4. Compass Card - Image card with icon
function CompassCard({
  image,
  icon,
  title,
  description,
  isHovered,
}: {
  image: string
  icon: string
  title: string
  description: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden p-9 h-full flex flex-col cursor-pointer shadow-lg"
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/47" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <h3
          className="text-white text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <p className="text-white/95 text-base max-w-xs mb-6">{description}</p>
        <div className="text-5xl mt-auto">{icon}</div>
      </div>
    </motion.div>
  )
}

// 5. Control Image Card - Image card with overlay
function ControlImageCard({
  image,
  title,
  description,
  isHovered,
}: {
  image: string
  title: string
  description: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden h-full min-h-[260px] cursor-pointer shadow-lg"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <h3
          className="text-white text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <p className="text-white/85 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

// 6. Specialty Stat Card - Image card with stats
function SpecialtyStatCard({
  image,
  number,
  label,
  sublabel,
  isHovered,
}: {
  image: string
  number: string
  label: string
  sublabel: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden p-9 h-full flex flex-col justify-end cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/47" />

      {/* Content */}
      <div className="relative z-10 space-y-5">
        <div
          className="text-white text-8xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {number}
        </div>
        <div className="text-white/90 text-base font-semibold max-w-xs">
          {label}
        </div>
        <div className="text-white/70 text-sm">{sublabel}</div>
      </div>
    </motion.div>
  )
}
