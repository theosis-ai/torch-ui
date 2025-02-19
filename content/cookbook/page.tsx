import { CookbookPosts } from "@/components/cookbook-posts";

export default function Page() {
  return (
    <section className="mx-auto w-full max-w-2xl overflow-y-hidden">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Cookbook</h1>
      <p className="mb-4 text-muted-foreground">
        {`Welcome to the Cookbook! This guide explores recipes for model tuning with torchtune, 
        and building generative AI applications with Llama Stack.`}
      </p>
      <div className="my-8">
        <CookbookPosts />
      </div>
    </section>
  );
}
