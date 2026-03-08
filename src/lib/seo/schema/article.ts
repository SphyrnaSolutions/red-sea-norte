import type { Article, WithContext } from 'schema-dts'
import type { WagtailBlogPostPage } from '@/lib/wagtail/types'

export function buildArticleSchema(
  page: WagtailBlogPostPage,
  baseUrl: string
): WithContext<Article> {
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
      name: page.author?.name || 'Red Sea Norte',
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
    url: `${baseUrl}/blog/${page.meta.slug}`,
    inLanguage: 'es',
  }
}
