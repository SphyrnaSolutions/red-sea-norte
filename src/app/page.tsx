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

// Render on demand, fetch-level caching in client.ts handles ISR
export const dynamic = 'force-dynamic'

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Vida a bordo en el Mar Rojo desde Hurghada",
    description:
      "Ruta Norte y Pecios desde Hurghada con vida a bordo y opcion de Advanced SSI a bordo.",
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Red Sea Norte',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Vida a bordo en el Mar Rojo desde Hurghada con foco en Ruta Norte, pecios y experiencias de buceo.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'EG',
  },
  sameAs: [
    // Add social media URLs if available
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Red Sea Norte',
  url: BASE_URL,
  description: 'Vida a bordo en el Mar Rojo desde Hurghada, Ruta Norte y Pecios',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
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
      <RouteValueSection {...homepageData.routeValueSection} />
      <DiveSitesSection {...homepageData.diveSites} />
      <JourneyOverviewSection {...homepageData.journeyOverview} />
      <AudienceFitSection {...homepageData.audienceFit} />
      <InlineLeadSection {...homepageData.inlineLead} />
      <RouteTeaserSection {...homepageData.routeTeaser} />
      <LeadFormModal {...homepageData.leadForm} />
    </>
  )
}
