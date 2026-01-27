import Image from "next/image"
import { HeroSection } from "@/components/organisms/HeroSection"
import { CarouselSection } from "@/components/organisms/CarouselSection"
import { ImageCardWithOverlay } from "@/components/molecules/ImageCardWithOverlay"
import { StatsCardDark } from "@/components/molecules/StatsCardDark"
import { InfoCardWhite } from "@/components/molecules/InfoCardWhite"
import { ImageCardSmall } from "@/components/molecules/ImageCardSmall"
import { PriceCard } from "@/components/molecules/PriceCard"
import { BigImageCard } from "@/components/molecules/BigImageCard"
import { SideStackCard } from "@/components/molecules/SideStackCard"
import { NavCard, NavImageCard, NavStatCard } from "@/components/molecules/NavCards"
import { Button } from "@/components/ui/button"
import { homepageData } from "@/lib/mock-data/homepage"

export default function HomePage() {
  const { hero, whySection, specSection, carouselSection } = homepageData

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <HeroSection {...hero} />

      {/* Why Section */}
      <section className="bg-white py-[100px] bg-texture-noise">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 mb-[60px]">
            <h2 className="text-[#2C3E50] text-5xl font-bold leading-[1.2] text-center max-w-[800px] animate-fadeInUp">
              {whySection.title}
            </h2>
            <p className="text-[#6B7280] text-xl leading-[1.5] text-center max-w-[700px] animate-fadeInUp delay-100">
              {whySection.subtitle}
            </p>
          </div>

          {/* Benefits - Top Row */}
          <div className="flex gap-6 mb-6">
            <div className="flex-1 animate-scaleIn delay-200">
              <ImageCardWithOverlay
                image={whySection.benefits.topRow[0].image}
                title={whySection.benefits.topRow[0].title}
                description={whySection.benefits.topRow[0].description}
              />
            </div>
            <div className="flex-1 animate-scaleIn delay-300">
              <StatsCardDark
                badge={whySection.benefits.topRow[1].badge}
                title={whySection.benefits.topRow[1].title}
                stats={whySection.benefits.topRow[1].stats}
                backgroundColor={whySection.benefits.topRow[1].backgroundColor}
              />
            </div>
          </div>

          {/* Benefits - Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            <div className="animate-scaleIn delay-400">
              <InfoCardWhite
                icon={whySection.benefits.bottomRow[0].icon}
                title={whySection.benefits.bottomRow[0].title}
                description={whySection.benefits.bottomRow[0].description}
                cta={whySection.benefits.bottomRow[0].cta}
              />
            </div>
            <div className="animate-scaleIn delay-500">
              <ImageCardSmall
                image={whySection.benefits.bottomRow[1].image}
                subtitle={whySection.benefits.bottomRow[1].subtitle}
                title={whySection.benefits.bottomRow[1].title}
              />
            </div>
            <div className="animate-scaleIn delay-600">
              <PriceCard
                title={whySection.benefits.bottomRow[2].title}
                items={whySection.benefits.bottomRow[2].items}
                backgroundColor={whySection.benefits.bottomRow[2].backgroundColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spec Section */}
      <section className="bg-white py-[80px]">
        <div className="container-custom flex flex-col gap-8">
          {/* Intro */}
          <div className="text-[#F57415] text-sm font-bold tracking-[2px]">
            {specSection.intro}
          </div>

          {/* Row 1 */}
          <div className="flex gap-6">
            <div style={{ width: "850px" }}>
              <BigImageCard
                image={specSection.row1.bigCard.image}
                title={specSection.row1.bigCard.title}
                subtitle={specSection.row1.bigCard.subtitle}
              />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              {specSection.row1.sideCards.map((card: any, index: number) => (
                <div key={index} className="flex-1">
                  <SideStackCard
                    label={card.label}
                    number={card.number}
                    title={card.title}
                    description={card.description}
                    backgroundColor={card.backgroundColor}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Big Text */}
          <h2 className="text-[#2C3E50] text-[72px] font-bold leading-[0.95]">
            {specSection.bigText}
          </h2>

          {/* Row 2 */}
          <div className="flex gap-5">
            <NavCard
              title={specSection.row2[0].title}
              description={specSection.row2[0].description}
              icon={specSection.row2[0].icon}
              backgroundColor={specSection.row2[0].backgroundColor}
            />
            <NavImageCard
              image={specSection.row2[1].image}
              title={specSection.row2[1].title}
              description={specSection.row2[1].description}
            />
            <NavStatCard
              number={specSection.row2[2].number}
              label={specSection.row2[2].label}
              subtitle={specSection.row2[2].subtitle}
              backgroundColor={specSection.row2[2].backgroundColor}
              borderColor={specSection.row2[2].borderColor}
            />
          </div>

          {/* CTA Row */}
          <div className="bg-[#0D3A5D] rounded-[20px] p-12 flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="text-white text-3xl font-bold">
                {specSection.cta.title}
              </h3>
              <p className="text-white/80 text-base">
                {specSection.cta.description}
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              rounded="default"
            >
              {specSection.cta.buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <CarouselSection
        label={carouselSection.label}
        title={carouselSection.title}
        slides={carouselSection.slides}
      />
    </div>
  )
}
