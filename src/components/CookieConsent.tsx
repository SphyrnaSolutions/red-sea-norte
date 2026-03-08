"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

declare function gtag(...args: unknown[]): void

const COOKIE_CONSENT_KEY = "cookie-consent"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)

    if (consent === "accepted") {
      gtag("consent", "update", {
        analytics_storage: "granted",
      })
    } else if (consent === null) {
      setShowBanner(true)
    }
    // If "rejected", do nothing -- GA4 stays in denied mode
  }, [])

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    gtag("consent", "update", {
      analytics_storage: "granted",
    })
    setShowBanner(false)
  }

  function handleReject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[var(--color-ocean-deep)]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:py-3">
        <p className="flex-1 font-sans text-sm leading-relaxed text-white/80">
          Usamos cookies anal&iacute;ticas para mejorar tu experiencia. Puedes
          aceptar o rechazar su uso.{" "}
          <Link
            href="/politica-de-privacidad"
            className="underline underline-offset-2 transition-colors hover:text-white"
          >
            Pol&iacute;tica de privacidad
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="cursor-pointer rounded-md border border-white/20 px-4 py-2 font-sans text-sm font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="cursor-pointer rounded-md bg-[var(--color-coral-fire)] px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-[var(--color-coral-ember)]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
