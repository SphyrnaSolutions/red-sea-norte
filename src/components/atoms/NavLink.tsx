import Link from "next/link"
import { cn } from "@/lib/utils/cn"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "white"
  active?: boolean
}

export function NavLink({
  href,
  children,
  className,
  variant = "default",
  active = false
}: NavLinkProps) {
  const baseStyles = "font-semibold transition-all duration-200 relative"

  const variantStyles = {
    default: cn(
      "text-text-primary hover:text-primary-blue",
      active && "text-primary-blue"
    ),
    white: cn(
      "text-white hover:text-primary-orange",
      active && "text-primary-orange"
    ),
  }

  return (
    <Link
      href={href}
      className={cn(
        baseStyles,
        variantStyles[variant],
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
        className
      )}
    >
      {children}
    </Link>
  )
}
