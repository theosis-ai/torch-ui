import Link from "next/link";
import { getSectionPosts } from "@workspace/ui/lib/getPosts";

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CookbookPosts() {
  const allPosts = getSectionPosts("cookbook");

  return (
    <div>
      {allPosts
        .sort((a, b) => {
          if (a.metadata.position < b.metadata.position) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-2 mb-4"
            href={`/cookbook/${post.slug}`}
          >
            <div className="flex flex-col items-center md:flex-row space-x-0 md:space-x-2">
              {/* <p className="text-neutral-600 dark:text-neutral-400 w-[25px]">
                {post.metadata.position}
              </p> */}
              <ArrowIcon />
              <hr></hr>
              <p className="w-[150px]">{post.metadata.title}</p>
              <p className="w-[300px] tabular-nums">{post.metadata.subtitle}</p>
              {/* <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p> */}
            </div>
          </Link>
        ))}
    </div>
  );
}
