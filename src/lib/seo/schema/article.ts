import type { Article, WithContext } from 'schema-dts'
import type { WagtailBlogPostPage } from '@/lib/wagtail/types'

/** Standardized author name across all BlogPosting schemas */
const STANDARD_AUTHOR = 'Karlos Simon'

export function buildArticleSchema(
  page: WagtailBlogPostPage,
  baseUrl: string,
  urlSlug?: string
): WithContext<Article> {
  const slug = urlSlug || page.meta.slug
  const heroImageUrl = page.hero_image?.url
    ? page.hero_image.url.startsWith('http')
      ? page.hero_image.url
      : `${baseUrl}${page.hero_image.url}`
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.meta_description || page.excerpt,
    ...(heroImageUrl ? { image: heroImageUrl } : {}),
    author: {
      '@type': 'Person',
      name: STANDARD_AUTHOR,
      url: `${baseUrl}/sobre-nosotros`,
    },
    datePublished: page.published_at,
    ...(page.meta.last_published_at
      ? { dateModified: page.meta.last_published_at.split('T')[0] }
      : {}),
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
