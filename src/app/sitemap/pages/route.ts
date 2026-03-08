const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/** Static pages sitemap -- homepage, listing pages, privacy policy */
export async function GET() {
  const staticPages = [
    { loc: BASE_URL, lastmod: '2026-03-08' },
    { loc: `${BASE_URL}/blog`, lastmod: '2026-03-08' },
    { loc: `${BASE_URL}/rutas`, lastmod: '2026-03-08' },
    { loc: `${BASE_URL}/cursos`, lastmod: '2026-03-08' },
    { loc: `${BASE_URL}/experiencias`, lastmod: '2026-03-08' },
    { loc: `${BASE_URL}/politica-de-privacidad`, lastmod: '2026-03-08' },
    { loc: `${BASE_URL}/contacto`, lastmod: '2026-03-08' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
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
