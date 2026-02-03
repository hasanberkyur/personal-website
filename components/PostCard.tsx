"use client";

import TagChip from "./TagChip";
import type { Post } from "../lib/posts";

type PostCardProps = {
  post: Post;
  activeTag?: string;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

export default function PostCard({ post, activeTag }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-bg-alt p-6 transition hover:border-text">
      <p className="text-xs uppercase tracking-[0.28em] text-muted">{formatDate(post.date)}</p>
      <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
        <a className="transition hover:text-accent" href={`/blog/${post.slug}`}>
          {post.title}
        </a>
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagChip
            key={`${post.slug}-${tag}`}
            label={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            active={activeTag?.toLowerCase() === tag.toLowerCase()}
          />
        ))}
      </div>
    </article>
  );
}
