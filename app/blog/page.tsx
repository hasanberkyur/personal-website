import BlogFeed from "../../components/BlogFeed";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getAllPosts } from "../../lib/posts";
import { Suspense } from "react";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-6 pb-20">
        <section className="py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Notes</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            A calm, editorial feed of short notes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Focused observations on systems, product craft, and the small decisions that keep work
            grounded.
          </p>
        </section>

        <section className="border-t border-border py-12">
          <Suspense fallback={<div className="text-sm text-muted">Loading notes…</div>}>
            <BlogFeed posts={posts} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
