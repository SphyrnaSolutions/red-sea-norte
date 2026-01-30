import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllRutasData } from '@/lib/data'
import { Calendar, Waves, MapPin, ArrowRight } from 'lucide-react'

// Base URL for SEO
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

export const metadata: Metadata = {
  title: 'Rutas de Buceo en el Mar Rojo | Red Sea Norte',
  description: 'Itinerarios de vida a bordo en el Mar Rojo Norte. Rutas de 7 días explorando los mejores sitios de buceo: Thistlegorm, Ras Mohammed, Estrecho de Tiran y más.',
  openGraph: {
    title: 'Rutas de Buceo en el Mar Rojo | Red Sea Norte',
    description: 'Itinerarios de vida a bordo en el Mar Rojo Norte. Rutas de 7 días explorando los mejores sitios de buceo.',
    type: 'website',
    url: `${BASE_URL}/rutas`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rutas de Buceo en el Mar Rojo | Red Sea Norte',
    description: 'Itinerarios de vida a bordo en el Mar Rojo Norte. Rutas de 7 días explorando los mejores sitios de buceo.',
  },
  alternates: {
    canonical: `${BASE_URL}/rutas`,
  },
}

// ISR configuration: revalidate every 30 minutes
export const revalidate = 1800

export default async function RutasPage() {
  const rutas = await getAllRutasData()

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] max-md:h-[400px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&h=900&fit=crop&q=80"
          alt="Rutas de Buceo Mar Rojo"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 4, 40, 0.85) 0%, rgba(0, 78, 146, 0.75) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-[120px] max-lg:px-[48px] max-md:px-[24px]">
          <span
            className="text-[13px] font-bold uppercase mb-4"
            style={{ color: '#00CED1', letterSpacing: '3px' }}
          >
            LIVEABOARD EXPERIENCES
          </span>

          <h1
            className="text-white text-7xl font-black mb-6 max-md:text-4xl max-lg:text-5xl"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            Rutas de Buceo
          </h1>

          <p
            className="text-white text-xl max-w-3xl max-md:text-base"
            style={{
              opacity: 0.9,
              lineHeight: 1.6,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Itinerarios de vida a bordo disenados para explorar los mejores sitios del Mar Rojo Norte.
            Pecios legendarios, arrecifes pristinos y experiencias inolvidables.
          </p>
        </div>
      </section>

      {/* Routes Listing Section */}
      <section
        className="w-full py-[100px] max-lg:py-[60px] max-md:py-[48px]"
        style={{ background: 'linear-gradient(180deg, #D6E8F5 0%, #F8FAFC 50%, #D6E8F5 100%)' }}
      >
        <div className="px-[120px] max-lg:px-[48px] max-md:px-[24px]">
          {/* Section Header */}
          <div className="text-center mb-16 max-md:mb-10">
            <span
              className="text-[11px] font-bold uppercase"
              style={{ color: '#FF6B35', letterSpacing: '4px' }}
            >
              NUESTROS ITINERARIOS
            </span>
            <h2
              className="mt-4 max-md:text-3xl"
              style={{
                color: '#0D3A5D',
                fontSize: '42px',
                fontWeight: 800,
                lineHeight: 1.2,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Elige Tu Aventura
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto"
              style={{
                color: '#4A5568',
                fontSize: '18px',
                lineHeight: 1.6
              }}
            >
              Cada ruta ha sido disenada para maximizar tu experiencia submarina,
              combinando los mejores sitios de buceo con descanso y comodidad a bordo.
            </p>
          </div>

          {/* Routes Grid */}
          <div className="space-y-10">
            {rutas.map((ruta, index) => (
              <Link
                key={ruta.slug}
                href={`/rutas/${ruta.slug}`}
                className="block group"
              >
                <article
                  className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex lg:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className="relative h-[350px] lg:h-[450px] overflow-hidden">
                      <Image
                        src={ruta.hero?.backgroundImage || '/placeholder.jpg'}
                        alt={ruta.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Badge */}
                      {ruta.hero?.badge && (
                        <div
                          className="absolute top-6 left-6 px-4 py-2 rounded-lg"
                          style={{
                            backgroundColor: ruta.hero.badge.backgroundColor || '#00CED1'
                          }}
                        >
                          <span className="text-white text-xs font-bold uppercase tracking-wider">
                            {ruta.hero.badge.text}
                          </span>
                        </div>
                      )}
                      {/* Gradient overlay for depth */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%)'
                        }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-10 lg:p-12 flex flex-col justify-center max-md:p-6">
                      {/* Title */}
                      <h3
                        className="mb-4 max-md:text-2xl"
                        style={{
                          color: '#0D3A5D',
                          fontSize: '32px',
                          fontWeight: 800,
                          lineHeight: 1.2,
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {ruta.title}
                      </h3>

                      {/* Subtitle / Description */}
                      <p
                        className="mb-6 max-md:text-sm"
                        style={{
                          color: '#4A5568',
                          fontSize: '16px',
                          lineHeight: 1.7
                        }}
                      >
                        {ruta.hero?.subtitle || ruta.storyIntro?.description}
                      </p>

                      {/* Info Cards */}
                      {ruta.infoCards && ruta.infoCards.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-8">
                          {ruta.infoCards.slice(0, 3).map((card, cardIndex) => (
                            <div
                              key={cardIndex}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg"
                              style={{
                                backgroundColor: card.color === 'blue' ? '#E8F4FD' :
                                                card.color === 'orange' ? '#FFF3ED' :
                                                '#E6FAFA'
                              }}
                            >
                              {card.icon === 'Calendar' && (
                                <Calendar
                                  size={18}
                                  style={{
                                    color: card.color === 'blue' ? '#0066CC' :
                                          card.color === 'orange' ? '#FF6B35' :
                                          '#00CED1'
                                  }}
                                />
                              )}
                              {card.icon === 'Waves' && (
                                <Waves
                                  size={18}
                                  style={{
                                    color: card.color === 'blue' ? '#0066CC' :
                                          card.color === 'orange' ? '#FF6B35' :
                                          '#00CED1'
                                  }}
                                />
                              )}
                              {card.icon === 'DollarSign' && (
                                <span
                                  className="text-lg font-bold"
                                  style={{
                                    color: card.color === 'blue' ? '#0066CC' :
                                          card.color === 'orange' ? '#FF6B35' :
                                          '#00CED1'
                                  }}
                                >
                                  EUR
                                </span>
                              )}
                              <div className="flex flex-col">
                                <span
                                  className="font-bold text-sm"
                                  style={{
                                    color: card.color === 'blue' ? '#0066CC' :
                                          card.color === 'orange' ? '#FF6B35' :
                                          '#00CED1'
                                  }}
                                >
                                  {card.value}
                                </span>
                                <span className="text-xs text-gray-600">
                                  {card.label}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Highlights from itinerary */}
                      {ruta.itinerary?.days && ruta.itinerary.days.length > 0 && (
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin size={16} style={{ color: '#FF6B35' }} />
                            <span
                              className="text-xs font-bold uppercase"
                              style={{ color: '#FF6B35', letterSpacing: '2px' }}
                            >
                              Sitios destacados
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {ruta.itinerary.days
                              .flatMap(day => day.dives)
                              .slice(0, 5)
                              .map((dive, diveIndex) => (
                                <span
                                  key={diveIndex}
                                  className="text-xs px-3 py-1 rounded-full"
                                  style={{
                                    backgroundColor: '#F0F4F8',
                                    color: '#0D3A5D'
                                  }}
                                >
                                  {dive.split('(')[0].trim()}
                                </span>
                              ))
                            }
                            {ruta.itinerary.days.flatMap(day => day.dives).length > 5 && (
                              <span
                                className="text-xs px-3 py-1 rounded-full"
                                style={{
                                  backgroundColor: '#F0F4F8',
                                  color: '#4A5568'
                                }}
                              >
                                +{ruta.itinerary.days.flatMap(day => day.dives).length - 5} mas
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
                        <span
                          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F5F 100%)',
                            fontSize: '16px'
                          }}
                        >
                          Ver itinerario completo
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {rutas.length === 0 && (
            <div className="text-center py-20">
              <div
                className="text-6xl mb-6"
                style={{ opacity: 0.3 }}
              >
                🤿
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: '#0D3A5D' }}
              >
                Proximamente nuevas rutas
              </h3>
              <p style={{ color: '#4A5568' }}>
                Estamos preparando nuevos itinerarios para ti.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full h-[450px] max-md:h-[400px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600&h=900&fit=crop&q=80"
          alt="Mar Rojo Diving"
          fill
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(10,15,26,0.7)' }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-[120px] max-lg:px-[48px] max-md:px-[24px] gap-6">
          <span
            className="text-[11px] font-bold uppercase"
            style={{ color: '#FF6B35', letterSpacing: '4px' }}
          >
            NO TE QUEDES FUERA
          </span>

          <h2
            className="text-white max-md:text-3xl"
            style={{
              fontSize: '44px',
              fontWeight: 800,
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.2
            }}
          >
            ¿Listo para la Aventura?
          </h2>

          <p
            className="text-white max-w-2xl max-md:text-base"
            style={{
              fontSize: '18px',
              opacity: 0.8,
              lineHeight: 1.6
            }}
          >
            Las plazas son limitadas y las mejores fechas se reservan con meses de antelacion.
            Contactanos hoy para asegurar tu lugar.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/contacto"
              className="flex items-center justify-center rounded-xl transition-transform hover:scale-105"
              style={{
                backgroundColor: '#FF6B35',
                height: '60px',
                padding: '0 40px'
              }}
            >
              <span
                className="text-white font-semibold"
                style={{ fontSize: '16px' }}
              >
                Solicitar Informacion
              </span>
            </Link>

            <Link
              href="/blog"
              className="flex items-center justify-center rounded-xl border-2 border-white transition-all hover:bg-white hover:text-[#0D3A5D]"
              style={{
                height: '60px',
                padding: '0 40px'
              }}
            >
              <span
                className="text-white font-semibold group-hover:text-[#0D3A5D]"
                style={{ fontSize: '16px' }}
              >
                Leer el Blog
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
