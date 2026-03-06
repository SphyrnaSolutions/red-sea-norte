import type { Metadata } from 'next'
import type { WagtailPageWithSEO } from '@/lib/wagtail/types'

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/**
 * Build a canonical URL for a content page.
 * Single source of truth to avoid trailing-slash/www mismatch pitfalls.
 */
export function buildCanonicalUrl(contentType: string, slug: string): string {
  return `${BASE_URL}/${contentType}/${slug}`
}

interface MetadataInput {
  page: WagtailPageWithSEO
  contentType: string // 'rutas' | 'blog' | 'experiencias' | 'cursos' | 'ofertas'
  slug: string
}

/**
 * Build consistent Next.js Metadata from a Wagtail page with SEO fields.
 * Replaces per-page hand-rolled metadata generation.
 */
export function buildPageMetadata(input: MetadataInput): Metadata {
  const { page, contentType, slug } = input

  const title = `${page.social_title || page.title} | Red Sea Diving`
  const description = page.meta_description || ''

  const keywords = page.meta_keywords
    ? page.meta_keywords.split(',').map((k) => k.trim())
    : undefined

  const ogTitle = page.social_title || page.title
  const ogDescription =
    page.social_description || page.meta_description || ''

  const socialImageUrl = page.social_image?.url
  const images = socialImageUrl
    ? [
        {
          url: socialImageUrl.startsWith('http')
            ? socialImageUrl
            : `${BASE_URL}${socialImageUrl}`,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ]
    : []

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: contentType === 'blog' ? 'article' : 'website',
      locale: 'es_ES',
      ...(images.length > 0 ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(images.length > 0 ? { images: images.map((i) => i.url) } : {}),
    },
    alternates: {
      canonical: buildCanonicalUrl(contentType, slug),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
