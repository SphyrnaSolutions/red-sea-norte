"use client"

import { Button } from "@/components/ui/button"
import { useModalStore } from "@/stores/useModalStore"

interface CTAButton {
  text: string
  href: string
  actionType?: "scroll" | "modal" | "link"
  target?: string
}

interface RouteTeaserSectionProps {
  eyebrow: string
  title: string
  description: string
  primaryCTA: CTAButton
  secondaryCTA?: CTAButton
}

export function RouteTeaserSection({
  eyebrow,
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: RouteTeaserSectionProps) {
  const { openModal } = useModalStore()

  const handleCTA = (cta: CTAButton) => {
    if (cta.actionType === "modal") {
      openModal()
      return
    }

    if (cta.actionType === "scroll" || cta.href.startsWith("#")) {
      const targetId = cta.target || cta.href.replace("#", "")
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      return
    }

    window.location.href = cta.href
  }

  return (
    <section id="route-teaser" className="w-full bg-[#0C324F] py-20 text-white md:py-24">
      <div className="container-custom">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-8 md:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#5CE1E6]">
            {eyebrow}
          </p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h2
                className="text-4xl font-bold leading-tight md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/78">{description}</p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <Button
                size="lg"
                className="bg-[#F57415] text-white hover:bg-[#DA630C]"
                onClick={() => handleCTA(primaryCTA)}
              >
                {primaryCTA.text}
              </Button>
              {secondaryCTA && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-transparent text-white hover:bg-white hover:text-[#0C324F]"
                  onClick={() => handleCTA(secondaryCTA)}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
