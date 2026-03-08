import { getAllRutasSlugsData } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export async function GET() {
  const rutas = await getAllRutasSlugsData()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rutas
  .map(
    (ruta) => `  <url>
    <loc>${BASE_URL}/rutas/${ruta.slug}</loc>${
      ruta.lastModified
        ? `\n    <lastmod>${new Date(ruta.lastModified).toISOString().split('T')[0]}</lastmod>`
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
