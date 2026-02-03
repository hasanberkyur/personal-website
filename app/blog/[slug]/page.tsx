import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getAllSlugs, getPostBySlug } from "../../../lib/posts";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-20">
        <article className="py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Post</p>
          <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border px-3 py-1 font-mono text-muted transition hover:border-text hover:text-text"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8">
            <div
              className="note-content text-base leading-relaxed text-muted"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
