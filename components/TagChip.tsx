"use client";

import Link from "next/link";

type TagChipProps = {
  label: string;
  href: string;
  active?: boolean;
};

export default function TagChip({ label, href, active }: TagChipProps) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm font-mono transition ${
        active
          ? "border-text bg-text text-bg"
          : "border-border text-muted hover:border-text hover:text-text"
      }`}
    >
      #{label}
    </Link>
  );
}
