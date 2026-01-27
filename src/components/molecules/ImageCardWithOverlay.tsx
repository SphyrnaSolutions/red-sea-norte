import Image from "next/image"

interface ImageCardWithOverlayProps {
  image: string
  title: string
  description: string
  height?: number
}

export function ImageCardWithOverlay({
  image,
  title,
  description,
  height = 400,
}: ImageCardWithOverlayProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
      style={{ height: `${height}px` }}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3">
        <h3 className="text-white text-[32px] font-bold leading-[1.1] transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          {title}
        </h3>
        <p className="text-white/90 text-base leading-relaxed max-w-md transform transition-all duration-500 opacity-90 group-hover:opacity-100">
          {description}
        </p>

        {/* Decorative accent line */}
        <div className="w-12 h-1 bg-[#FF6B35] rounded-full transform origin-left transition-all duration-500 scale-x-100 group-hover:scale-x-150 mt-2" />
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  )
}
