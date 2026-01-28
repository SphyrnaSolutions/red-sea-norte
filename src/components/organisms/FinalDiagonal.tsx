'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface FinalDiagonalProps {
  title: string
  description: string
  primaryCTA: { text: string; variant: 'primary' | 'outline' }
  pricing: {
    actual: number
    moneda: string
  }
  plazasDisponibles: number
}

export function FinalDiagonal({
  title,
  description,
  primaryCTA,
  pricing,
  plazasDisponibles,
}: FinalDiagonalProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop: Diagonal Layout */}
      <div className="hidden md:flex h-[700px] relative">
        {/* Left Side - Gradient Blue */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #000428 0%, #004E92 50%, #000428 100%)',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
            width: '700px',
          }}
        >
          <div className="text-center text-white px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="text-[200px] font-black leading-[0.75] mb-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 900 }}
              >
                {plazasDisponibles}
              </div>
              <div
                className="text-[52px] font-black leading-[0.95] whitespace-pre-line"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 900 }}
              >
                PLAZAS{'\n'}QUEDAN
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Black */}
        <div
          className="absolute inset-0 bg-black flex items-center justify-end"
          style={{
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
            left: '700px',
          }}
        >
          <div className="text-center text-white px-12 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-4">{title}</h2>
              <p className="text-2xl mb-8 text-gray-300">{description}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="h-[85px] w-[450px] bg-white text-black hover:bg-[#FF6B35] hover:text-white rounded-xl text-lg font-semibold transition-colors"
                >
                  {primaryCTA.text}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: Stacked Layout */}
      <div className="md:hidden">
        {/* Gradient Blue Section */}
        <div
          className="py-16 flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, #000428 0%, #004E92 50%, #000428 100%)',
          }}
        >
          <div className="text-center text-white px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="text-[120px] font-black leading-[0.75] mb-2"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 900 }}
              >
                {plazasDisponibles}
              </div>
              <div
                className="text-[40px] font-black leading-[0.95] whitespace-pre-line"
                style={{ fontFamily: 'Bebas Neue, sans-serif', fontWeight: 900 }}
              >
                PLAZAS{'\n'}QUEDAN
              </div>
            </motion.div>
          </div>
        </div>

        {/* Black Section */}
        <div className="bg-black py-16 flex items-center justify-center">
          <div className="text-center text-white px-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-xl mb-8 text-gray-300">{description}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-[#FF6B35] hover:text-white rounded-xl px-8 py-6 text-lg font-semibold w-full sm:w-auto transition-colors"
                >
                  {primaryCTA.text}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
