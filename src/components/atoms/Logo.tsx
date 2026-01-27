import Link from "next/link"
import { cn } from "@/lib/utils/cn"

interface LogoProps {
  className?: string
  variant?: "default" | "white"
  href?: string
}

export function Logo({ className, variant = "default", href = "/" }: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-secondary-dark"

  return (
    <Link href={href} className={cn("flex items-center gap-2 group", className)}>
      {/* Icon placeholder - replace with actual logo */}
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105",
        variant === "white" ? "bg-white/20" : "bg-primary-blue"
      )}>
        <span className={cn(
          "text-xl font-black",
          variant === "white" ? "text-white" : "text-white"
        )}>
          R
        </span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={cn("text-lg font-black tracking-tight", textColor)}>
          Red Sea
        </span>
        <span className={cn("text-xs font-semibold tracking-wide", textColor, "opacity-80")}>
          DIVING
        </span>
      </div>
    </Link>
  )
}
