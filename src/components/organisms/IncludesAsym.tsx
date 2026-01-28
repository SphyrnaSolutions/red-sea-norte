"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface IncludesAsymProps {
  precio: number
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    }
  },
}

export function IncludesAsym({ precio }: IncludesAsymProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full py-[100px]"
      style={{
        background: 'linear-gradient(135deg, #000428 0%, #004E92 100%)'
      }}
    >
      <div className="container-custom space-y-12">

        {/* Título dinámico con precio */}
        <motion.h2
          variants={itemVariants}
          className="text-center text-white text-5xl font-black leading-tight"
          style={{ fontSize: '48px', fontWeight: 900 }}
        >
          TODO ESTO POR {precio.toLocaleString('es-ES')}€
        </motion.h2>

        {/* Row 1: Card naranja grande + Card azul pequeña */}
        <div className="grid grid-cols-1 lg:grid-cols-[700px_1fr] gap-5">
          {/* Card Grande Naranja */}
          <motion.div
            variants={itemVariants}
            className="rounded-[20px] p-10 flex flex-col justify-center"
            style={{
              backgroundColor: '#FF6B35',
              height: '180px',
            }}
          >
            <h3 className="text-white text-[32px] font-black mb-3 leading-tight">
              7 DÍAS LIVEABOARD
            </h3>
            <p className="text-white/90 text-[16px] leading-relaxed">
              Vida a bordo completa • Todas las comidas • Camarote privado
            </p>
          </motion.div>

          {/* Card Azul Oscuro */}
          <motion.div
            variants={itemVariants}
            className="rounded-[20px] p-8 flex items-center justify-center"
            style={{
              backgroundColor: '#0D3A5D',
              height: '180px',
            }}
          >
            <p className="text-white text-[36px] font-black text-center leading-[1.1]">
              18-20
              <br />
              INMERSIONES
            </p>
          </motion.div>
        </div>

        {/* Row 2: Card blanca + Card negra */}
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-5">
          {/* Card Blanca con border naranja */}
          <motion.div
            variants={itemVariants}
            className="rounded-[20px] p-8 flex flex-col justify-center border-[3px]"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#FF6B35',
              height: '160px',
            }}
          >
            <h3 className="text-[#0D3A5D] text-[28px] font-black mb-2">
              ADVANCED SSI
            </h3>
            <p className="text-[#333333] text-[16px] font-semibold">
              Curso completo incluido
            </p>
          </motion.div>

          {/* Card Negra con border naranja */}
          <motion.div
            variants={itemVariants}
            className="rounded-[20px] p-8 flex flex-col justify-center border-[3px]"
            style={{
              backgroundColor: '#000000',
              borderColor: '#FF6B35',
              height: '160px',
            }}
          >
            <h3 className="text-[#FF6B35] text-[28px] font-black mb-2">
              NITROX GRATIS
            </h3>
            <p className="text-white/80 text-[16px] font-semibold">
              Valor: 180€ • Ahorro real
            </p>
          </motion.div>
        </div>

        {/* Row 3: Card cyan full width */}
        <div className="grid grid-cols-1">
          <motion.div
            variants={itemVariants}
            className="rounded-[20px] p-8 flex items-center justify-center"
            style={{
              backgroundColor: '#3DABC2',
              height: '140px',
            }}
          >
            <p className="text-white text-[24px] font-black text-center leading-tight">
              THISTLEGORM X2 INMERSIONES • ROSALIE MOLLER • ABU NUHAS
            </p>
          </motion.div>
        </div>

      </div>
    </motion.section>
  )
}
