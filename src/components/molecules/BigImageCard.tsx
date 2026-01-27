import Image from "next/image"

interface BigImageCardProps {
  image: string
  title: string
  subtitle: string
}

export function BigImageCard({ image, title, subtitle }: BigImageCardProps) {
  return (
    <div className="relative rounded-[20px] overflow-hidden h-[480px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <h3 className="text-white text-[52px] font-bold leading-[1.05] mb-3">
          {title}
        </h3>
        <p className="text-white/80 text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
