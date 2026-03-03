import { HeroSection } from "@/components/organisms/HeroSection"
import { WhySection } from "@/components/organisms/WhySection"
import { DiveSitesSection } from "@/components/organisms/DiveSitesSection"
import { SpecSection } from "@/components/organisms/SpecSection"
import { ProofAsym } from "@/components/organisms/ProofAsym"
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
      <ProofAsym
        testimonios={[
          {
            name: "Carlos M.",
            text: "La mejor experiencia de buceo de mi vida. El pecio del Thistlegorm es impresionante y los instructores son increíbles. Repetimos seguro.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&cs=tinysrgb&fit=crop&h=400&w=400&q=80",
            rating: 5,
            date: "Febrero 2026",
          },
          {
            name: "María L.",
            text: "Hicimos la ruta norte completa y cada inmersión fue mejor que la anterior. El arrecife de Ras Mohammed nos dejó sin palabras.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&cs=tinysrgb&fit=crop&h=400&w=400&q=80",
            rating: 5,
            date: "Enero 2026",
          },
          {
            name: "Alejandro R.",
            text: "Saqué mi certificación SSI Advanced con ellos. Profesionales, cercanos y con una pasión por el Mar Rojo que se contagia.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=faces&cs=tinysrgb&fit=crop&h=400&w=400&q=80",
            rating: 5,
            date: "Diciembre 2025",
          },
        ]}
      />
      <LeadFormModal {...homepageData.leadForm} />
    </>
  )
}
