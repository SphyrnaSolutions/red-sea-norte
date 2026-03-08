"use client"

import { useCookieConsentReset } from "@/components/CookieConsent"

export function CookieSettingsButton() {
  const reopenConsent = useCookieConsentReset()

  return (
    <button
      onClick={reopenConsent}
      className="hover:text-white transition-colors cursor-pointer"
    >
      Gestionar Cookies
    </button>
  )
}
