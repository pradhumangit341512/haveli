import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | The Shekhawat Haveli Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section style={{ background: "var(--dark)", padding: "140px 40px 60px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: "var(--gold)", letterSpacing: 2 }}>{post.category}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>&bull;</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{post.readTime}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>&bull;</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(24px, 3.5vw, 42px)", color: "white", maxWidth: 800, margin: "0 auto", lineHeight: 1.3 }}>
          {post.title}
        </h1>
      </section>

      <section style={{ background: "var(--cream)", padding: "0 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", marginTop: -20 }}>
          <Image src={post.image} alt={post.imageAlt} width={800} height={450} style={{ width: "100%", height: "auto", objectFit: "cover" }} priority />
        </div>
      </section>

      <section style={{ background: "var(--cream)", padding: "40px 40px 80px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: "var(--maroon-d)", marginTop: 36, marginBottom: 12 }}>
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--text-m)", lineHeight: 1.8, marginBottom: 16 }}>
                {block}
              </p>
            );
          })}

          {/* CTA */}
          <div style={{
            background: "var(--charcoal)",
            padding: 32,
            textAlign: "center",
            marginTop: 48,
          }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "var(--gold)", marginBottom: 8 }}>
              Ready to Experience Jaipur?
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
              Book your stay at The Shekhawat Haveli &mdash; just 2 km from Jaipur Airport
            </p>
            <Link href="/#contact" className="btn-gold" style={{ display: "inline-block" }}>
              Book Now &mdash; From &#8377;5,000/night
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/blog" style={{ fontSize: 13, color: "var(--gold-d)", letterSpacing: 2, textTransform: "uppercase" }}>
              &larr; All Blog Posts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
