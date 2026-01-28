import * as React from "react"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline"
}

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors"
  const variantStyles = {
    default: "bg-[#FF5722]/10 text-[#FF5722]",
    outline: "border border-[#FF5722] text-[#FF5722]",
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
