import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { getAllRutasSlugsData, getRutaData } from "@/lib/data"
import type { ItineraryDay, RutaData } from "@/lib/mock-data/types"
import type { Metadata } from 'next'

// Base URL for absolute URLs in structured data
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

// ISR configuration: revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800

interface RutaPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: RutaPageProps): Promise<Metadata> {
  const { slug } = await params
  const ruta = await getRutaData(slug)

  if (!ruta) {
    return {
      title: 'Ruta no encontrada | Red Sea Diving',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'
  const title = ruta.hero.title || ruta.title
  const description = ruta.hero.subtitle || ruta.storyIntro.description

  return {
    title: `${title} | Red Sea Diving`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: ruta.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ruta.hero.backgroundImage],
    },
    alternates: {
      canonical: `${baseUrl}/rutas/${slug}`,
    },
  }
}

// Generate static paths para todas las rutas
export async function generateStaticParams() {
  const rutas = await getAllRutasSlugsData()
  return rutas.map((ruta) => ({
    slug: ruta.slug,
  }))
}

// Generate JSON-LD structured data for TouristTrip schema
function generateJsonLd(ruta: RutaData) {
  // Extract price from infoCards (look for the price card)
  const priceCard = ruta.infoCards?.find(card => card.label.toLowerCase() === 'precio')
  const priceValue = priceCard?.value?.replace(/[^0-9]/g, '') || undefined

  // Build itinerary from days data
  const itinerary = ruta.itinerary?.days?.map(day => ({
    '@type': 'ItemList' as const,
    name: `Día ${day.day}: ${day.title}`,
    description: day.description,
    itemListElement: day.dives.map((dive, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: dive,
    })),
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: ruta.title,
    description: ruta.storyIntro?.description || ruta.hero.subtitle,
    image: ruta.hero.backgroundImage ?
      (ruta.hero.backgroundImage.startsWith('http') ? ruta.hero.backgroundImage : `${BASE_URL}${ruta.hero.backgroundImage}`)
      : undefined,
    touristType: 'Scuba Diving',
    itinerary: itinerary,
    offers: priceValue ? {
      '@type': 'Offer',
      price: priceValue,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/rutas/${ruta.slug}`,
    } : undefined,
    provider: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
    },
  }
}

export default async function RutaPage({ params }: RutaPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  // Data layer handles caching and draft mode internally
  const ruta = await getRutaData(slug)

  if (!ruta) {
    notFound()
  }

  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd(ruta)

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {isEnabled && (
        <div className="fixed top-20 left-0 right-0 z-50 bg-yellow-400 text-black px-6 py-3 text-center font-semibold shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <span>🚧 MODO PREVIEW - Viendo cambios no publicados</span>
            <a
              href="/api/disable-draft"
              className="underline hover:no-underline"
            >
              Salir del preview
            </a>
          </div>
        </div>
      )}
      <HeroRuta ruta={ruta} />
      <StoryIntro ruta={ruta} />
      <ItinerarySection ruta={ruta} />
      <IncludesSection ruta={ruta} />
      <CTAFinal ruta={ruta} />
    </div>
  )
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroRuta({ ruta }: { ruta: RutaData }) {
  const badgeText =
    typeof ruta.hero.badge === "string" ? ruta.hero.badge : ruta.hero.badge?.text

  return (
    <section className="w-full flex flex-col">
      <div className="relative w-full h-[800px] max-md:h-[600px]">
        <Image
          src={ruta.hero.backgroundImage}
          alt={ruta.hero.title}
          fill
          className="object-cover"
          priority
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,12,23,0.12) 0%, rgba(4,12,23,0.25) 35%, rgba(4,12,23,0.88) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end px-[120px] pb-[72px] max-lg:px-[48px] max-md:px-[24px] max-md:pb-[40px]">
          <div className="flex max-w-[900px] flex-col gap-5">
            {badgeText && (
              <span
                className="text-[13px] font-bold uppercase self-start"
                style={{
                  color: "#3DABC2",
                  letterSpacing: "3px",
                }}
              >
                {badgeText}
              </span>
            )}

            <h1
              className="text-white max-md:text-4xl"
              style={{
                fontSize: "56px",
                fontWeight: 800,
                lineHeight: 1,
                fontFamily: "var(--font-sans)",
              }}
            >
              {ruta.hero.title}
            </h1>

            <p
              className="max-w-[760px] text-white max-md:text-base"
              style={{
                fontSize: "18px",
                opacity: 0.78,
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
              }}
            >
              {ruta.hero.subtitle}
            </p>

            {(ruta.hero.primaryCTA || ruta.hero.secondaryCTA) && (
              <div className="flex flex-wrap gap-4 pt-3">
                {ruta.hero.primaryCTA && (
                  <Link
                    href={ruta.hero.primaryCTA.href}
                    className="inline-flex h-[56px] min-w-[240px] items-center justify-center rounded-[14px] bg-[#FF6B35] px-8 text-[17px] font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    {ruta.hero.primaryCTA.text}
                  </Link>
                )}
                {ruta.hero.secondaryCTA && (
                  <Link
                    href={ruta.hero.secondaryCTA.href}
                    className="inline-flex h-[56px] min-w-[240px] items-center justify-center rounded-[14px] border border-white/60 bg-white/10 px-8 text-[17px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0D3A5D]"
                  >
                    {ruta.hero.secondaryCTA.text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="w-full flex gap-[32px] py-[28px] px-[120px] max-md:flex-col max-md:gap-4 max-md:px-[24px]"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        {ruta.infoCards.map((card) => (
          <div key={card.label} className="flex min-w-[180px] flex-1 flex-col gap-2">
            <span
              className="text-white"
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: card.color === "orange" ? "#FF6B35" : card.color === "cyan" ? "#5CE1E6" : "#FFFFFF",
              }}
            >
              {card.value}
            </span>
            <span
              className="text-white text-[13px] uppercase"
              style={{ opacity: 0.67, letterSpacing: "1.5px" }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ============================================================================
// STORY INTRO
// ============================================================================

function StoryIntro({ ruta }: { ruta: RutaData }) {
  return (
    <section
      className="w-full py-[100px] px-[120px] max-lg:py-[60px] max-lg:px-[48px] max-md:py-[48px] max-md:px-[24px]"
      style={{ backgroundColor: "#0A0F1A" }}
    >
      <div className="flex flex-col gap-6 max-w-[900px]">
        <span
          className="text-[11px] font-bold uppercase"
          style={{ color: "#FF6B35", letterSpacing: "4px" }}
        >
          {ruta.storyIntro.badge}
        </span>

        <h2
          className="text-white max-md:text-3xl"
          style={{
            fontSize: "48px",
            fontWeight: 800,
            lineHeight: 1.1,
            fontFamily: "var(--font-sans)",
          }}
        >
          {ruta.storyIntro.title}
        </h2>

        <p
          className="text-white max-md:text-base"
          style={{
            fontSize: "18px",
            opacity: 0.6,
            lineHeight: 1.7,
            fontFamily: "var(--font-sans)",
          }}
        >
          {ruta.storyIntro.description}
        </p>
      </div>
    </section>
  )
}

function ItinerarySection({ ruta }: { ruta: RutaData }) {
  return (
    <section className="w-full bg-[#06111E]">
      <div className="px-[120px] py-[80px] max-lg:px-[48px] max-md:px-[24px] max-md:py-[48px]">
        <div className="mb-12 flex flex-col gap-4">
          <span
            className="text-[11px] font-bold uppercase"
            style={{ color: "#5CE1E6", letterSpacing: "4px" }}
          >
            {ruta.itinerary.title}
          </span>
          <h2
            className="text-white max-md:text-3xl"
            style={{
              fontSize: "48px",
              fontWeight: 800,
              lineHeight: 1.1,
              fontFamily: "var(--font-sans)",
            }}
          >
            Pecios, corrientes y arrecifes en una sola semana
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {ruta.itinerary.days.map((day) => (
            <ItineraryDaySection key={day.day} day={day} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ItineraryDaySection({ day }: { day: ItineraryDay }) {
  const isRight = day.overlayDirection === "right"

  return (
    <article className="relative min-h-[520px] overflow-hidden rounded-[24px] max-md:min-h-[480px]">
      <Image
        src={day.image}
        alt={day.title}
        fill
        className="object-cover"
      />

      <div
        className={`absolute inset-0 flex flex-col justify-center gap-6 px-[64px] py-[64px] max-md:px-[24px] max-md:py-[32px] ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
        style={{
          background: isRight
            ? "linear-gradient(90deg, rgba(6,17,30,0.95) 0%, rgba(6,17,30,0.88) 40%, rgba(6,17,30,0.3) 82%, rgba(6,17,30,0) 100%)"
            : "linear-gradient(270deg, rgba(6,17,30,0.95) 0%, rgba(6,17,30,0.88) 40%, rgba(6,17,30,0.3) 82%, rgba(6,17,30,0) 100%)",
        }}
      >
        <div className={`flex max-w-[560px] flex-col gap-5 ${isRight ? "items-end" : "items-start"}`}>
          <span
            className="text-[13px] font-bold uppercase"
            style={{ color: "#FF6B35", letterSpacing: "3px" }}
          >
            Día {day.day}
          </span>

          <h3
            className="text-white max-md:text-2xl"
            style={{
              fontSize: "38px",
              fontWeight: 800,
              lineHeight: 1.15,
              fontFamily: "var(--font-sans)",
            }}
          >
            {day.title}
          </h3>

          <p
            className="text-white max-md:text-sm"
            style={{
              fontSize: "16px",
              opacity: 0.72,
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            {day.description}
          </p>

          <div className={`flex flex-wrap gap-3 ${isRight ? "justify-end" : "justify-start"}`}>
            {day.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase text-white/90 backdrop-blur-sm"
              >
                {highlight}
              </span>
            ))}
          </div>

          <span
            className="text-[14px]"
            style={{ color: "#5CE1E6" }}
          >
            {day.dives.join(" • ")}
          </span>
        </div>
      </div>
    </article>
  )
}

function IncludesSection({ ruta }: { ruta: RutaData }) {
  return (
    <section className="w-full bg-[#F5E6D3] px-[120px] py-[90px] max-lg:px-[48px] max-md:px-[24px] max-md:py-[48px]">
      <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
        <div className="flex flex-col gap-5">
          <span
            className="text-[11px] font-bold uppercase"
            style={{ color: "#FF6B35", letterSpacing: "4px" }}
          >
            Qué incluye
          </span>
          <h2
            className="max-md:text-3xl"
            style={{
              color: "#0D3A5D",
              fontSize: "48px",
              fontWeight: 800,
              lineHeight: 1.08,
              fontFamily: "var(--font-sans)",
            }}
          >
            {ruta.incluye.title}
          </h2>
          <p
            style={{
              color: "#4A5568",
              fontSize: "18px",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            Todo lo necesario para que la experiencia de liveaboard mantenga el mismo nivel que el diseño y el itinerario.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ruta.incluye.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-[18px] bg-white px-5 py-5 shadow-[0_12px_32px_rgba(10,37,64,0.08)]"
            >
              <span className="mt-[2px] text-[18px] font-bold text-[#FF6B35]">+</span>
              <span
                style={{
                  color: "#0D3A5D",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTAFinal({ ruta }: { ruta: RutaData }) {
  return (
    <section className="relative w-full h-[500px] max-md:h-[400px] overflow-hidden">
      <Image
        src={ruta.cta.backgroundImage || ruta.hero.backgroundImage}
        alt={ruta.cta.title}
        fill
        className="object-cover"
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-[120px] max-lg:px-[48px] max-md:px-[24px] gap-7"
        style={{ backgroundColor: "rgba(10,15,26,0.6)" }}
      >
        <h2
          className="text-white text-center max-md:text-3xl"
          style={{
            fontSize: "44px",
            fontWeight: 800,
            fontFamily: "var(--font-sans)",
          }}
        >
          {ruta.cta.title}
        </h2>

        <p
          className="max-w-[760px] text-white text-center max-md:text-base"
          style={{
            fontSize: "18px",
            opacity: 0.7,
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)",
          }}
        >
          {ruta.cta.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={ruta.cta.primaryCTA.href}
            className="flex h-[60px] min-w-[280px] items-center justify-center rounded-[12px] bg-[#FF6B35] px-8 text-[18px] font-semibold text-white transition-transform hover:scale-105"
          >
            {ruta.cta.primaryCTA.text}
          </Link>
          {ruta.cta.secondaryCTA && (
            <Link
              href={ruta.cta.secondaryCTA.href}
              className="flex h-[60px] min-w-[280px] items-center justify-center rounded-[12px] border border-white/60 bg-white/10 px-8 text-[18px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#0D3A5D]"
            >
              {ruta.cta.secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
