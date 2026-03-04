interface AudienceProfile {
  title: string
  description: string
  tone: "good-fit" | "consider" | "not-now"
}

interface AudienceFitSectionProps {
  title: string
  subtitle: string
  profiles: AudienceProfile[]
}

const toneStyles = {
  "good-fit": {
    label: "Buen encaje",
    badge: "bg-[#0F8C62]/10 text-[#0F8C62]",
    border: "border-[#0F8C62]/15",
  },
  consider: {
    label: "Depende del caso",
    badge: "bg-[#F57415]/10 text-[#F57415]",
    border: "border-[#F57415]/15",
  },
  "not-now": {
    label: "No es la mejor entrada",
    badge: "bg-[#B54708]/10 text-[#B54708]",
    border: "border-[#B54708]/15",
  },
} as const

export function AudienceFitSection({ title, subtitle, profiles }: AudienceFitSectionProps) {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="container-custom">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#F57415]">
            ES PARA TI SI...
          </p>
          <h2
            className="mb-4 text-4xl font-bold leading-tight text-[#0A2540] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="text-lg leading-8 text-[#4A5568]">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {profiles.map((profile) => {
            const toneStyle = toneStyles[profile.tone]
            return (
              <article
                key={profile.title}
                className={`rounded-[28px] border bg-[#FBFDFF] p-8 shadow-[0_12px_40px_rgba(10,37,64,0.06)] ${toneStyle.border}`}
              >
                <span className={`inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] ${toneStyle.badge}`}>
                  {toneStyle.label}
                </span>
                <h3
                  className="mt-6 text-3xl font-bold leading-tight text-[#0A2540]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {profile.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#4A5568]">{profile.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
