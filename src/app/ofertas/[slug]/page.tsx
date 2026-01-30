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

export default async function OfertaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  // Data layer handles draft mode and caching internally
  const oferta = await getOfertaData(slug)

  if (!oferta) {
    notFound()
  }

  return (
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
