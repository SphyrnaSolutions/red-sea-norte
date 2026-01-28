import { notFound } from 'next/navigation'
import { getOferta, getAllOfertaSlugs } from '@/lib/mock-data/ofertas'
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
  const oferta = getOferta(slug)

  if (!oferta) {
    notFound()
  }

  return (
    <div className="pt-20">
      <HeroOffer
        backgroundImage={oferta.hero.backgroundImage}
        badge={oferta.hero.badge}
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
  const slugs = getAllOfertaSlugs()
  return slugs.map((slug) => ({ slug }))
}
