import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllExperienciasData } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

export const metadata: Metadata = {
  title: 'Experiencias de Buceo | Red Sea Norte',
  description: 'Experiencias unicas de buceo en el Mar Rojo. Pecios de la Segunda Guerra Mundial, arrecifes virgenes y encuentros con vida marina espectacular.',
  keywords: ['experiencias buceo', 'mar rojo', 'pecios', 'arrecifes', 'buceo egipto', 'diving experiences'],
  openGraph: {
    title: 'Experiencias de Buceo | Red Sea Norte',
    description: 'Experiencias unicas de buceo en el Mar Rojo. Pecios de la Segunda Guerra Mundial, arrecifes virgenes y encuentros con vida marina espectacular.',
    type: 'website',
    url: `${BASE_URL}/experiencias`,
    siteName: 'Red Sea Norte',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experiencias de Buceo | Red Sea Norte',
    description: 'Experiencias unicas de buceo en el Mar Rojo. Pecios, arrecifes y vida marina espectacular.',
  },
  alternates: {
    canonical: `${BASE_URL}/experiencias`,
  },
}

// ISR configuration: revalidate every 30 minutes
export const revalidate = 1800

export default async function ExperienciasPage() {
  const experiencias = await getAllExperienciasData()

  // JSON-LD structured data for ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Experiencias de Buceo en el Mar Rojo',
    description: 'Coleccion de experiencias de buceo unicas en el Mar Rojo Norte',
    numberOfItems: experiencias.length,
    itemListElement: experiencias.map((exp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristTrip',
        name: exp.title,
        description: exp.description,
        url: `${BASE_URL}/experiencias/${exp.slug}`,
        image: exp.hero?.backgroundImage ? `${BASE_URL}${exp.hero.backgroundImage}` : undefined,
        touristType: 'Scuba Diving Experience',
        provider: {
          '@type': 'Organization',
          name: 'Red Sea Norte',
          sameAs: BASE_URL,
        },
      },
    })),
  }

  return (
    <div className="pt-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-ocean py-24 text-white text-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-cyan-light blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-coral-fire blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[4px] mb-6"
            style={{ color: '#FF6B35' }}
          >
            Descubre el Mar Rojo
          </span>

          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1 }}
          >
            Experiencias de Buceo
          </h1>

          <p
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Vive aventuras unicas bajo el agua. Pecios historicos de la Segunda Guerra Mundial,
            arrecifes de coral virgenes y encuentros inolvidables con la vida marina.
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="section-padding bg-bg-sand">
        <div className="container-custom">
          {experiencias.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-text-secondary">
                No hay experiencias disponibles en este momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experiencias.map((exp) => (
                <Link
                  key={exp.slug}
                  href={`/experiencias/${exp.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={exp.hero?.backgroundImage || '/placeholder-experience.jpg'}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                    />

                    {/* Badge if available */}
                    {exp.hero?.badge && (
                      <span
                        className="absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                        style={{
                          backgroundColor: typeof exp.hero.badge === 'object'
                            ? exp.hero.badge.backgroundColor
                            : '#FF6B35'
                        }}
                      >
                        {typeof exp.hero.badge === 'object' ? exp.hero.badge.text : exp.hero.badge}
                      </span>
                    )}

                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2
                        className="text-2xl md:text-3xl font-bold text-white text-shadow"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {exp.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p
                      className="text-text-secondary mb-4 line-clamp-3"
                      style={{
                        fontSize: '16px',
                        lineHeight: 1.7,
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-coral-fire font-semibold group-hover:gap-4 transition-all duration-300">
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>Descubrir mas</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#0D3A5D' }}
        />

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cyan-light blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-coral-fire blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            No encuentras lo que buscas?
          </h2>

          <p
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Contactanos para disenar una experiencia de buceo personalizada
            adaptada a tus preferencias y nivel de certificacion.
          </p>

          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-bold text-lg transition-transform hover:scale-105 hover:shadow-xl"
            style={{
              backgroundColor: '#FF6B35',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
