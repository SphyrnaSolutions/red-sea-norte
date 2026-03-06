import type { TouristTrip, WithContext } from 'schema-dts'
import type { WagtailPageWithSEO } from '@/lib/wagtail/types'

export function buildTouristTripSchema(
  page: WagtailPageWithSEO,
  baseUrl: string
): WithContext<TouristTrip> {
  const heroImage = (page as Record<string, unknown>).hero_background_image as
    | { url?: string }
    | undefined

  const imageUrl = heroImage?.url
    ? heroImage.url.startsWith('http')
      ? heroImage.url
      : `${baseUrl}${heroImage.url}`
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: page.title,
    description: page.meta_description || '',
    ...(imageUrl ? { image: imageUrl } : {}),
    touristType: 'Scuba Diving',
    provider: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
      url: baseUrl,
    },
    url: `${baseUrl}/${page.meta.slug}`,
  }
}
