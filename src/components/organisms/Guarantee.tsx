'use client'

import { motion } from 'framer-motion'

const guarantees = [
  {
    icon: '✅',
    title: 'Pago Seguro',
    description: 'Transacciones encriptadas SSL',
  },
  {
    icon: '🔄',
    title: 'Cambios Flexibles',
    description: 'Hasta 30 días antes del viaje',
  },
  {
    icon: '🎓',
    title: 'Certificación SSI',
    description: 'Reconocida internacionalmente',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Guarantee() {
  return (
    <section className="bg-[#0D3A5D] py-[40px]">
      <div className="container mx-auto px-4 md:px-[120px]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center text-center"
            >
              <span
                className="text-[48px] mb-4"
                role="img"
                aria-label={guarantee.title}
              >
                {guarantee.icon}
              </span>
              <h3 className="text-xl font-bold text-white/90 mb-2">
                {guarantee.title}
              </h3>
              <p className="text-base text-white/90">{guarantee.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
