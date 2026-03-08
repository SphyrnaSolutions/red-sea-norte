const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/** Static pages sitemap -- homepage, blog listing, privacy policy */
export async function GET() {
  const staticPages = [
    { loc: BASE_URL, changefreq: 'daily', priority: '1.0' },
    { loc: `${BASE_URL}/blog`, changefreq: 'daily', priority: '0.9' },
    { loc: `${BASE_URL}/politica-de-privacidad`, changefreq: 'yearly', priority: '0.2' },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
