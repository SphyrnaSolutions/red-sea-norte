import type { CollectionPage, BreadcrumbList, WithContext } from 'schema-dts'
import { buildBreadcrumbSchema } from './breadcrumb'

interface CollectionPageInput {
  name: string
  description: string
  url: string
  baseUrl: string
  breadcrumbItems: Array<{ name: string; url: string }>
  items?: Array<{ name: string; url: string; description?: string; image?: string }>
}

export function buildCollectionPageSchema(
  input: CollectionPageInput
): Array<WithContext<CollectionPage> | WithContext<BreadcrumbList>> {
  const collectionPage: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.items && input.items.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: input.items.map((item, i) => ({
              '@type': 'ListItem' as const,
              position: i + 1,
              url: item.url,
              name: item.name,
            })),
          },
        }
      : {}),
    isPartOf: {
      '@type': 'WebSite',
      url: input.baseUrl,
      name: 'Buceo en el Mar Rojo',
    },
  }

  const breadcrumb = buildBreadcrumbSchema(input.breadcrumbItems)

  return [collectionPage, breadcrumb]
}
