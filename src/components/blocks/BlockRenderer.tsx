import type { Block } from './types'
import { RichTextBlock } from './RichTextBlock'
import { HeadingBlock } from './HeadingBlock'
import { ImageBlock } from './ImageBlock'
import { QuoteBlock } from './QuoteBlock'
import { InfoCardsBlock } from './InfoCardsBlock'
import { GalleryBlock } from './GalleryBlock'
import { TwoColumnBlock } from './TwoColumnBlock'
import { CTABlock } from './CTABlock'
import { AccordionBlock } from './AccordionBlock'
import { NewsletterBlock } from './NewsletterBlock'

type BlockComponent = React.ComponentType<{ block: Block }>

const BLOCK_MAP: Record<string, BlockComponent> = {
  rich_text: RichTextBlock,
  heading: HeadingBlock,
  image: ImageBlock,
  quote: QuoteBlock,
  info_cards: InfoCardsBlock,
  gallery: GalleryBlock,
  two_column: TwoColumnBlock,
  cta: CTABlock,
  accordion: AccordionBlock,
  newsletter: NewsletterBlock,
}

export function BlockRenderer({ block }: { block: Block }) {
  const Component = BLOCK_MAP[block.type]
  if (!Component) return null
  return <Component block={block} />
}
