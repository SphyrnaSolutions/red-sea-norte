import type { Metadata } from "next"
import { InlineLeadSection } from "@/components/organisms/InlineLeadSection"
import { LeadFormModal } from "@/components/organisms/LeadFormModal"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://buceoenelmarrojo.com"

export const metadata: Metadata = {
  title: "Contacto | Buceo en el Mar Rojo",
  description:
    "Contacta con nosotros para informacion sobre safaris de buceo en vida a bordo por el Mar Rojo desde Hurghada. Rutas, fechas, precios y disponibilidad.",
  alternates: {
    canonical: `${BASE_URL}/contacto`,
  },
  openGraph: {
    title: "Contacto | Buceo en el Mar Rojo",
    description:
      "Contacta con nosotros para informacion sobre safaris de buceo en vida a bordo por el Mar Rojo desde Hurghada.",
    type: "website",
    url: `${BASE_URL}/contacto`,
  },
  twitter: {
    card: "summary",
    title: "Contacto | Buceo en el Mar Rojo",
    description:
      "Contacta con nosotros para informacion sobre safaris de buceo en vida a bordo por el Mar Rojo desde Hurghada.",
  },
}

const contactFields = [
  {
    name: "name",
    type: "text" as const,
    placeholder: "Tu nombre",
    required: true,
  },
  {
    name: "email",
    type: "email" as const,
    placeholder: "Tu email",
    required: true,
  },
  {
    name: "phone",
    type: "tel" as const,
    placeholder: "Tu telefono",
    required: true,
  },
  {
    name: "certification",
    type: "select" as const,
    placeholder: "Nivel de buceo",
    required: false,
    options: [
      { value: "No certificado", label: "No certificado" },
      { value: "Open Water", label: "Open Water" },
      { value: "Advanced", label: "Advanced" },
      { value: "Rescue", label: "Rescue Diver" },
      { value: "Divemaster", label: "Divemaster" },
      { value: "Instructor", label: "Instructor" },
    ],
  },
  {
    name: "preferredMonth",
    type: "select" as const,
    placeholder: "Cuando te interesa viajar",
    required: false,
    options: [
      { value: "Enero", label: "Enero" },
      { value: "Febrero", label: "Febrero" },
      { value: "Marzo", label: "Marzo" },
      { value: "Abril", label: "Abril" },
      { value: "Mayo", label: "Mayo" },
      { value: "Junio", label: "Junio" },
      { value: "Julio", label: "Julio" },
      { value: "Agosto", label: "Agosto" },
      { value: "Septiembre", label: "Septiembre" },
      { value: "Octubre", label: "Octubre" },
      { value: "Noviembre", label: "Noviembre" },
      { value: "Diciembre", label: "Diciembre" },
    ],
  },
]

const modalFields = [
  ...contactFields,
  {
    name: "message",
    type: "textarea" as const,
    placeholder: "Tienes alguna duda concreta? (opcional)",
    required: false,
  },
]

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto",
  url: `${BASE_URL}/contacto`,
  description:
    "Pagina de contacto para consultas sobre safaris de buceo en vida a bordo por el Mar Rojo desde Hurghada.",
  mainEntity: {
    "@type": "Organization",
    name: "Red Sea Norte",
    url: BASE_URL,
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contacto",
      item: `${BASE_URL}/contacto`,
    },
  ],
}

export default function ContactoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero header */}
      <section className="bg-[#0A2540] pt-32 pb-16">
        <div className="container-custom">
          <h1
            className="text-5xl font-black text-white md:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contacto
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/78">
            Cuentanos que tienes en mente y te ayudamos a encontrar la ruta de buceo perfecta en el
            Mar Rojo. Sin compromiso, respuesta en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* Inline lead form */}
      <InlineLeadSection
        sectionId="contacto-form"
        eyebrow="CONTACTO"
        title="Cuentanos sobre tu viaje al Mar Rojo"
        subtitle="Rellena el formulario y te contactaremos para resolver tus dudas sobre rutas, fechas y disponibilidad."
        highlights={[
          "Te orientamos segun tu nivel de buceo",
          "Te contamos que ruta encaja mejor contigo",
          "Sin compromiso, respuesta en menos de 24h",
        ]}
        fields={contactFields}
        submitButton="Enviar consulta"
        privacyText=""
        successMessage="Gracias. Te contactaremos pronto con informacion personalizada."
        consentText="Acepto recibir ofertas y novedades sobre viajes de buceo por WhatsApp de buceoenelmarrojo.com. Puedo darme de baja en cualquier momento."
        privacyLinkText="Politica de privacidad"
        privacyLinkHref="/politica-de-privacidad"
        showModalCta={false}
      />

      {/* Modal form (triggered from other components) */}
      <LeadFormModal
        title="Consulta sobre tu viaje"
        subtitle="Rellena el formulario y te contactaremos con informacion personalizada."
        fields={modalFields}
        submitButton="Enviar consulta"
        privacyText=""
        successMessage="Gracias. Te contactaremos pronto."
        consentText="Acepto recibir ofertas y novedades sobre viajes de buceo por WhatsApp de buceoenelmarrojo.com. Puedo darme de baja en cualquier momento."
        privacyLinkText="Politica de privacidad"
        privacyLinkHref="/politica-de-privacidad"
      />
    </>
  )
}
