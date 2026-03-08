import type { Metadata } from 'next'
import { getAllBlogPostsListingData } from "@/lib/data"
import { JsonLd } from "@/components/seo/JsonLd"
import { buildCollectionPageSchema } from "@/lib/seo/schema"
import BlogListingClient from "./blog-listing-client"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

export const metadata: Metadata = {
  title: 'Blog de Buceo en el Mar Rojo | Guias, Rutas y Consejos',
  description: 'Articulos sobre buceo en el Mar Rojo: guias de rutas, pecios emblematicos, vida a bordo y consejos practicos para tu safari de buceo desde Hurghada.',
  openGraph: {
    title: 'Blog de Buceo en el Mar Rojo | Guias, Rutas y Consejos',
    description: 'Articulos sobre buceo en el Mar Rojo: guias de rutas, pecios emblematicos, vida a bordo y consejos para tu safari de buceo.',
    type: 'website',
    url: `${BASE_URL}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de Buceo en el Mar Rojo | Guias, Rutas y Consejos',
    description: 'Articulos sobre buceo en el Mar Rojo: guias de rutas, pecios emblematicos y consejos para safaris de buceo.',
  },
  alternates: {
    canonical: `${BASE_URL}/blog/`,
  },
}

// ISR: revalidate every 10 minutes (matches blog data layer TTL)
export const revalidate = 600

export default async function BlogListingPage() {
  const posts = await getAllBlogPostsListingData()

  const collectionItems = posts.map(p => ({
    name: p.title,
    url: `${BASE_URL}/blog/${p.slug}`,
    description: p.excerpt,
    image: p.hero?.image,
  }))

  const schemas = buildCollectionPageSchema({
    name: 'Blog de Buceo en el Mar Rojo',
    description: 'Articulos sobre buceo, vida a bordo y rutas en el Mar Rojo desde Hurghada',
    url: `${BASE_URL}/blog`,
    baseUrl: BASE_URL,
    breadcrumbItems: [
      { name: 'Inicio', url: BASE_URL },
      { name: 'Blog', url: `${BASE_URL}/blog` },
    ],
    items: collectionItems,
  })

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <BlogListingClient posts={posts} />
    </>
  )
}
