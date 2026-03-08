import { getAllOfertasSlugsData } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export async function GET() {
  const ofertas = await getAllOfertasSlugsData()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ofertas
  .map(
    (oferta) => `  <url>
    <loc>${BASE_URL}/ofertas/${oferta.slug}</loc>${
      oferta.lastModified
        ? `\n    <lastmod>${new Date(oferta.lastModified).toISOString()}</lastmod>`
        : ''
    }
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
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
