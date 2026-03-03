import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { getAllExperienciasSlugsData, getExperienciaData } from "@/lib/data"
import type { ExperienciaData, ExperienciaSection } from "@/lib/mock-data/types"
import { LeadFormModal } from "@/components/organisms/LeadFormModal"
import { CTAButton } from "./CTAButton"

interface ExperienciaPageProps {
  params: Promise<{
    slug: string
  }>
}

type YearSectionData = Extract<ExperienciaSection, { type: "year" }>
type SplitImmersiveSectionData = Extract<ExperienciaSection, { type: "split_immersive" }>
type DepthSectionData = Extract<ExperienciaSection, { type: "depth" }>
type ImageGridSectionData = Extract<ExperienciaSection, { type: "image_grid" }>
type RequirementsSectionData = Extract<ExperienciaSection, { type: "requirements" }>
type TextOverlayFullSectionData = Extract<ExperienciaSection, { type: "text_overlay_full" }>

interface RichTextSectionData {
  type: "rich_text"
  id: string
  value: {
    content: string
  }
}

interface HeadingSectionData {
  type: "heading"
  id: string
  value: {
    level: number
    text: string
  }
}

interface ImageSectionData {
  type: "image"
  id: string
  value: {
    url: string
    caption?: string
    alt?: string
  }
}

interface QuoteSectionData {
  type: "quote"
  id: string
  value: {
    text: string
    author?: string
    role?: string
  }
}

interface InfoCardsSectionData {
  type: "info_cards"
  id: string
  value: {
    cards: Array<{
      icon: string
      value: string
      label: string
      color: string
    }>
  }
}

interface GallerySectionData {
  type: "gallery"
  id: string
  value: {
    images: Array<{
      url: string
      alt?: string
    }>
  }
}

interface TwoColumnSectionData {
  type: "two_column"
  id: string
  value: {
    leftColumn: {
      image: string
      alt?: string
    }
    rightColumn: {
      title: string
      content: string
    }
  }
}

interface CTASectionData {
  type: "cta"
  id: string
  value: {
    title: string
    description: string
    primaryCTA: {
      text: string
      href: string
    }
  }
}

// Add after imports, before generateStaticParams
export async function generateMetadata({ params }: ExperienciaPageProps): Promise<Metadata> {
  const { slug } = await params
  const experiencia = await getExperienciaData(slug)

  if (!experiencia) {
    return {
      title: 'Experiencia no encontrada | Red Sea Diving',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

  // Use dedicated SEO fields
  const title = experiencia.seo.metaTitle || experiencia.title
  const description = experiencia.seo.metaDescription || experiencia.description
  const keywords = experiencia.seo.keywords

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: experiencia.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: experiencia.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [experiencia.hero.backgroundImage],
    },
    alternates: {
      canonical: `${baseUrl}/experiencias/${slug}`,
    },
  }
}

// Generate static paths for all experiencias
export async function generateStaticParams() {
  const experiencias = await getAllExperienciasSlugsData()
  return experiencias.map((exp) => ({ slug: exp.slug }))
}

// ISR configuration: revalidate every 30 minutes
export const revalidate = 1800

// Base URL for structured data and canonical URLs
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

export default async function ExperienciaPage({ params }: ExperienciaPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  // Fetch data using the data layer (handles draft mode internally)
  const experiencia = await getExperienciaData(slug)

  if (!experiencia) {
    notFound()
  }

  // JSON-LD structured data for TouristTrip schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: experiencia.title,
    description: experiencia.seo?.metaDescription || experiencia.description,
    image: experiencia.hero?.backgroundImage ? `${BASE_URL}${experiencia.hero.backgroundImage}` : undefined,
    touristType: 'Scuba Diving Experience',
    provider: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
      sameAs: BASE_URL,
    },
    url: `${BASE_URL}/experiencias/${experiencia.slug}`,
  }

  return (
    <div className="pt-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Draft Mode Banner */}
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

      {/* Hero Section */}
      <HeroExperiencia experiencia={experiencia} />

      {/* Dynamic Sections */}
      <section className="w-full">
        {experiencia.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </section>

      {/* Lead Form Modal */}
      <LeadFormModal {...experiencia.leadForm} />
    </div>
  )
}

/* ===========================
   Hero Section
   =========================== */

function HeroExperiencia({ experiencia }: { experiencia: ExperienciaData }) {
  return (
    <section className="relative w-full h-[900px] max-md:h-[700px]">
      {/* Background Image */}
      <Image
        src={experiencia.hero.backgroundImage}
        alt={experiencia.title}
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[120px] max-lg:px-[48px] max-md:px-[24px]">
        {experiencia.hero.badge && (
          <span
            className="text-xs font-bold uppercase tracking-[4px] mb-6"
            style={{ color: '#FFFFFF', letterSpacing: '4px' }}
          >
            {typeof experiencia.hero.badge === 'string'
              ? experiencia.hero.badge
              : experiencia.hero.badge.text}
          </span>
        )}

        <h1
          className="text-white text-center mb-5 max-md:text-7xl whitespace-pre-line"
          style={{
            fontSize: '120px',
            fontWeight: 800,
            lineHeight: 0.9,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {experiencia.hero.title}
        </h1>

        <p
          className="text-white text-center max-md:text-lg"
          style={{
            fontSize: '20px',
            fontWeight: 'normal',
            letterSpacing: '2px',
            opacity: 0.9,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {experiencia.hero.subtitle}
        </p>
      </div>
    </section>
  )
}

/* ===========================
   Section Renderer
   =========================== */

function SectionRenderer({ section }: { section: ExperienciaSection }) {
  switch (section.type) {
    // Bloques específicos de experiencias
    case 'year':
      return <YearSection section={section as YearSectionData} />
    case 'split_immersive':
      return <SplitImmersiveSection section={section as SplitImmersiveSectionData} />
    case 'depth':
      return <DepthSection section={section as DepthSectionData} />
    case 'image_grid':
      return <ImageGridSection section={section as ImageGridSectionData} />
    case 'requirements':
      return <RequirementsSection section={section as RequirementsSectionData} />
    case 'text_overlay_full':
      return <TextOverlayFullSection section={section as TextOverlayFullSectionData} />

    // Bloques del blog (reutilizados)
    case 'rich_text':
      return <RichTextBlock section={section as RichTextSectionData} />
    case 'heading':
      return <HeadingBlock section={section as HeadingSectionData} />
    case 'image':
      return <ImageBlock section={section as ImageSectionData} />
    case 'quote':
      return <QuoteBlock section={section as QuoteSectionData} />
    case 'info_cards':
      return <InfoCardsBlock section={section as InfoCardsSectionData} />
    case 'gallery':
      return <GalleryBlock section={section as GallerySectionData} />
    case 'two_column':
      return <TwoColumnBlock section={section as TwoColumnSectionData} />
    case 'cta':
      return <CTABlock section={section as CTASectionData} />

    default:
      return null
  }
}

/* ===========================
   Year Section Component
   =========================== */

function YearSection({ section }: { section: YearSectionData }) {
  const { year, title, image, backgroundColor = "#0D3A5D" } = section.value

  return (
    <section className="w-full h-[600px] max-md:h-auto max-md:flex-col flex">
      {/* Left Side - Year Info */}
      <div
        className="w-1/2 max-md:w-full h-full flex flex-col items-center justify-center gap-6 px-[80px] py-[80px] max-md:px-[24px] max-md:py-[60px]"
        style={{ backgroundColor }}
      >
        <h2
          className="text-center max-md:text-8xl"
          style={{
            fontSize: '160px',
            fontWeight: 900,
            lineHeight: 0.8,
            color: '#FF6B35',
            fontFamily: 'var(--font-sans)'
          }}
        >
          {year}
        </h2>

        <div
          className="w-[120px] h-[4px]"
          style={{
            backgroundColor: '#FFFFFF',
            opacity: 0.3
          }}
        />

        <h3
          className="text-white text-center whitespace-pre-line max-md:text-xl"
          style={{
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '2px',
            lineHeight: 1.3,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {title}
        </h3>
      </div>

      {/* Right Side - Image */}
      <div className="relative w-1/2 max-md:w-full h-full max-md:h-[400px]">
        <Image
          src={image}
          alt={`Year ${year}`}
          fill
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        />
      </div>
    </section>
  )
}

/* ===========================
   Split Immersive Section Component
   =========================== */

function SplitImmersiveSection({ section }: { section: SplitImmersiveSectionData }) {
  const { layout, image, title, content, ctaButton, backgroundColor = "#000000" } = section.value
  const isImageLeft = layout === "image-left"

  return (
    <section className="w-full h-[800px] max-md:h-auto max-md:flex-col flex">
      {/* Image Side */}
      <div className={`relative w-1/2 max-md:w-full h-full max-md:h-[500px] ${isImageLeft ? 'order-1' : 'order-2 max-md:order-1'}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Side */}
      <div
        className={`w-1/2 max-md:w-full h-full flex flex-col justify-center gap-8 px-[80px] py-[80px] max-md:px-[24px] max-md:py-[60px] ${isImageLeft ? 'order-2' : 'order-1 max-md:order-2'}`}
        style={{ backgroundColor }}
      >
        <h2
          className="text-white whitespace-pre-line max-md:text-4xl"
          style={{
            fontSize: '64px',
            fontWeight: 800,
            lineHeight: 1,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {title}
        </h2>

        <p
          className="text-white whitespace-pre-line max-md:text-lg"
          style={{
            fontSize: '20px',
            fontWeight: 'normal',
            lineHeight: 1.7,
            opacity: 0.9,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {content}
        </p>

        {ctaButton && (
          <CTAButton
            text={ctaButton.text}
            className="flex items-center justify-center rounded-[30px] transition-transform hover:scale-105 mt-4"
            style={{
              backgroundColor: '#FF6B35',
              height: '60px',
              width: '240px'
            }}
          />
        )}
      </div>
    </section>
  )
}

/* ===========================
   Depth Section Component
   =========================== */

function DepthSection({ section }: { section: DepthSectionData }) {
  const { depth, unit, subtitle, image, overlayGradient } = section.value

  return (
    <section className="relative w-full h-[700px] max-md:h-[600px]">
      {/* Background Image */}
      <Image
        src={image}
        alt={`${depth} ${unit}`}
        fill
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: overlayGradient || 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(255,107,53,0.9) 100%)'
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <h2
          className="text-white text-center max-md:text-9xl"
          style={{
            fontSize: '220px',
            fontWeight: 900,
            lineHeight: 0.75,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {depth}
        </h2>

        <span
          className="text-white text-center"
          style={{
            fontSize: '48px',
            fontWeight: 900,
            letterSpacing: '8px',
            fontFamily: 'var(--font-sans)'
          }}
        >
          {unit}
        </span>

        <p
          className="text-white text-center max-md:text-lg"
          style={{
            fontSize: '22px',
            fontWeight: 600,
            opacity: 0.9,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  )
}

/* ===========================
   Image Grid Section Component
   =========================== */

function ImageGridSection({ section }: { section: ImageGridSectionData }) {
  const { images, layout } = section.value

  if (layout === "1-large-2-small") {
    return (
      <section className="w-full flex flex-col gap-1">
        {/* Large Image */}
        <div className="relative w-full h-[500px] max-md:h-[400px]">
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            className="object-cover"
          />

          {images[0].overlay && (
            <div
              className="absolute inset-0 flex items-center justify-start px-[80px] max-md:px-[24px]"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)'
              }}
            >
              <div className="flex flex-col gap-3 max-w-[500px]">
                {images[0].overlay.title && (
                  <h3
                    className="text-white max-md:text-2xl"
                    style={{
                      fontSize: '38px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {images[0].overlay.title}
                  </h3>
                )}
                {images[0].overlay.description && (
                  <p
                    className="text-white max-md:text-base"
                    style={{
                      fontSize: '18px',
                      opacity: 0.9,
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {images[0].overlay.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Two Small Images */}
        <div className="flex gap-1 max-md:flex-col">
          {images.slice(1, 3).map((img, idx: number) => (
            <div key={idx} className="relative w-1/2 max-md:w-full h-[400px] max-md:h-[300px]">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
              />

              {img.overlay && (
                <div
                  className="absolute inset-0 flex items-end justify-start p-[40px] max-md:p-[24px]"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)'
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {img.overlay.title && (
                      <h4
                        className="text-white max-md:text-xl"
                        style={{
                          fontSize: '28px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-sans)'
                        }}
                      >
                        {img.overlay.title}
                      </h4>
                    )}
                    {img.overlay.description && (
                      <p
                        className="text-white max-md:text-sm"
                        style={{
                          fontSize: '16px',
                          opacity: 0.8,
                          fontFamily: 'var(--font-sans)'
                        }}
                      >
                        {img.overlay.description}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Default: simple grid
  return null
}

/* ===========================
   Requirements Section Component
   =========================== */

function RequirementsSection({ section }: { section: RequirementsSectionData }) {
  const { title, subtitle, backgroundColor = "#000000" } = section.value

  return (
    <section
      className="w-full h-[500px] max-md:h-[400px] flex flex-col items-center justify-center gap-10 px-[120px] max-lg:px-[48px] max-md:px-[24px]"
      style={{ backgroundColor }}
    >
      <h2
        className="text-white text-center max-md:text-4xl"
        style={{
          fontSize: '52px',
          fontWeight: 900,
          letterSpacing: '2px',
          fontFamily: 'var(--font-sans)'
        }}
      >
        {title}
      </h2>

      <p
        className="text-white text-center max-w-[700px] max-md:text-lg"
        style={{
          fontSize: '22px',
          fontWeight: 'normal',
          opacity: 0.8,
          fontFamily: 'var(--font-sans)'
        }}
      >
        {subtitle}
      </p>
    </section>
  )
}

/* ===========================
   Text Overlay Full Section Component
   =========================== */

function TextOverlayFullSection({ section }: { section: TextOverlayFullSectionData }) {
  const { image, title, subtitle, alignment = "center", overlayGradient, ctaButton } = section.value

  return (
    <section className="relative w-full h-[700px] max-md:h-[600px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background: overlayGradient || 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />

      <div className={`absolute inset-0 flex flex-col justify-center px-[120px] max-lg:px-[48px] max-md:px-[24px] gap-10 ${
        alignment === 'center' ? 'items-center text-center' :
        alignment === 'left' ? 'items-start text-left' :
        'items-end text-right'
      }`}>
        <h2
          className="text-white max-md:text-4xl"
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="text-white max-md:text-lg"
            style={{
              fontSize: '24px',
              opacity: 0.9,
              fontFamily: 'var(--font-sans)'
            }}
          >
            {subtitle}
          </p>
        )}

        {ctaButton && (
          <CTAButton
            text={ctaButton.text}
            className="flex items-center justify-center rounded-[35px] transition-transform hover:scale-105 mt-4"
            style={{
              backgroundColor: '#FF6B35',
              height: '70px',
              width: '300px'
            }}
          />
        )}
      </div>
    </section>
  )
}

/* ===========================
   Blog Blocks (Reused)
   =========================== */

function RichTextBlock({ section }: { section: RichTextSectionData }) {
  return (
    <div className="w-full max-w-[800px] px-[24px] mb-10">
      <div
        className="prose prose-lg max-w-none"
        style={{
          color: '#333333',
          fontSize: '20px',
          lineHeight: 1.7,
          fontFamily: 'var(--font-sans)'
        }}
        dangerouslySetInnerHTML={{ __html: section.value.content }}
      />
    </div>
  )
}

function HeadingBlock({ section }: { section: HeadingSectionData }) {
  const { level, text } = section.value
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements

  return (
    <div className="w-full max-w-[800px] px-[24px] mb-8">
      <Tag
        style={{
          fontSize: level === 2 ? '36px' : '28px',
          fontWeight: 800,
          color: '#0D3A5D',
          fontFamily: 'var(--font-sans)'
        }}
      >
        {text}
      </Tag>
    </div>
  )
}

function ImageBlock({ section }: { section: ImageSectionData }) {
  const { url, caption, alt } = section.value

  return (
    <div className="w-full max-w-[1000px] px-[24px] mb-10">
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <Image
          src={url}
          alt={alt || ""}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <p
          className="mt-3 text-center"
          style={{
            fontSize: '14px',
            color: '#666666',
            fontStyle: 'italic',
            fontFamily: 'var(--font-sans)'
          }}
        >
          {caption}
        </p>
      )}
    </div>
  )
}

function QuoteBlock({ section }: { section: QuoteSectionData }) {
  const { text, author, role } = section.value

  return (
    <div className="w-full max-w-[800px] px-[24px] my-12">
      <blockquote
        className="border-l-4 pl-6"
        style={{
          borderColor: '#FF6B35',
          fontStyle: 'italic',
          fontSize: '24px',
          lineHeight: 1.6,
          color: '#0D3A5D',
          fontFamily: 'var(--font-sans)'
        }}
      >
        &quot;{text}&quot;
        {(author || role) && (
          <footer className="mt-4 text-base font-normal not-italic" style={{ color: '#666666' }}>
            - {author}{role && `, ${role}`}
          </footer>
        )}
      </blockquote>
    </div>
  )
}

function InfoCardsBlock({ section }: { section: InfoCardsSectionData }) {
  const { cards } = section.value

  return (
    <div className="w-full max-w-[1000px] px-[24px] mb-12">
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">
        {cards.map((card, idx: number) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-3 p-8 rounded-lg"
            style={{ backgroundColor: '#F5F9FC' }}
          >
            <span style={{ fontSize: '32px' }}>{card.icon}</span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 800,
                color: card.color,
                fontFamily: 'var(--font-sans)'
              }}
            >
              {card.value}
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#666666',
                fontFamily: 'var(--font-sans)'
              }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GalleryBlock({ section }: { section: GallerySectionData }) {
  const { images } = section.value

  return (
    <div className="w-full max-w-[1200px] px-[24px] mb-12">
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
        {images.map((img, idx: number) => (
          <div key={idx} className="relative w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={img.url}
              alt={img.alt || ""}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function TwoColumnBlock({ section }: { section: TwoColumnSectionData }) {
  const { leftColumn, rightColumn } = section.value

  return (
    <div className="w-full max-w-[1000px] px-[24px] mb-12">
      <div className="flex gap-8 max-md:flex-col">
        <div className="w-1/2 max-md:w-full relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={leftColumn.image}
            alt={leftColumn.alt || ""}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 max-md:w-full flex flex-col justify-center gap-4">
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#0D3A5D',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {rightColumn.title}
          </h3>
          <div
            className="prose"
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: '#333333',
              fontFamily: 'var(--font-sans)'
            }}
            dangerouslySetInnerHTML={{ __html: rightColumn.content }}
          />
        </div>
      </div>
    </div>
  )
}

function CTABlock({ section }: { section: CTASectionData }) {
  const { title, description, primaryCTA } = section.value

  return (
    <div className="w-full max-w-[800px] px-[24px] my-16">
      <div
        className="flex flex-col items-center gap-6 p-12 rounded-xl"
        style={{ backgroundColor: '#0D3A5D' }}
      >
        <h3
          className="text-white text-center"
          style={{
            fontSize: '32px',
            fontWeight: 800,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {title}
        </h3>
        <p
          className="text-white text-center"
          style={{
            fontSize: '18px',
            opacity: 0.9,
            fontFamily: 'var(--font-sans)'
          }}
        >
          {description}
        </p>
        <Link
          href={primaryCTA.href}
          className="flex items-center justify-center rounded-lg transition-transform hover:scale-105"
          style={{
            backgroundColor: '#FF6B35',
            height: '56px',
            paddingLeft: '32px',
            paddingRight: '32px'
          }}
        >
          <span
            className="text-white font-semibold"
            style={{
              fontSize: '16px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {primaryCTA.text}
          </span>
        </Link>
      </div>
    </div>
  )
}
