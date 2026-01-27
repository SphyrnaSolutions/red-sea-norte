"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"

interface CTAButton {
  text: string
  href: string
  variant?: "primary" | "secondary" | "gradient" | "outline"
}

export interface CTASectionProps {
  title: string
  description?: string
  primaryCTA?: CTAButton
  secondaryCTA?: CTAButton
  variant?: "gradient" | "dark" | "light"
  className?: string
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = "gradient",
  className,
}: CTASectionProps) {
  const variantClasses = {
    gradient: "bg-gradient-cta",
    dark: "bg-secondary-dark",
    light: "bg-bg-gray",
  }

  const textColor = variant === "light" ? "text-text-heading" : "text-white"
  const descColor = variant === "light" ? "text-text-secondary" : "text-white/90"

  return (
    <section className={cn("section-padding", variantClasses[variant], className)}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn("mb-6", textColor)}>
            {title}
          </h2>

          {description && (
            <p className={cn("text-xl mb-10 leading-relaxed", descColor)}>
              {description}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCTA && (
                <Button
                  variant={primaryCTA.variant || (variant === "light" ? "gradient" : "primary")}
                  size="lg"
                  rounded="pill"
                  className={variant === "light" ? "" : "bg-white text-primary-blue hover:bg-white/90"}
                  onClick={() => window.location.href = primaryCTA.href}
                >
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant={secondaryCTA.variant || "outline"}
                  size="lg"
                  rounded="pill"
                  className={variant === "light" ? "" : "border-white text-white hover:bg-white/10"}
                  onClick={() => window.location.href = secondaryCTA.href}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
