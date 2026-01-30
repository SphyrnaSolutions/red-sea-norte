import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getAllOfertasSlugsData, getOfertaData } from '@/lib/data'
import { HeroOffer } from '@/components/organisms/HeroOffer'
import CountdownAsym from '@/components/organisms/CountdownAsym'
import { IncludesAsym } from '@/components/organisms/IncludesAsym'
import { ProofAsym } from '@/components/organisms/ProofAsym'
import { FinalDiagonal } from '@/components/organisms/FinalDiagonal'
import { GuaranteeBar } from '@/components/organisms/GuaranteeBar'
import { Guarantee } from '@/components/organisms/Guarantee'
import { LeadFormModal } from '@/components/organisms/LeadFormModal'

interface OfertaPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: OfertaPageProps): Promise<Metadata> {
  const { slug } = await params
  const oferta = await getOfertaData(slug)

  if (!oferta) {
    return {
      title: 'Oferta no encontrada | Red Sea Diving',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'
  const title = oferta.hero.title || `Oferta ${oferta.badge}`
  const description = oferta.hero.subtitle || `Oferta especial de buceo en el Mar Rojo - ${oferta.badge}`

  return {
    title: `${title} | Red Sea Diving`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        {
          url: oferta.hero.backgroundImage,
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
      images: [oferta.hero.backgroundImage],
    },
    alternates: {
      canonical: `${baseUrl}/ofertas/${slug}`,
    },
  }
}

export default async function OfertaPage({ params }: OfertaPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  // Data layer handles draft mode and caching internally
  const oferta = await getOfertaData(slug)

  if (!oferta) {
    notFound()
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

  // JSON-LD structured data for Product with Offer schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: oferta.hero.title,
    description: oferta.hero.subtitle,
    image: oferta.hero.backgroundImage
      ? oferta.hero.backgroundImage.startsWith('http')
        ? oferta.hero.backgroundImage
        : `${BASE_URL}${oferta.hero.backgroundImage}`
      : undefined,
    offers: {
      '@type': 'Offer',
      price: oferta.precio.actual,
      priceCurrency: oferta.precio.moneda || 'EUR',
      availability: oferta.urgencia.plazasDisponibles > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      validThrough: oferta.urgencia.countdownTo,
      url: `${BASE_URL}/ofertas/${oferta.slug}`,
    },
    provider: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-20">
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
      <HeroOffer
        backgroundImage={oferta.hero.backgroundImage}
        badge={typeof oferta.hero.badge === 'string' ? oferta.hero.badge : oferta.hero.badge?.text}
        title={oferta.hero.title}
        subtitle={oferta.hero.subtitle}
        primaryCTA={oferta.hero.primaryCTA}
        secondaryCTA={oferta.hero.secondaryCTA}
        pricing={oferta.precio}
        urgencia={oferta.urgencia}
      />
      <CountdownAsym {...oferta.urgencia} />
      <IncludesAsym precio={oferta.precio.actual} />
      <ProofAsym testimonios={oferta.testimonios} />
      <FinalDiagonal
        title={oferta.cta.title}
        description={oferta.cta.description}
        primaryCTA={oferta.cta.primaryCTA as { text: string; variant: 'primary' | 'outline' }}
        pricing={oferta.precio}
        plazasDisponibles={oferta.urgencia.plazasDisponibles}
      />
      <GuaranteeBar />
      <Guarantee />
      <LeadFormModal
        title="Reserva tu Plaza"
        subtitle="Completa el formulario y te contactaremos en 24h"
        fields={[
          { name: 'nombre', type: 'text' as const, placeholder: 'Nombre completo', required: true },
          { name: 'email', type: 'email' as const, placeholder: 'Email', required: true },
          { name: 'telefono', type: 'tel' as const, placeholder: 'Teléfono', required: true },
        ]}
        submitButton="Enviar Solicitud"
        privacyText="Al enviar aceptas nuestra política de privacidad"
        successMessage="¡Gracias! Te contactaremos pronto"
      />
    </div>
    </>
  )
}

export async function generateStaticParams() {
  const ofertas = await getAllOfertasSlugsData()
  return ofertas
    .filter((oferta): oferta is NonNullable<typeof oferta> => oferta !== null && oferta !== undefined)
    .map((oferta) => ({ slug: oferta.slug }))
}

// ISR: Revalidar cada 15 minutos
export const revalidate = 900
