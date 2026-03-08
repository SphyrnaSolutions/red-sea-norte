const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/**
 * Sitemap index -- links to per-category sitemaps for focused crawl budget.
 * Serves at /sitemap.xml
 */
export async function GET() {
  const categories = [
    'blog',
    'rutas',
    'ofertas',
    'cursos',
    'experiencias',
    'pages',
    'images',
  ]

  const now = new Date().toISOString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories
  .map(
    (cat) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${cat}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
