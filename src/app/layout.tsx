import type { Metadata } from "next"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"
import { FloatingWhatsApp } from "@/components/atoms/FloatingWhatsApp"
import { MobileCTABar } from "@/components/organisms/MobileCTABar"
import { CookieConsent } from "@/components/CookieConsent"
import { satoshi, clashDisplay, jetbrainsMono } from "@/lib/fonts"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://buceoenelmarrojo.com"),
  title: "Red Sea Diving - Centro de Buceo Certificado SSI en el Mar Rojo",
  description: "Cursos de buceo SSI, rutas por el Mar Rojo Norte y experiencias únicas de buceo en pecios. Certificación profesional con los mejores instructores.",
  keywords: ["buceo", "Mar Rojo", "SSI", "cursos de buceo", "pecios", "Egipto", "diving"],
  authors: [{ name: "Red Sea Diving" }],
  openGraph: {
    title: "Red Sea Diving - Centro de Buceo Certificado SSI",
    description: "Cursos de buceo SSI y rutas por el Mar Rojo",
    type: "website",
    locale: "es_ES",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="es" className={`${satoshi.variable} ${clashDisplay.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        <Script id="gtag-consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});`}
        </Script>
        {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileCTABar />
        <CookieConsent />
      </body>
    </html>
  )
}
