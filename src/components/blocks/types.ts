/**
 * Block types for StreamField content rendering.
 *
 * The canonical Block type lives in src/lib/mock-data/types.ts.
 * We re-export it here so block components import from a single source.
 */
export type { Block } from '@/lib/mock-data/types'

/* ===========================
   Block Value Types
   =========================== */

export interface RichTextValue {
  content: string
}

export interface HeadingValue {
  level: number
  text: string
}

export interface ImageValue {
  url: string
  alt?: string
  caption?: string
}

export interface QuoteValue {
  text: string
  author: string
  role?: string
}

export interface InfoCardItem {
  icon: string
  value: string
  label: string
  color: string
}

export interface InfoCardsValue {
  cards: InfoCardItem[]
}

export interface GalleryImage {
  url: string
  alt?: string
}

export interface GalleryValue {
  images: GalleryImage[]
}

export interface TwoColumnValue {
  leftColumn: {
    image: string
    alt?: string
  }
  rightColumn: {
    title: string
    content: string
  }
}

export interface CTAValue {
  title: string
  description: string
  primaryCTA: {
    text: string
    href: string
  }
}

export interface AccordionItem {
  title: string
  content: string
}

export interface AccordionValue {
  items: AccordionItem[]
}

export interface NewsletterValue {
  title: string
  description: string
  buttonText: string
}
