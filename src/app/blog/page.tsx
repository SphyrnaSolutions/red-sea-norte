import { getAllBlogPostsData } from "@/lib/data"
import BlogListingClient from "./blog-listing-client"

// ISR: revalidate every 10 minutes (matches blog data layer TTL)
export const revalidate = 600

export default async function BlogListingPage() {
  const posts = await getAllBlogPostsData()

  return <BlogListingClient posts={posts} />
}
