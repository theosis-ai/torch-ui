import "@workspace/ui/styles/content.css";
import { notFound } from "next/navigation";
import { CustomMDX } from "@workspace/ui/components/mdx";
import { getSectionPosts } from "@workspace/ui/lib/getPosts";
import { baseUrl } from "../../sitemap";

export async function generateStaticParams() {
  const posts = getSectionPosts("cookbook");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getSectionPosts("cookbook").find(
    (post) => post.slug === params.slug,
  );
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    subtitle: subtitle,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      subtitle,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/cookbook/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      subtitle,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getSectionPosts("cookbook").find(
    (post) => post.slug === params.slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            subtitle: post.metadata.subtitle,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            position: post.metadata.position,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/cookbook/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Llama Cookbook",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-lg tracking-tighter text-neutral-600 dark:text-neutral-400">
          {post.metadata.subtitle}
        </p>
      </div>
      {/* <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div> */}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
