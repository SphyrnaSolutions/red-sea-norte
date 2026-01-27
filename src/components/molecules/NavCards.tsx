import Image from "next/image"

interface NavCardProps {
  title: string
  description: string
  icon: string
  backgroundColor: string
}

export function NavCard({ title, description, icon, backgroundColor }: NavCardProps) {
  return (
    <div
      className="rounded-2xl p-9 flex flex-col gap-4 h-[260px]"
      style={{ backgroundColor, width: "380px" }}
    >
      <h3 className="text-white text-4xl font-bold">{title}</h3>
      <p className="text-white/95 text-[15px]">{description}</p>
      <div className="text-5xl mt-auto">{icon}</div>
    </div>
  )
}

interface NavImageCardProps {
  image: string
  title: string
  description: string
}

export function NavImageCard({ image, title, description }: NavImageCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-[260px] flex-1">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 gap-2">
        <h3 className="text-white text-[32px] font-bold">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </div>
  )
}

interface NavStatCardProps {
  number: string
  label: string
  subtitle: string
  backgroundColor: string
  borderColor: string
}

export function NavStatCard({
  number,
  label,
  subtitle,
  backgroundColor,
  borderColor,
}: NavStatCardProps) {
  return (
    <div
      className="rounded-2xl p-9 flex flex-col gap-5 h-[260px] border-2"
      style={{
        backgroundColor,
        borderColor,
        width: "320px",
      }}
    >
      <div className="text-[#00CED1] text-[88px] font-bold leading-none">
        {number}
      </div>
      <div className="text-[#2C3E50] text-base font-semibold">
        {label}
      </div>
      <div className="text-[#6B7280] text-[13px]">
        {subtitle}
      </div>
    </div>
  )
}
