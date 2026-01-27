interface PriceCardProps {
  title: string
  items: string[]
  backgroundColor: string
}

export function PriceCard({ title, items, backgroundColor }: PriceCardProps) {
  return (
    <div
      className="rounded-xl p-9 flex flex-col gap-4 h-[320px]"
      style={{ backgroundColor }}
    >
      {/* Price */}
      <h3 className="text-white text-[42px] font-bold leading-tight">
        {title}
      </h3>

      {/* Items List */}
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="text-white/95 text-[15px]">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
