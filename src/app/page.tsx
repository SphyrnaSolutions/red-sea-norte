import { HeroSection } from "@/components/organisms/HeroSection"
import { WhySection } from "@/components/organisms/WhySection"
import { DiveSitesSection } from "@/components/organisms/DiveSitesSection"
import { SpecSection } from "@/components/organisms/SpecSection"
import { LeadFormModal } from "@/components/organisms/LeadFormModal"
import { homepageData } from "@/lib/mock-data/homepage"

export default function HomePage() {
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
