import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCursosData } from '@/lib/data'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Cursos de Buceo SSI | Red Sea Norte',
  description: 'Cursos de buceo certificados SSI en el Mar Rojo. Desde Open Water hasta especialidades avanzadas. Aprende a bucear con instructores profesionales.',
  openGraph: {
    title: 'Cursos de Buceo SSI | Red Sea Norte',
    description: 'Cursos de buceo certificados SSI en el Mar Rojo. Desde Open Water hasta especialidades avanzadas.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursos de Buceo SSI | Red Sea Norte',
    description: 'Cursos de buceo certificados SSI en el Mar Rojo. Desde Open Water hasta especialidades avanzadas.',
  },
}

export const revalidate = 3600 // 1 hour ISR

export default async function CursosPage() {
  const cursos = await getAllCursosData()

  // JSON-LD structured data for course catalog
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cursos de Buceo SSI',
    description: 'Catálogo de cursos de buceo certificados SSI en el Mar Rojo',
    numberOfItems: cursos.length,
    itemListElement: cursos.map((curso, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: curso.title,
        description: curso.hero.subtitle,
        provider: {
          '@type': 'Organization',
          name: 'Red Sea Norte',
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
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-texture-noise opacity-30" />

        <div className="container-custom relative z-10">
          <Badge className="mb-6 bg-coral-fire/90 text-white border-none px-4 py-2 text-sm font-semibold uppercase tracking-wide">
            Certificaciones SSI
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white text-shadow-lg">
            Cursos de Buceo
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Certificaciones SSI en el Mar Rojo. Aprende a bucear con los mejores instructores
            en uno de los destinos de buceo más espectaculares del mundo.
          </p>
        </div>

        {/* Decorative wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F5E6D3"
            />
          </svg>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding bg-bg-sand">
        <div className="container-custom">
          {cursos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-text-secondary">
                No hay cursos disponibles en este momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cursos.map((curso) => {
                // Extract price and level from infoBars
                const priceBar = curso.infoBars.find(bar =>
                  bar.label.toLowerCase().includes('precio')
                )
                const levelBar = curso.infoBars.find(bar =>
                  bar.label.toLowerCase().includes('nivel') ||
                  bar.label.toLowerCase().includes('duraci')
                )

                return (
                  <Link
                    key={curso.slug}
                    href={`/cursos/${curso.slug}`}
                    className="bg-white rounded-[var(--radius-card-lg)] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={curso.hero.image}
                        alt={curso.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-coral-fire text-white border-none px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                          {curso.badge}
                        </Badge>
                      </div>

                      {/* Price badge */}
                      {priceBar && (
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/95 backdrop-blur-sm text-ocean-deep font-bold px-4 py-2 rounded-full text-lg shadow-md">
                            {priceBar.value}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl font-bold text-text-heading mb-3 group-hover:text-electric-blue transition-colors line-clamp-2">
                        {curso.title}
                      </h2>

                      <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
                        {curso.hero.subtitle}
                      </p>

                      {/* Info bars summary */}
                      {levelBar && (
                        <div className="flex items-center gap-2 mb-4 text-sm text-text-muted">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{levelBar.value}</span>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-electric-blue font-semibold group-hover:text-coral-fire transition-colors flex items-center gap-2">
                          Ver detalles
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-ocean text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-texture-noise opacity-20" />
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            ¿No sabes qué curso elegir?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Contacta con nosotros y te ayudaremos a encontrar el curso perfecto
            para tu nivel y objetivos de buceo.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-coral-fire hover:bg-coral-ember text-white font-bold px-8 py-4 rounded-[var(--radius-button)] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Contactar
            <svg
              className="w-5 h-5"
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
          </Link>
        </div>
      </section>
    </div>
  )
}
