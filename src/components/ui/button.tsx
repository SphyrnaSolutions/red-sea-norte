import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-blue text-white hover:bg-electric-blue shadow-md hover:shadow-lg",
        secondary: "bg-primary-orange text-white hover:bg-opacity-90 shadow-md hover:shadow-lg",
        outline: "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white",
        ghost: "text-text-primary hover:bg-bg-gray",
        gradient: "bg-gradient-cta text-white shadow-lg hover:shadow-xl hover:scale-105",
      },
      size: {
        default: "h-12 px-8 py-3 text-base",
        sm: "h-10 px-6 py-2 text-sm",
        lg: "h-14 px-10 py-4 text-lg",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-[var(--radius-button)]",
        pill: "rounded-[var(--radius-pill)]",
        full: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
