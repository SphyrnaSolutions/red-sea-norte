import { getAllBlogPostsData } from "@/lib/data"
import BlogListingClient from "./blog-listing-client"

// Render on demand, fetch-level caching in client.ts handles ISR
export const dynamic = 'force-dynamic'

export default async function BlogListingPage() {
  const posts = await getAllBlogPostsData()

  return <BlogListingClient posts={posts} />
}
