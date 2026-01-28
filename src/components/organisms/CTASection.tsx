"use client"

import { useModalStore } from "@/lib/stores/useModalStore"

interface CTASectionProps {
  title?: string
  description?: string
  buttonText?: string
  backgroundColor?: string
}

export function CTASection({
  title = "¿Listo para Bucear?",
  description = "Reserva tu plaza y comienza tu aventura submarina",
  buttonText = "Reservar Ahora",
  backgroundColor = "#0A2540",
}: CTASectionProps) {
  const { openModal } = useModalStore()

  return (
    <section className="py-24" style={{ backgroundColor }}>
      <div className="container-custom text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">{description}</p>
        <button
          onClick={openModal}
          className="bg-[#FF5722] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#F4511E] hover:shadow-lg transition-all duration-300"
        >
          {buttonText}
        </button>
      </div>
    </section>
  )
}
