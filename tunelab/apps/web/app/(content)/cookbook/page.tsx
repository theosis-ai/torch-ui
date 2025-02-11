import { CookbookPosts } from "@/components/cookbook-posts";

export default function Page() {
  return (
    <section className="mx-auto w-full max-w-xl overflow-y-hidden">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Tune Lab Cookbook
      </h1>
      <p className="mb-4">
        {`Welcome to the Cookbook! Use this guide to learn how to tune, distill, and align Llama models with PyTorch native frameworks`}
      </p>
      <div className="my-8">
        <CookbookPosts section="cookbook" />
      </div>
    </section>
  );
}
