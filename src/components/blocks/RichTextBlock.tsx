import type { Block, RichTextValue } from './types'

export function RichTextBlock({ block }: { block: Block }) {
  const value = block.value as Partial<RichTextValue>
  // Support both normalized { content: string } and raw HTML string from Wagtail
  const html = typeof block.value === 'string' ? block.value : value?.content
  if (!html) return null

  return (
    <div className="w-full max-w-[800px] mb-10">
      <div
        className="prose prose-lg max-w-none"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-body-lg)',
          lineHeight: 1.7,
          fontFamily: 'var(--font-sans)',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
