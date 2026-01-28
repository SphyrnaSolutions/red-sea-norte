'use client'

import { motion } from 'framer-motion'

export function GuaranteeBar() {
  return (
    <section className="bg-[#0D3A5D] py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-2xl" role="img" aria-label="shield">
            🛡️
          </span>
          <p className="text-lg font-semibold text-white/95 text-center">
            Garantía de satisfacción 100% - 14 días para cambiar de opinión
          </p>
        </motion.div>
      </div>
    </section>
  )
}
