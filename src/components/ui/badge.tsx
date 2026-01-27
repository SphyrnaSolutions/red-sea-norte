import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-blue text-white",
        secondary: "bg-primary-orange text-white",
        outline: "border-2 border-primary-blue text-primary-blue bg-white",
        cyan: "bg-secondary-cyan text-white",
        success: "bg-bg-mint text-secondary-dark border border-secondary-dark",
        muted: "bg-bg-gray text-text-secondary",
      },
      size: {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1 text-xs",
        lg: "px-6 py-3 text-base",
      },
      rounded: {
        default: "rounded-[var(--radius-badge)]",
        pill: "rounded-[var(--radius-pill)]",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "pill",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
