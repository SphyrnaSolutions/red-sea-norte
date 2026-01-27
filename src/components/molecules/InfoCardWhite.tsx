interface InfoCardWhiteProps {
  icon: string
  title: string
  description: string
  cta: string
}

export function InfoCardWhite({
  icon,
  title,
  description,
  cta,
}: InfoCardWhiteProps) {
  return (
    <div className="rounded-xl bg-white border-2 border-[#E5E7EB] p-10 flex flex-col gap-5">
      {/* Icon */}
      <div className="w-14 h-14 rounded-lg bg-[#ECFDF5] flex items-center justify-center">
        <span className="text-[#00CED1] text-[32px] font-bold">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-[#2C3E50] text-2xl font-bold leading-[1.3]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#6B7280] text-base leading-[1.6]">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-auto">
        <div className="inline-flex bg-[#F5E6D3] rounded-md px-6 py-3">
          <span className="text-[#0066CC] text-sm font-semibold">{cta}</span>
        </div>
      </div>
    </div>
  )
}
