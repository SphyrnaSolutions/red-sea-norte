import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/cn"

export interface StatsCardProps {
  badge?: string
  stat: string
  label: string
  backgroundColor: string
  className?: string
}

export function StatsCard({
  badge,
  stat,
  label,
  backgroundColor,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card-lg)] p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        "flex flex-col items-center justify-center text-center gap-4",
        "min-h-[220px]",
        className
      )}
      style={{ backgroundColor }}
    >
      {/* Badge */}
      {badge && (
        <Badge variant="outline" size="sm" className="bg-white/20 border-white text-white">
          {badge}
        </Badge>
      )}

      {/* Stat */}
      <div className="text-5xl lg:text-6xl font-black text-white">
        {stat}
      </div>

      {/* Label */}
      <div className="text-white/90 font-semibold text-base uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}
