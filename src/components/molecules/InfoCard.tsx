import React from "react"

interface InfoCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
}

export function InfoCard({ icon, title, description, className = "" }: InfoCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      {icon && <div className="mb-4 text-[#FF5722]">{icon}</div>}
      <h3 className="text-xl font-bold text-[#0A2540] mb-2">{title}</h3>
      <p className="text-[#4A5568] leading-relaxed">{description}</p>
    </div>
  )
}
