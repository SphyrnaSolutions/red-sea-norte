import Image from "next/image"

interface RouteValueCard {
  eyebrow?: string
  title: string
  description: string
  image: string
}

interface RouteValueSectionProps {
  title: string
  subtitle: string
  cards: RouteValueCard[]
}

export function RouteValueSection({ title, subtitle, cards }: RouteValueSectionProps) {
  return (
    <section className="w-full bg-[#F7FBFD] py-20 md:py-28">
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#F57415]">
            POSICIONAMIENTO
          </p>
          <h2
            className="mb-4 text-4xl font-bold leading-tight text-[#0A2540] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="text-lg leading-8 text-[#4A5568]">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[28px] border border-[#D7E8EF] bg-white shadow-[0_20px_60px_rgba(10,37,64,0.08)]"
            >
              <div className="relative h-56">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#0C324F,#00A8B5)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041C2C]/90 via-[#041C2C]/30 to-transparent" />
                {card.eyebrow && (
                  <span className="absolute left-6 top-6 rounded-full bg-[#00CED1]/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                    {card.eyebrow}
                  </span>
                )}
              </div>
              <div className="space-y-4 p-8">
                <h3
                  className="text-3xl font-bold leading-tight text-[#0A2540]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {card.title}
                </h3>
                <p className="text-base leading-7 text-[#4A5568]">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
