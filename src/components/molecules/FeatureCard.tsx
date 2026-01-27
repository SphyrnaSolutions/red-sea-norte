import Image from "next/image"
import { cn } from "@/lib/utils/cn"

export interface FeatureCardProps {
  image: string
  title: string
  description: string
  variant?: "large" | "small"
  className?: string
  href?: string
}

export function FeatureCard({
  image,
  title,
  description,
  variant = "large",
  className,
  href,
}: FeatureCardProps) {
  const heightClass = variant === "large" ? "h-[400px]" : "h-[320px]"

  const content = (
    <div
      className={cn(
        "relative rounded-[var(--radius-card-lg)] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500",
        heightClass,
        variant === "large" ? "w-full" : "w-full md:w-[260px]",
        className
      )}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay group-hover:bg-opacity-90 transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <h3 className="text-white text-2xl lg:text-3xl font-black mb-3 text-shadow-lg group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-white/90 text-sm lg:text-base leading-relaxed text-shadow opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
          {description}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}
