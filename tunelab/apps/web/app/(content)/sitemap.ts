import { getSectionPosts } from "@/lib/getPosts";

export const baseUrl = "https://tunelab.theosis.ai";

export default async function sitemap() {
  const blog_posts = getSectionPosts("blog").map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
  const blog_routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const cookbook_posts = getSectionPosts("cookbook").map((post) => ({
    url: `${baseUrl}/cookbook/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));
  const cookbook_routes = ["", "/cookbook"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [
    ...blog_routes,
    ...blog_posts,
    ...cookbook_routes,
    ...cookbook_posts,
  ];
}
