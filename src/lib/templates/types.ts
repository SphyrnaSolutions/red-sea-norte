import type { Block } from '@/components/blocks/types'

/**
 * Author data for article pages.
 */
export interface AuthorData {
  name: string
  bio?: string
  avatar?: string
}

/**
 * FAQ item for FAQ sections and FAQPage schema.
 */
export interface FAQItem {
  question: string
  answer: string
}

/**
 * Related page card used by the interlinks section.
 */
export interface RelatedPage {
  title: string
  slug: string
  excerpt: string
  heroImage: string
  contentType: string
}

/**
 * Complete page data for the SEO article template.
 * Any Wagtail content page that provides this shape can render
 * through SEOArticleTemplate with zero custom frontend code.
 */
export interface SEOArticlePageData {
  // Core content
  title: string
  slug: string
  heroImage: string
  heroAlt: string
  excerpt: string
  body: Block[]

  // SEO fields (from Phase 2 Wagtail models)
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  schemaType: 'Article' | 'TouristTrip' | 'FAQPage'

  // Cluster fields (from Phase 2)
  clusterId: string
  clusterRole: 'pillar' | 'satellite'
  pillarSlug: string

  // Related pages (computed by interlink engine)
  relatedPages: RelatedPage[]

  // Content type indicator (used by schema generator)
  contentType: string

  // Optional fields
  faq?: FAQItem[]
  author?: AuthorData
  publishedAt?: string
  updatedAt?: string
}
