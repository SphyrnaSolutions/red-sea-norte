import type { Block, HeadingValue } from './types'

/**
 * Renders a heading block. Enforces heading hierarchy by clamping level
 * to 2-4 range -- H1 is reserved for the page title and must not appear
 * in body blocks.
 */
export function HeadingBlock({ block }: { block: Block }) {
  const value = block.value as HeadingValue

  // Safety: clamp heading level to 2-4 (no H1 in body content)
  const safeLevel = Math.max(2, Math.min(4, value.level))
  const HeadingTag = `h${safeLevel}` as keyof React.JSX.IntrinsicElements

  return (
    <div className="w-full max-w-[800px] py-10 max-md:py-8">
      <HeadingTag
        style={{
          color: 'var(--color-ocean-midnight)',
          fontSize: safeLevel === 2 ? 'var(--font-size-h3)' : 'var(--font-size-h4)',
          fontWeight: 900,
          fontFamily: 'var(--font-sans)',
          lineHeight: 1.2,
        }}
        className="max-md:text-3xl"
      >
        {value.text}
      </HeadingTag>
    </div>
  )
}
