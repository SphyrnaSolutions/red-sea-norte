interface SideStackCardProps {
  label?: string
  number?: string
  title?: string
  description: string
  backgroundColor: string
}

export function SideStackCard({
  label,
  number,
  title,
  description,
  backgroundColor,
}: SideStackCardProps) {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col gap-4 h-full"
      style={{ backgroundColor }}
    >
      {label && (
        <div className="text-white/60 text-[11px] font-bold tracking-[1.5px]">
          {label}
        </div>
      )}

      {number && (
        <div className="text-white text-[64px] font-bold leading-none">
          {number}
        </div>
      )}

      {title && (
        <div className="text-white text-[28px] font-bold">
          {title}
        </div>
      )}

      <div className={`text-white/80 text-${number ? '15' : 'sm'}`}>
        {description}
      </div>
    </div>
  )
}
