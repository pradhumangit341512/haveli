"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryImages, galleryCategories } from "@/data/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <section className="page-hero">
        <p className="sec-tag" style={{ color: "var(--gold)" }}>Visual Journey</p>
        <h1 className="sec-title">Photo <em>Gallery</em></h1>
        <div className="sec-line" style={{ margin: "16px auto" }}></div>
        <p className="sec-desc">Explore The Ummed Haveli through our lens &mdash; from the grandeur of our rooms to the magic of rooftop dining.</p>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="gallery-filters">
            {galleryCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: "8px 20px",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  border: "1px solid",
                  borderColor: activeCategory === cat.key ? "var(--gold)" : "var(--sand-d)",
                  background: activeCategory === cat.key ? "var(--gold)" : "transparent",
                  color: activeCategory === cat.key ? "var(--dark)" : "var(--text-m)",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  transition: "all 0.3s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filtered.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "4/3" }}
                onClick={() => setLightboxIndex(i)}
              >
                <Image src={img.src} alt={img.alt} width={400} height={300} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "24px 16px 12px" }}>
                  <p style={{ fontSize: 13, color: "white", fontFamily: "'Cinzel', serif" }}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setLightboxIndex(null)}
        >
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "white", fontSize: 32, cursor: "pointer" }} aria-label="Close lightbox">&times;</button>
          {lightboxIndex > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }} style={{ position: "absolute", left: 16, background: "none", border: "none", color: "white", fontSize: 36, cursor: "pointer" }} aria-label="Previous image">&#8249;</button>
          )}
          {lightboxIndex < filtered.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }} style={{ position: "absolute", right: 16, background: "none", border: "none", color: "white", fontSize: 36, cursor: "pointer" }} aria-label="Next image">&#8250;</button>
          )}
          <Image src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt} width={1200} height={800} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }} />
          <p style={{ position: "absolute", bottom: 16, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{filtered[lightboxIndex].caption}</p>
        </div>
      )}
    </>
  );
}
