const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/** Static pages sitemap -- homepage, listing pages, privacy policy */
export async function GET() {
  const staticPages = [
    BASE_URL,
    `${BASE_URL}/blog`,
    `${BASE_URL}/rutas`,
    `${BASE_URL}/cursos`,
    `${BASE_URL}/experiencias`,
    `${BASE_URL}/politica-de-privacidad`,
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
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
