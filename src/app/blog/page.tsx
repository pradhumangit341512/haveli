import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Jaipur Travel Blog & Guides | The Shekhawat Haveli",
  description: "Travel guides, wedding planning tips, and cultural insights for Jaipur.",
};

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>Travel & Culture</p>
        <h1 className="sec-title">Jaipur Travel <em>Blog & Guides</em></h1>
        <div className="sec-line" style={{ margin: "16px auto" }}></div>
        <p className="sec-desc">Insider tips, cultural insights, and travel guides to help you experience the best of Jaipur and Rajasthan.</p>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="explore-card">
                <div className="explore-img">
                  <Image src={post.image} alt={post.imageAlt} width={500} height={300} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                </div>
                <div className="explore-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "var(--gold-d)", fontWeight: 500, letterSpacing: 1 }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: "var(--text-l)" }}>{post.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 17, color: "var(--maroon-d)", marginBottom: 8, lineHeight: 1.3 }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: "inherit" }}>{post.title}</Link>
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--text-m)", lineHeight: 1.6, marginBottom: 12 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--text-l)" }}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <Link href={`/blog/${post.slug}`} style={{ fontSize: 11, color: "var(--gold-d)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 500 }}>Read More &rarr;</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
