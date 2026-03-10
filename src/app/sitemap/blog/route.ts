import { getAllBlogPostSlugsData } from '@/lib/data'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/** Merged post slugs -- these get 301 redirects, must never appear in sitemaps */
const MERGED_POST_SLUGS = [
  'giannis-d-abu-nuhas',
  'dunraven-mar-rojo',
  'carnatic-abu-nuhas',
  'camarotes-comida-wifi-liveaboard',
  'shark-yolanda-reef-mar-rojo',
]

export async function GET() {
  const posts = await getAllBlogPostSlugsData()
  const filtered = posts.filter((p) => !MERGED_POST_SLUGS.includes(p.slug))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${filtered
  .map(
    (post) => `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>${
      post.lastModified
        ? `\n    <lastmod>${new Date(post.lastModified).toISOString().split('T')[0]}</lastmod>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
