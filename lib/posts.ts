import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type PostFrontmatter = {
  title: string;
  date: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  excerpt: string;
};

export type PostWithContent = Post & {
  content: string;
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

const normalizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  return [];
};

const toExcerpt = (content: string, length = 180) => {
  const cleaned = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[[^\]]+]\([^)]+\)/g, "")
    .replace(/[#>*_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= length) return cleaned;
  return `${cleaned.slice(0, length).trim()}…`;
};

export const getAllPosts = (): Post[] => {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as PostFrontmatter;

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        tags: normalizeTags(frontmatter.tags),
        excerpt: toExcerpt(content)
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = async (slug: string): Promise<PostWithContent | null> => {
  if (!fs.existsSync(postsDirectory)) return null;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  const match = fs
    .readdirSync(postsDirectory)
    .find((file) => {
      const ext = path.extname(file).toLowerCase();
      if (ext !== ".md" && ext !== ".mdx") return false;
      return path.basename(file, ext).toLowerCase() === normalizedSlug;
    });

  if (!match) return null;
  const fullPath = path.join(postsDirectory, match);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;
  const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: normalizeTags(frontmatter.tags),
    excerpt: toExcerpt(content),
    content,
    contentHtml: processedContent.toString()
  };
};

export const getAllSlugs = (): string[] => {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
};
