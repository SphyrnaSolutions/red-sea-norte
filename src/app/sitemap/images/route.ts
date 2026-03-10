export const dynamic = 'force-dynamic'

import {
  getAllBlogPosts,
  getAllRutas,
  getAllOfertas,
  getAllCursos,
  getAllExperiencias,
} from '@/lib/wagtail/fetchers'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

/** Merged post slugs -- excluded from all sitemaps */
const MERGED_POST_SLUGS = [
  'giannis-d-abu-nuhas',
  'dunraven-mar-rojo',
  'carnatic-abu-nuhas',
  'camarotes-comida-wifi-liveaboard',
  'shark-yolanda-reef-mar-rojo',
]

interface ImageEntry {
  pageUrl: string
  imageUrl: string
}

export async function GET() {
  const entries: ImageEntry[] = []
  const fetchConfig = { revalidate: 3600, tags: ['sitemap-images'] }

  try {
    const [blogPosts, rutas, ofertas, cursos, experiencias] = await Promise.all([
      getAllBlogPosts(fetchConfig).catch(() => []),
      getAllRutas(fetchConfig).catch(() => []),
      getAllOfertas(fetchConfig).catch(() => []),
      getAllCursos(fetchConfig).catch(() => []),
      getAllExperiencias(fetchConfig).catch(() => []),
    ])

    // Blog posts with hero images (exclude merged)
    for (const post of blogPosts) {
      if (MERGED_POST_SLUGS.includes(post.slug)) continue
      if (post.hero?.image) {
        entries.push({
          pageUrl: `${BASE_URL}/blog/${post.slug}`,
          imageUrl: post.hero.image,
        })
      }
    }

    // Rutas with hero background images
    for (const ruta of rutas) {
      if (ruta.hero?.backgroundImage) {
        entries.push({
          pageUrl: `${BASE_URL}/rutas/${ruta.slug}`,
          imageUrl: ruta.hero.backgroundImage,
        })
      }
    }

    // Ofertas with hero background images
    for (const oferta of ofertas) {
      if (oferta.hero?.backgroundImage) {
        entries.push({
          pageUrl: `${BASE_URL}/ofertas/${oferta.slug}`,
          imageUrl: oferta.hero.backgroundImage,
        })
      }
    }

    // Cursos with hero images
    for (const curso of cursos) {
      if (curso.hero?.image) {
        entries.push({
          pageUrl: `${BASE_URL}/cursos/${curso.slug}`,
          imageUrl: curso.hero.image,
        })
      }
    }

    // Experiencias with hero background images
    for (const exp of experiencias) {
      if (exp.hero?.backgroundImage) {
        entries.push({
          pageUrl: `${BASE_URL}/experiencias/${exp.slug}`,
          imageUrl: exp.hero.backgroundImage,
        })
      }
    }
  } catch (error) {
    console.error('[Image Sitemap] Error fetching data:', error)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(entry.imageUrl)}</image:loc>
    </image:image>
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

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
