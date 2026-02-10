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

const typeOptions = [
  { label: "All", value: "" },
  { label: "Note", value: "note" },
  { label: "Blog", value: "blog" },
  { label: "Project", value: "project" }
];

const typeStyles: Record<string, { text: string; border: string; dot: string }> = {
  all: {
    text: "text-text",
    border: "border-l-white",
    dot: "bg-white"
  },
  note: {
    text: "text-rose-400",
    border: "border-rose-400/30",
    dot: "bg-rose-400",
  },
  blog: {
    text: "text-blue-400",
    border: "border-blue-400/40",
    dot: "bg-blue-400"
  },
  project: {
    text: "text-emerald-400",
    border: "border-emerald-400/40",
    dot: "bg-emerald-600"
  }
};

const getTime = (value: string) => new Date(value).getTime();

export default function BlogFeed({ posts }: BlogFeedProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag") || "";
  const activeSort = searchParams.get("sort") === "oldest" ? "oldest" : "newest";
  const activeType = searchParams.get("type") || "";

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

    const typeFiltered = activeType
      ? tagFiltered.filter((post) => post.type?.toLowerCase() === activeType.toLowerCase())
      : tagFiltered;

    return [...typeFiltered].sort((a, b) =>
      activeSort === "oldest" ? getTime(a.date) - getTime(b.date) : getTime(b.date) - getTime(a.date)
    );
  }, [posts, activeTag, activeSort, activeType]);

  const buildHref = (tag?: string, sort?: string, type?: string) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (sort && sort !== "newest") params.set("sort", sort);
    if (type) params.set("type", type);
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  return (
    <div className="space-y-12">
      <div className="space-y-6 border-b border-border pb-6">
        <div className="min-w-0 space-y-3">
          <p className="text-base uppercase tracking-[0.28em] text-muted">Filter</p>
          <div className="relative -mx-6 overflow-hidden px-6">
            <div className="flex w-full max-w-full items-center gap-2.5 overflow-x-auto overscroll-x-contain pb-2 pr-8">
              <TagChip label="All" href={buildHref("", activeSort, activeType)} active={!activeTag} />
              {allTags.map((tag) => (
                <TagChip
                  key={tag}
                  label={tag}
                  href={buildHref(tag, activeSort, activeType)}
                  active={tag === activeTag}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-base uppercase tracking-[0.28em] text-muted">Type</p>
          <div className="flex flex-wrap items-center gap-2.5 text-base text-muted">
            {typeOptions.map((option) => (
              <a
                key={option.value || "all"}
                href={buildHref(activeTag, activeSort, option.value)}
                className={`inline-flex items-center gap-2 rounded-full border border-l-4 px-3 py-1 transition ${
                  typeStyles[option.value || "all"]?.text || ""
                } ${typeStyles[option.value || "all"]?.border || ""} ${
                  activeType === option.value
                    ? "border-l-[7px] border-opacity-100 ring-2 ring-text/35"
                    : "hover:opacity-90"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    typeStyles[option.value || "all"]?.dot || ""
                  }`}
                  aria-hidden="true"
                />
                {option.label}
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-base uppercase tracking-[0.28em] text-muted">Sort</p>
          <div className="flex flex-wrap items-center gap-2.5 text-base text-muted">
            {sortOptions.map((option) => (
              <a
                key={option.value}
                href={buildHref(activeTag, option.value, activeType)}
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
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} activeTag={activeTag} />
        ))}
      </div>
    </div>
  );
}
