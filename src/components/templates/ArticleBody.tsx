import { BlockRenderer } from '@/components/blocks'
import type { Block } from '@/components/blocks/types'

interface ArticleBodyProps {
  blocks: Block[]
}

/**
 * StreamField body renderer that maps blocks through BlockRenderer.
 * Wrapped in a max-width container centered on page.
 *
 * Heading hierarchy safety: HeadingBlock already clamps to H2-H4.
 * This component provides an additional guard by filtering H1 headings
 * from the block data before rendering.
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  // Safety net: ensure no H1 blocks slip through body content
  const safeBlocks = blocks.map((block) => {
    if (
      block.type === 'heading' &&
      typeof block.value === 'object' &&
      block.value !== null &&
      'level' in block.value &&
      (block.value as { level: number }).level === 1
    ) {
      return {
        ...block,
        value: { ...(block.value as Record<string, unknown>), level: 2 },
      } as Block
    }
    return block
  })

  return (
    <div className="w-full flex flex-col items-center">
      {safeBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  )
}
