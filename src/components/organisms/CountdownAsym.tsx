'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Hourglass } from 'lucide-react'
import Image from 'next/image'

interface CountdownAsymProps {
  countdownTo: string // ISO date string "2026-03-15T23:59:59"
  plazasDisponibles: number
  personasViendo: number
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownAsym({
  countdownTo,
  plazasDisponibles,
  personasViendo
}: CountdownAsymProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  function calculateTimeLeft(): TimeLeft {
    const difference = new Date(countdownTo).getTime() - new Date().getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [countdownTo])

  const formatNumber = (value: number): string => {
    return String(value).padStart(2, '0')
  }

  const timerUnits = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' }
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full h-[500px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] h-full">
        {/* Left Section - Dark Blue with Countdown */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0D3A5D] p-8 md:p-12 flex flex-col justify-center items-center text-white"
        >
          <div className="max-w-2xl w-full space-y-6">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[52px] font-black leading-[0.95] text-center text-white tracking-tight"
              style={{ lineHeight: 0.95 }}
            >
              OFERTA
              <br />
              TERMINA EN:
            </motion.h2>

            {/* Animated Hourglass */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ rotate: [0, 180, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Hourglass
                  className="text-[#FF6B35]"
                  size={80}
                  strokeWidth={2}
                />
              </motion.div>
            </motion.div>

            {/* Countdown Timer - Horizontal Layout */}
            <div className="flex gap-3 md:gap-4 justify-center">
              {timerUnits.map((unit, index) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-[#FF6B35] rounded-xl p-4 text-center min-w-[90px] md:min-w-[110px]"
                >
                  <div className="text-[56px] font-bold leading-none mb-2 text-white">
                    {formatNumber(unit.value)}
                  </div>
                  <div className="text-[14px] text-white font-medium uppercase tracking-wide">
                    {unit.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-gray-300">
                  <span className="font-bold text-white">{personasViendo}</span> personas viendo
                </span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-500"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span className="text-gray-300">
                  Solo <span className="font-bold text-white">{plazasDisponibles}</span> plazas disponibles
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section - Image with Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1648453211847-d81535749d8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Red Sea diving experience"
            fill
            className="object-cover"
            priority
          />

          {/* Darker Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Urgency Text */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-md space-y-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                No Pierdas Esta Oportunidad
              </h3>
              <p className="text-lg md:text-xl text-gray-200">
                Miles de buzos ya han vivido esta experiencia inolvidable.
                <span className="font-semibold text-white"> ¡Reserva ahora!</span>
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="flex flex-wrap gap-3 text-sm"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cancelación gratuita
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Confirma ahora, paga después
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
