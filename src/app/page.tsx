import { HeroSection } from "@/components/organisms/HeroSection"
import { WhySection } from "@/components/organisms/WhySection"
import { DiveSitesSection } from "@/components/organisms/DiveSitesSection"
import { SpecSection } from "@/components/organisms/SpecSection"
import { LeadFormModal } from "@/components/organisms/LeadFormModal"
import { getHomePageData } from "@/lib/data"

export const revalidate = 600

export default async function HomePage() {
  const homepageData = await getHomePageData()

  return (
    <>
      <HeroSection {...homepageData.hero} />
      <WhySection {...homepageData.whySection} />
      <DiveSitesSection {...homepageData.diveSites} />
      <SpecSection {...homepageData.specSection} />
      <LeadFormModal {...homepageData.leadForm} />
    </>
  )
}
