import { getAllExperienciasSlugsData } from '@/lib/data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export async function GET() {
  const experiencias = await getAllExperienciasSlugsData()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${experiencias
  .map(
    (exp) => `  <url>
    <loc>${BASE_URL}/experiencias/${exp.slug}</loc>${
      exp.lastModified
        ? `\n    <lastmod>${new Date(exp.lastModified).toISOString().split('T')[0]}</lastmod>`
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
