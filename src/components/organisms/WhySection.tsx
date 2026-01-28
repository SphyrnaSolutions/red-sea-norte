"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"

// Types
interface ImageLargeCard {
  type: "image-large"
  image: string
  title: string
  description: string
}

interface ConditionsImageCard {
  type: "conditions-image"
  image: string
  badge: string
  title: string
  highlight: string
}

interface CertificationCard {
  type: "certification"
  icon: string
  title: string
  subtitle: string
}

interface ImageSmallCard {
  type: "image-small"
  image: string
  badge: string
  title: string
}

interface EquipmentCard {
  type: "equipment"
  image: string
  badge: string
  title: string
}

type TopRowCard = ImageLargeCard | ConditionsImageCard
type BottomRowCard = CertificationCard | ImageSmallCard | EquipmentCard

export interface WhySectionProps {
  title: string
  subtitle: string
  topRow: TopRowCard[]
  bottomRow: BottomRowCard[]
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function WhySection({ title, subtitle, topRow, bottomRow }: WhySectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full bg-white pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="container-custom space-y-12 md:space-y-16">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2
            className="text-[#2C3E50] text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="text-[#6B7280] text-lg md:text-xl max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Top Row - 2 cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {topRow.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(`top-${idx}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {card.type === "image-large" && (
                <ImageLargeCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  isHovered={hoveredCard === `top-${idx}`}
                />
              )}
              {card.type === "conditions-image" && (
                <ConditionsImageCard
                  image={card.image}
                  badge={card.badge}
                  title={card.title}
                  highlight={card.highlight}
                  isHovered={hoveredCard === `top-${idx}`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Bottom Row - 3 cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bottomRow.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(`bottom-${idx}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {card.type === "certification" && (
                <CertificationCard
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                  isHovered={hoveredCard === `bottom-${idx}`}
                />
              )}
              {card.type === "image-small" && (
                <ImageSmallCard
                  image={card.image}
                  badge={card.badge}
                  title={card.title}
                  isHovered={hoveredCard === `bottom-${idx}`}
                />
              )}
              {card.type === "equipment" && (
                <EquipmentCard
                  image={card.image}
                  badge={card.badge}
                  title={card.title}
                  isHovered={hoveredCard === `bottom-${idx}`}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ====================================
// Inline Card Components
// ====================================

// 1. Image Large Card - Thistlegorm wreck
function ImageLargeCard({
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
      className="relative rounded-xl overflow-hidden h-[400px] cursor-pointer"
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 space-y-3">
        <motion.h3
          className="text-white text-3xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <p className="text-white/90 text-base leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// 2. Conditions Image Card - Large image with conditions overlay
function ConditionsImageCard({
  image,
  badge,
  title,
  highlight,
  isHovered,
}: {
  image: string
  badge: string
  title: string
  highlight: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden h-[400px] cursor-pointer"
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        {/* Badge */}
        <div className="inline-flex self-start bg-[#FF6B35] rounded-md px-3 py-1.5">
          <span className="text-white text-xs font-bold tracking-wider">
            {badge}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="space-y-3">
          <h3
            className="text-white text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>
          <p className="text-[#5CE1E6] text-lg font-bold">
            {highlight}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// 3. Certification Card - Minimal with logo/icon
function CertificationCard({
  icon,
  title,
  subtitle,
  isHovered,
}: {
  icon: string
  title: string
  subtitle: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden h-[320px] cursor-pointer"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
        alt={title}
        fill
        className="object-cover"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.7s ease-out",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content - Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
        {/* Icon Badge */}
        <motion.div
          className="w-20 h-20 bg-[#5CE1E6]/25 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border-2 border-[#5CE1E6]/50"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[#5CE1E6] text-4xl font-bold">{icon}</span>
        </motion.div>

        {/* Title */}
        <h3
          className="text-white text-3xl font-bold leading-tight mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-white/85 text-base">
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}

// 4. Image Small Card - Marine life
function ImageSmallCard({
  image,
  badge,
  title,
  isHovered,
}: {
  image: string
  badge: string
  title: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden h-[320px] cursor-pointer"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 space-y-2">
        <div className="text-[#5CE1E6] text-xs font-bold tracking-wider">
          {badge}
        </div>
        <h3
          className="text-white text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  )
}

// 5. Equipment Card - Image with badge
function EquipmentCard({
  image,
  badge,
  title,
  isHovered,
}: {
  image: string
  badge: string
  title: string
  isHovered: boolean
}) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden h-[320px] cursor-pointer"
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 space-y-2">
        <div className="text-[#5CE1E6] text-xs font-bold tracking-wider">
          {badge}
        </div>
        <h3
          className="text-white text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  )
}
