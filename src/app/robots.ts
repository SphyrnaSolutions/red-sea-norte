// NOTE: Cloudflare must NOT inject its own robots.txt (disable "Managed robots.txt" in Cloudflare).
// This file is the single source of truth for robots.txt.
import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
