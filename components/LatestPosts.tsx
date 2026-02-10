import Section from "./Section";
import type { Post } from "../lib/posts";

type LatestPostsProps = {
  posts: Post[];
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

export default function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <Section
      id="posts"
      title="My latest posts"
      description={
        <>
          A mix of <strong className="font-semibold">notes</strong>
          , <strong className="font-semibold">blogs</strong>
          , and <strong className="font-semibold">projects</strong> 
           — things I’m working on and learning from.
        </>
      }
    >
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-border bg-bg-alt p-5 transition hover:border-text"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span>{formatDate(post.date)}</span>
              <span>&bull;</span>
              <span className="font-mono">
                {post.tags.slice(0, 3).map((tag) => `#${tag}`).join(" ")}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">
              <a className="transition hover:text-accent" href={`/blog/${post.slug}`}>
                {post.title}
              </a>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <a className="text-sm font-medium text-accent underline decoration-border" href="/blog">
          View all posts
        </a>
      </div>
    </Section>
  );
}
