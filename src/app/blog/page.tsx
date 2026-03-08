import type { Metadata } from 'next'
import { getAllBlogPostsListingData } from "@/lib/data"
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

  return <BlogListingClient posts={posts} />
}
