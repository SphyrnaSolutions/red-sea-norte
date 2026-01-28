import { notFound } from "next/navigation"
import { HeroSection } from "@/components/organisms/HeroSection"
import { CTASection } from "@/components/organisms/CTASection"
import { Badge } from "@/components/ui/badge"
import { getCurso } from "@/lib/mock-data/cursos"
import { Check, Book, Waves, Award, Package, Ship, Camera } from "lucide-react"

const iconMap: Record<string, any> = {
  Book,
  Waves,
  Award,
  Package,
  Ship,
  Camera,
}

export default function CursoPage({ params }: { params: { slug: string } }) {
  const curso = getCurso(params.slug)

  if (!curso) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={curso.hero.image}
        badge={{ text: curso.badge, backgroundColor: "#FF5722" }}
        title={curso.hero.title}
        subtitle={curso.hero.subtitle}
        ctas={[]}
        trustLine=""
      />

      {/* Info Bars - Overlapping */}
      <div className="relative -mt-16 z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {curso.infoBars.map((bar, index) => (
              <div
                key={index}
                className="bg-white rounded-[var(--radius-card)] p-6 shadow-xl text-center"
                style={{ borderTop: `4px solid ${bar.color}` }}
              >
                <div className="text-3xl font-black text-text-heading mb-2">
                  {bar.value}
                </div>
                <div className="text-text-secondary font-semibold uppercase text-sm tracking-wide">
                  {bar.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Qué Aprenderás */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-16">{curso.queAprendes.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {curso.queAprendes.items.map((item, index) => (
              <div
                key={index}
                className="bg-bg-gray rounded-[var(--radius-card)] p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-black">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-text-heading">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Los 5 Módulos - Dark Background */}
      <section className="section-padding bg-secondary-dark">
        <div className="container-custom">
          <h2 className="text-center mb-16 text-white">{curso.modulos.title}</h2>
          <div className="space-y-12 max-w-4xl mx-auto">
            {curso.modulos.items.map((modulo, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Circle Number */}
                <div
                  className="flex-shrink-0 w-24 h-24 bg-primary-orange rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-4xl font-black">
                    {modulo.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 text-white">
                  <h3 className="text-2xl font-bold mb-3">{modulo.title}</h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    {modulo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="section-padding bg-bg-mint">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - 40% */}
            <div className="lg:col-span-2">
              <h2 className="mb-6">{curso.requisitos.title}</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {curso.requisitos.intro}
              </p>
            </div>

            {/* Right Column - 60% */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[var(--radius-card-lg)] p-8 shadow-lg">
                <ul className="space-y-4">
                  {curso.requisitos.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <Check className="flex-shrink-0 mt-1 text-primary-blue" size={24} />
                      <span className="text-lg text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Incluye */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-16">{curso.incluye.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {curso.incluye.items.map((item, index) => {
              const Icon = iconMap[item.icon] || Package
              return (
                <div
                  key={index}
                  className="bg-bg-gray rounded-[var(--radius-card)] p-6 text-center hover:bg-primary-blue hover:text-white transition-all duration-300 group"
                >
                  <Icon className="mx-auto mb-3 group-hover:scale-110 transition-transform" size={32} />
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CTASection
        title={curso.cta.title}
        description={curso.cta.description}
        buttonText={curso.cta.primaryCTA?.text || "Reservar Ahora"}
      />
    </div>
  )
}
