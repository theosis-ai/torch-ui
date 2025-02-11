import { BlogPosts } from "@/components/blog-posts";

export default function Page() {
  return (
    <section className="mx-auto w-full max-w-xl overflow-y-hidden">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Tune Lab Blog
      </h1>
      <p className="mb-4">
        {`Welcome to the Blog! Read on for release notes and roadmap plans.`}
      </p>
      <div className="my-8">
        <BlogPosts section="blog" />
      </div>
    </section>
  );
}
