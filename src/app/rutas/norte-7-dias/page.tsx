import { HeroSection } from "@/components/organisms/HeroSection"
import { CTASection } from "@/components/organisms/CTASection"
import { InfoCard } from "@/components/molecules/InfoCard"
import { getRuta } from "@/lib/mock-data/rutas"
import { Calendar, Waves, DollarSign, Check, Anchor } from "lucide-react"

const iconMap: Record<string, any> = {
  Calendar,
  Waves,
  DollarSign,
}

export default function RutaNortePage() {
  const ruta = getRuta("norte-7-dias")

  if (!ruta) {
    return <div>Ruta no encontrada</div>
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <HeroSection {...ruta.hero} />

      {/* Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ruta.infoCards.map((card, index) => {
              const Icon = iconMap[card.icon] || Anchor
              return (
                <InfoCard
                  key={index}
                  icon={Icon}
                  value={card.value}
                  label={card.label}
                  color={card.color}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Itinerario */}
      <section className="section-padding bg-bg-gray">
        <div className="container-custom">
          <h2 className="text-center mb-16">{ruta.itinerary.title}</h2>

          <div className="space-y-8 max-w-5xl mx-auto">
            {ruta.itinerary.days.map((day, index) => (
              <div
                key={index}
                className="bg-white rounded-[var(--radius-card-lg)] p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Day Number */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-cta rounded-full flex flex-col items-center justify-center text-white">
                      <span className="text-xs font-semibold uppercase">Día</span>
                      <span className="text-2xl font-black">{day.day}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-text-heading">
                      {day.title}
                    </h3>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {day.description}
                    </p>

                    {/* Dives */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-primary-blue mb-2">
                        Inmersiones:
                      </h4>
                      <ul className="space-y-1">
                        {day.dives.map((dive, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Waves size={16} className="text-secondary-cyan" />
                            <span>{dive}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {day.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-bg-mint text-secondary-dark text-xs font-semibold rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué Incluye */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">{ruta.incluye.title}</h2>
            <div className="bg-bg-gray rounded-[var(--radius-card-lg)] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ruta.incluye.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="flex-shrink-0 text-primary-blue mt-1" size={20} />
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CTASection
        title={ruta.cta.title}
        description={ruta.cta.description}
        primaryCTA={ruta.cta.primaryCTA}
        secondaryCTA={ruta.cta.secondaryCTA}
        variant="gradient"
      />
    </div>
  )
}
