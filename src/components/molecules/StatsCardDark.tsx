interface StatsCardDarkProps {
  badge: string
  title: string
  stats: Array<{
    number: string
    label: string
  }>
  backgroundColor: string
}

export function StatsCardDark({
  badge,
  title,
  stats,
  backgroundColor,
}: StatsCardDarkProps) {
  return (
    <div
      className="rounded-xl p-10 flex flex-col gap-6 h-[400px]"
      style={{ backgroundColor }}
    >
      {/* Badge */}
      <div className="inline-flex self-start">
        <div className="bg-[#F57415] rounded-md px-3 py-1.5">
          <span className="text-white text-xs font-bold">{badge}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white text-4xl font-bold">{title}</h3>

      {/* Stats */}
      <div className="flex flex-col gap-6 mt-auto">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="text-[#3DABC2] text-[28px] font-bold">
              {stat.number}
            </div>
            <div className="text-white/70 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
