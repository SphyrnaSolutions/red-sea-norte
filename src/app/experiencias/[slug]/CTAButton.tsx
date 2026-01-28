"use client"

import { useModalStore } from "@/lib/stores/useModalStore"

interface CTAButtonProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export function CTAButton({ text, className, style }: CTAButtonProps) {
  const { openModal } = useModalStore()

  return (
    <button
      onClick={openModal}
      className={className}
      style={style}
    >
      <span
        className="text-white font-semibold uppercase"
        style={{
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {text}
      </span>
    </button>
  )
}
