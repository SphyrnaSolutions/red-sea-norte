interface JourneyOverviewSectionProps {
  eyebrow: string
  title: string
  subtitle: string
  highlights: string[]
  includesTitle: string
  includes: string[]
  fitTitle: string
  fitItems: string[]
  note: string
}

export function JourneyOverviewSection({
  eyebrow,
  title,
  subtitle,
  highlights,
  includesTitle,
  includes,
  fitTitle,
  fitItems,
  note,
}: JourneyOverviewSectionProps) {
  return (
    <section className="w-full bg-[#071E2D] py-20 text-white md:py-28">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#5CE1E6]">
              {eyebrow}
            </p>
            <h2
              className="mb-5 text-4xl font-bold leading-tight md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-white/78">{subtitle}</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5CE1E6]">
                    CLAVE
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/6 p-8">
              <h3
                className="mb-4 text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {includesTitle}
              </h3>
              <ul className="space-y-3 text-white/85">
                {includes.map((item) => (
                  <li key={item} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#F57415]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0F3248] p-8">
              <h3
                className="mb-4 text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {fitTitle}
              </h3>
              <ul className="space-y-3 text-white/85">
                {fitItems.map((item) => (
                  <li key={item} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#5CE1E6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="rounded-[22px] border border-[#F57415]/20 bg-[#F57415]/10 p-5 text-sm leading-7 text-white/85">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
