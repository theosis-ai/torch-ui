import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getCookbookPosts } from "@/lib/getCookbookPosts";
import { baseUrl } from "../../sitemap";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getCookbookPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getCookbookPosts().find((post) => post.slug === slug);
  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
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
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: PageProps) {
  const { slug } = await params;
  const post = getCookbookPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-2xl overflow-y-hidden">
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
              name: "jxtngx",
            },
          }),
        }}
      />
      <h1 className="font-semibold text-4xl tracking-wide dark:text-gray-400">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm ">
        <p className="text-lg text-muted-foreground">{post.metadata.subtitle}</p>
      </div>
      {/* <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div> */}
      <article
        className="prose
        prose-zinc
        prose-headings:mt-8 
        prose-headings:font-semibold 
        prose-headings:text-foreground
        prose-h1:text-2xl
        prose-h2:text-xl
        prose-h3:text-lg
        prose-h4:text-base
        prose-h5:text-sm
        prose-h6:text-xs
        prose-p:text-foreground
        prose-a:text-primary hover:prose-a:opacity-80
        prose-strong:text-foreground
        prose-code:text-primary prose-code:bg-muted
        prose-pre:bg-muted prose-pre:text-foreground
        dark:prose-invert
        dark:prose-headings:text-secondary
        dark:prose-p:text-foreground
        dark:prose-strong:text-foreground
        dark:prose-code:text-primary dark:prose-code:bg-muted
        dark:prose-pre:bg-muted dark:prose-pre:text-foreground"
      >
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
