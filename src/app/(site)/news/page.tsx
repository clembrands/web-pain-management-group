import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { PageShell } from "@/components/page-shell";
import { formatDate } from "@/lib/dates";
import { excerpt } from "@/lib/excerpt";
import { newsletterReady } from "@/lib/newsletter";
import { routeMetadata } from "@/lib/seo";
import { getNewsPosts } from "@/sanity/lib/content";

const path = "/news/";
export const metadata = routeMetadata(path);

export default async function NewsPage() {
  const posts = await getNewsPosts();
  return (
    <PageShell
      path={path}
      eyebrow="About PMG"
      lede="Awards, press, and company news from Pain Management Group."
      related={["/about-us/", "/results/", "/partnership/"]}
    >
      <section className="container-shell section-space grid items-start gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ol className="divide-y divide-line border-t border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="py-8">
                <p className="eyebrow">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h2 className="text-2xl">
                  <Link
                    href={`/news/${post.slug}/`}
                    className="hover:text-brand"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 text-muted">{excerpt(post.body, 220)}</p>
                <Link
                  href={`/news/${post.slug}/`}
                  className="mt-5 inline-block py-0.5 text-sm font-semibold text-brand"
                >
                  Read more<span className="sr-only">: {post.title}</span> →
                </Link>
              </article>
            </li>
          ))}
        </ol>
        <div className="lg:sticky lg:top-6">
          <NewsletterForm ready={newsletterReady} />
        </div>
      </section>
    </PageShell>
  );
}
