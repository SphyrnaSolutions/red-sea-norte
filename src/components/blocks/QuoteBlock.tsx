import type { Block, QuoteValue } from './types'

export function QuoteBlock({ block }: { block: Block }) {
  const value = block.value as Partial<QuoteValue>
  if (!value?.text || !value?.author) return null

  return (
    <div className="w-full max-w-[900px] my-10">
      <div
        className="rounded-[20px] p-[80px] max-md:p-[40px] flex flex-col gap-5"
        style={{ backgroundColor: 'var(--color-bg-gray)' }}
      >
        {/* Quote Icon */}
        <span
          style={{
            color: 'var(--color-coral-fire)',
            fontSize: '72px',
            fontWeight: 900,
            lineHeight: 0.8,
            fontFamily: 'Georgia, serif',
          }}
        >
          &quot;
        </span>

        {/* Quote Text */}
        <p
          className="italic max-md:text-2xl"
          style={{
            color: 'var(--color-ocean-midnight)',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: 1.5,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {value.text}
        </p>

        {/* Author */}
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-body)',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
          }}
        >
          - {value.author}
          {value.role && `, ${value.role}`}
        </p>
      </div>
    </div>
  )
}
