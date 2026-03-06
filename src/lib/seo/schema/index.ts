import type { TouristTrip, Article, WithContext } from 'schema-dts'
import type { WagtailPageWithSEO, WagtailBlogPostPage } from '@/lib/wagtail/types'
import { buildTouristTripSchema } from './tourist-trip'
import { buildArticleSchema } from './article'

export { buildTouristTripSchema } from './tourist-trip'
export { buildArticleSchema } from './article'
// FAQPage schemas should call buildFAQPageSchema directly with their FAQ items
export { buildFAQPageSchema } from './faq-page'
export { buildBreadcrumbSchema } from './breadcrumb'

export type SchemaType = 'TouristTrip' | 'Article'

interface SchemaInput {
  type: SchemaType
  page: WagtailPageWithSEO
  baseUrl: string
}

export function generateSchema(
  input: SchemaInput
): WithContext<TouristTrip | Article> | null {
  switch (input.type) {
    case 'TouristTrip':
      return buildTouristTripSchema(input.page, input.baseUrl)
    case 'Article':
      return buildArticleSchema(
        input.page as WagtailBlogPostPage,
        input.baseUrl
      )
    default:
      return null
  }
}
