import Link from "next/link"

interface LogoProps {
  variant?: "white" | "color"
}

export function Logo({ variant = "color" }: LogoProps) {
  return (
    <Link href="/" className="inline-block">
      <div className="flex items-center gap-2">
        <div className={`text-2xl font-bold ${variant === "white" ? "text-white" : "text-primary-blue"}`}>
          Red Sea Norte
        </div>
      </div>
    </Link>
  )
}
