"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"
import { useRef } from "react"

interface Testimonio {
  name: string
  text: string
  avatar: string
  rating: number
  date?: string
}

interface ProofAsymProps {
  testimonios: Testimonio[]
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    }
  },
}

export function ProofAsym({ testimonios }: ProofAsymProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Using first testimonial as the featured one
  const featuredTestimonial = testimonios[0]

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full bg-white py-16 md:py-24"
    >
      <div className="container-custom px-4 md:px-6">

        {/* Layout invertido: Imagen LEFT, Contenido RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_650px] h-auto md:h-[400px] overflow-hidden rounded-2xl shadow-2xl">

          {/* LEFT: Imagen */}
          <div className="relative h-[300px] md:h-full w-full">
            <Image
              src={featuredTestimonial.avatar}
              alt={featuredTestimonial.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* RIGHT: Contenido con fondo NARANJA #FF6B35 */}
          <div className="bg-[#FF6B35] p-8 md:p-[60px] flex flex-col justify-center h-full">

            {/* Stars en NEGRO */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: featuredTestimonial.rating || 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={32}
                  fill="#000000"
                  color="#000000"
                  strokeWidth={0}
                />
              ))}
            </div>

            {/* Quote en NEGRO */}
            <blockquote
              className="text-[#000000] text-[22px] md:text-[26px] font-bold italic mb-6"
              style={{
                lineHeight: '1.4',
              }}
            >
              "{featuredTestimonial.text}"
            </blockquote>

            {/* Author + Date en NEGRO */}
            <div className="mt-auto">
              <p className="text-[#000000]/70 text-[18px] font-bold mb-1">
                {featuredTestimonial.name}
              </p>
              {featuredTestimonial.date && (
                <p className="text-[#000000]/60 text-[16px]">
                  {featuredTestimonial.date}
                </p>
              )}
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  )
}
