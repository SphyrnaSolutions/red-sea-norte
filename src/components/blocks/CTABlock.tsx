import Link from 'next/link'
import type { Block, CTAValue } from './types'

export function CTABlock({ block }: { block: Block }) {
  const value = block.value as CTAValue

  return (
    <div className="w-full max-w-[1000px] my-20 max-md:my-10">
      <div
        className="rounded-[24px] p-[80px] max-md:p-[40px] flex flex-col items-center gap-6 text-center"
        style={{
          background: `linear-gradient(135deg, var(--color-ocean-midnight) 0%, var(--color-electric-blue) 100%)`,
        }}
      >
        {/* Title */}
        <h3
          className="text-white max-md:text-2xl"
          style={{
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: 1.2,
            fontFamily: 'var(--font-sans)',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          {value.title}
        </h3>

        {/* Description */}
        <p
          className="text-white max-w-[700px] max-md:text-base"
          style={{
            fontSize: 'var(--font-size-body)',
            lineHeight: 1.6,
            fontFamily: 'var(--font-sans)',
            textShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}
        >
          {value.description}
        </p>

        {/* CTA Button */}
        <Link
          href={value.primaryCTA.href}
          className="flex items-center justify-center rounded-[30px] transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: 'var(--color-coral-fire)',
            height: '60px',
            width: '280px',
          }}
        >
          <span
            className="text-white uppercase tracking-wider"
            style={{
              fontSize: 'var(--font-size-body)',
              fontWeight: 800,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {value.primaryCTA.text}
          </span>
        </Link>
      </div>
    </div>
  )
}
