import type { TouristTrip, Article, FAQPage, WithContext } from 'schema-dts'
import type { WagtailPageWithSEO, WagtailBlogPostPage } from '@/lib/wagtail/types'
import { buildTouristTripSchema } from './tourist-trip'
import { buildArticleSchema } from './article'
import { buildFAQPageSchema } from './faq-page'

export { buildTouristTripSchema } from './tourist-trip'
export { buildArticleSchema } from './article'
export { buildFAQPageSchema } from './faq-page'
export { buildBreadcrumbSchema } from './breadcrumb'

export type SchemaType = 'TouristTrip' | 'Article' | 'FAQPage'

interface SchemaInput {
  type: SchemaType
  page: WagtailPageWithSEO
  baseUrl: string
}

export function generateSchema(
  input: SchemaInput
): WithContext<TouristTrip | Article | FAQPage> | null {
  switch (input.type) {
    case 'TouristTrip':
      return buildTouristTripSchema(input.page, input.baseUrl)
    case 'Article':
      return buildArticleSchema(
        input.page as WagtailBlogPostPage,
        input.baseUrl
      )
    case 'FAQPage':
      // FAQPage requires explicit FAQ items, not a page object
      // Use buildFAQPageSchema directly for FAQPage
      return null
    default:
      return null
  }
}
