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

const typeTitleStyles: Record<string, string> = {
  note: "group-hover:text-rose-400 group-focus-within:text-rose-400 active:text-rose-400",
  blog: "group-hover:text-blue-400 group-focus-within:text-blue-400 active:text-blue-400",
  project: "group-hover:text-emerald-400 group-focus-within:text-emerald-400 active:text-emerald-400"
};

export default function PostCard({ post, activeTag }: PostCardProps) {
  const hoverClass =
    typeTitleStyles[(post.type ?? "").toLowerCase()] ||
    "group-hover:text-accent group-focus-within:text-accent active:text-accent";

  return (
    <article className="group rounded-2xl border border-border bg-bg-alt p-6 transition hover:border-text">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted">
        <span>{formatDate(post.date)}</span>
        <span>•</span>
        <span>{post.type}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
        <a className={`text-text transition ${hoverClass}`} href={`/blog/${post.slug}`}>
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
