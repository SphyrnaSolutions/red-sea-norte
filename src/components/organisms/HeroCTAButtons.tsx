"use client"

import { Button } from "@/components/ui/button"
import { useModalStore } from "@/stores/useModalStore"

interface CTAItem {
  text: string
  variant: string
  actionType?: "scroll" | "modal" | "link"
  target?: string
  href?: string
}

interface HeroCTAButtonsProps {
  ctas: CTAItem[]
}

export function HeroCTAButtons({ ctas }: HeroCTAButtonsProps) {
  const { openModal } = useModalStore()

  const handleCTA = (cta: CTAItem) => {
    if (cta.actionType === "modal") {
      openModal()
      return
    }

    if (cta.actionType === "scroll" || (!cta.actionType && cta.href?.startsWith("#"))) {
      const sectionId = cta.target || cta.href?.replace("#", "")
      if (!sectionId) return

      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      return
    }

    if (cta.actionType === "link" || cta.href) {
      window.location.assign(cta.href || "#")
      return
    }

    openModal()
  }

  return (
    <div className="flex flex-wrap gap-4 mt-4 animate-fadeInUp delay-300 justify-center">
      {ctas.map((cta, index) => (
        <Button
          key={index}
          onClick={() => handleCTA(cta)}
          variant={cta.variant === "primary" ? "primary" : "outline"}
          size="lg"
          className={
            cta.variant === "primary"
              ? "bg-[#FF5722] hover:bg-[#F4511E] text-white border-0 shadow-[0_4px_24px_rgba(255,87,34,0.4)] hover:shadow-[0_8px_32px_rgba(255,87,34,0.6)] hover:scale-[1.03] transition-all duration-300 font-semibold text-lg px-12 h-14 min-w-[240px]"
              : "border-2 border-white/90 text-white hover:bg-white hover:text-[#0A2540] backdrop-blur-sm transition-all duration-300 font-semibold text-lg px-12 h-14 min-w-[240px] hover:scale-[1.03]"
          }
        >
          {cta.text}
        </Button>
      ))}
    </div>
  )
}
