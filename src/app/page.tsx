import { HeroSection } from "@/components/organisms/HeroSection"
import { WhySection } from "@/components/organisms/WhySection"
import { DiveSitesSection } from "@/components/organisms/DiveSitesSection"
import { SpecSection } from "@/components/organisms/SpecSection"
import { LeadFormModal } from "@/components/organisms/LeadFormModal"
import { getHomePageData } from "@/lib/data"

export const revalidate = 600

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Red Sea Norte',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Vida a bordo y buceo en el Mar Rojo Norte. Experiencias únicas de buceo en Egipto.',
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
  description: 'Vida a bordo y buceo en el Mar Rojo Norte',
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
      <WhySection {...homepageData.whySection} />
      <DiveSitesSection {...homepageData.diveSites} />
      <SpecSection {...homepageData.specSection} />
      <LeadFormModal {...homepageData.leadForm} />
    </>
  )
}
