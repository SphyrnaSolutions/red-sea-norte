import type { Metadata } from "next"
import { HeroSection } from "@/components/organisms/HeroSection"
import { RouteValueSection } from "@/components/organisms/RouteValueSection"
import { DiveSitesSection } from "@/components/organisms/DiveSitesSection"
import { JourneyOverviewSection } from "@/components/organisms/JourneyOverviewSection"
import { AudienceFitSection } from "@/components/organisms/AudienceFitSection"
import { InlineLeadSection } from "@/components/organisms/InlineLeadSection"
import { RouteTeaserSection } from "@/components/organisms/RouteTeaserSection"
import { LeadFormModal } from "@/components/organisms/LeadFormModal"
import { getHomePageData } from "@/lib/data"

// ISR: revalidate every 10 minutes
export const revalidate = 600

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Vida a bordo en el Mar Rojo desde Hurghada | Ruta Norte y Pecios",
  description:
    "Ruta Norte y Pecios desde Hurghada: vida a bordo en el Mar Rojo con spots iconicos, enfoque comercial claro y opcion de Advanced SSI a bordo.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Vida a bordo en el Mar Rojo desde Hurghada | Ruta Norte y Pecios",
    description:
      "Safari de buceo por la Ruta Norte del Mar Rojo desde Hurghada con Thistlegorm, Abu Nuhas y Ras Mohammed.",
    type: "website",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/images/underwater/underwater-diver-pink-soft-coral.jpg`,
        width: 1200,
        height: 630,
        alt: "Buceador junto a coral rosa en el Mar Rojo - Vida a bordo Ruta Norte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vida a bordo en el Mar Rojo desde Hurghada",
    description:
      "Ruta Norte y Pecios desde Hurghada con vida a bordo y opcion de Advanced SSI a bordo.",
    images: [`${BASE_URL}/images/underwater/underwater-diver-pink-soft-coral.jpg`],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Red Sea Norte',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Vida a bordo en el Mar Rojo desde Hurghada con foco en Ruta Norte, pecios y experiencias de buceo.',
  // telephone: '+34-XXX-XXX-XXX', // TODO: add real phone number
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hurghada',
    addressCountry: 'EG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.2579,
    longitude: 33.8116,
  },
  areaServed: {
    '@type': 'Place',
    name: 'Red Sea, Egypt',
  },
  sameAs: [
    'https://www.instagram.com/karlossimon/',
    'https://www.facebook.com/viajeskarlossimon',
    'https://www.tiktok.com/@karlossimon',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Red Sea Norte',
  url: BASE_URL,
  description: 'Vida a bordo en el Mar Rojo desde Hurghada, Ruta Norte y Pecios',
}

export default async function HomePage() {
  const homepageData = await getHomePageData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <HeroSection {...homepageData.hero} />

      {/* Lead capture CTA -- promoted above the fold, right after hero */}
      <InlineLeadSection {...homepageData.inlineLead} />

      {/* Route-first content positioning: core product before supporting sections */}
      <RouteTeaserSection {...homepageData.routeTeaser} />
      <RouteValueSection {...homepageData.routeValueSection} />
      <DiveSitesSection {...homepageData.diveSites} />

      {/* Supporting content */}
      <JourneyOverviewSection {...homepageData.journeyOverview} />
      <AudienceFitSection {...homepageData.audienceFit} />

      <LeadFormModal {...homepageData.leadForm} />
    </>
  )
}
