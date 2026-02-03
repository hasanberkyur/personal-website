"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "./PostCard";
import TagChip from "./TagChip";
import type { Post } from "../lib/posts";

type BlogFeedProps = {
  posts: Post[];
};

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" }
];

const getTime = (value: string) => new Date(value).getTime();

export default function BlogFeed({ posts }: BlogFeedProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag") || "";
  const activeSort = searchParams.get("sort") === "oldest" ? "oldest" : "newest";

  const allTags = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => unique.add(tag)));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedTag = activeTag.toLowerCase();
    const tagFiltered = normalizedTag
      ? posts.filter((post) => post.tags.some((tag) => tag.toLowerCase() === normalizedTag))
      : posts;

    return [...tagFiltered].sort((a, b) =>
      activeSort === "oldest" ? getTime(a.date) - getTime(b.date) : getTime(b.date) - getTime(a.date)
    );
  }, [posts, activeTag, activeSort]);

  const buildHref = (tag?: string, sort?: string) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (sort && sort !== "newest") params.set("sort", sort);
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Filter</p>
          <div className="flex flex-wrap items-center gap-2.5">
            <TagChip label="All" href={buildHref("", activeSort)} active={!activeTag} />
            {allTags.map((tag) => (
              <TagChip key={tag} label={tag} href={buildHref(tag, activeSort)} active={tag === activeTag} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          {sortOptions.map((option) => (
            <a
              key={option.value}
              href={buildHref(activeTag, option.value)}
              className={`rounded-full border px-3 py-1 transition ${
                activeSort === option.value
                  ? "border-text bg-text text-bg"
                  : "border-border text-muted hover:border-text hover:text-text"
              }`}
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} activeTag={activeTag} />
        ))}
      </div>
    </div>
  );
}
