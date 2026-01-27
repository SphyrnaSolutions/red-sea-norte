import Image from "next/image"

interface ImageCardSmallProps {
  image: string
  subtitle: string
  title: string
}

export function ImageCardSmall({ image, subtitle, title }: ImageCardSmallProps) {
  return (
    <div className="relative rounded-xl overflow-hidden h-[320px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="text-[#3DABC2] text-xs font-bold tracking-wider mb-2">
          {subtitle}
        </div>
        <div className="text-white text-[28px] font-bold">
          {title}
        </div>
      </div>
    </div>
  )
}
