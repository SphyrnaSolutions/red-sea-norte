import type { BlogPosting, WithContext } from 'schema-dts'
import type { WagtailBlogPostPage } from '@/lib/wagtail/types'

/** Standardized author name across all BlogPosting schemas */
const STANDARD_AUTHOR = 'Karlos Simon'

/** Default OG image used when a post has no hero image */
const DEFAULT_IMAGE = '/images/og-default.jpg'

export function buildArticleSchema(
  page: WagtailBlogPostPage,
  baseUrl: string,
  urlSlug?: string
): WithContext<BlogPosting> {
  const slug = urlSlug || page.meta.slug
  const heroImageUrl = page.hero_image?.url
    ? page.hero_image.url.startsWith('http')
      ? page.hero_image.url
      : `${baseUrl}${page.hero_image.url}`
    : `${baseUrl}${DEFAULT_IMAGE}`

  const datePublished = page.published_at || page.meta.first_published_at
  const dateModified = page.meta.last_published_at || datePublished

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.title,
    description: page.meta_description || page.excerpt,
    image: heroImageUrl,
    author: {
      '@type': 'Person',
      name: STANDARD_AUTHOR,
      url: `${baseUrl}/sobre-nosotros`,
    },
    ...(datePublished ? { datePublished: datePublished.split('T')[0] } : {}),
    ...(dateModified ? { dateModified: dateModified.split('T')[0] } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${slug}`,
    },
    url: `${baseUrl}/blog/${slug}`,
    inLanguage: 'es',
  }
}
