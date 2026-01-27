import { cn } from "@/lib/utils/cn"
import { LucideIcon } from "lucide-react"

export interface InfoCardProps {
  icon: LucideIcon
  value: string
  label: string
  color?: "blue" | "orange" | "cyan"
  className?: string
}

export function InfoCard({
  icon: Icon,
  value,
  label,
  color = "blue",
  className,
}: InfoCardProps) {
  const colorClasses = {
    blue: "bg-primary-blue",
    orange: "bg-primary-orange",
    cyan: "bg-secondary-cyan",
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        "bg-white border-t-4",
        color === "blue" && "border-primary-blue",
        color === "orange" && "border-primary-orange",
        color === "cyan" && "border-secondary-cyan",
        className
      )}
    >
      <div className="flex flex-col items-center text-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            colorClasses[color]
          )}
        >
          <Icon size={32} className="text-white" />
        </div>

        {/* Value */}
        <div className="text-4xl font-black text-text-heading">
          {value}
        </div>

        {/* Label */}
        <div className="text-text-secondary font-medium text-sm uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  )
}
