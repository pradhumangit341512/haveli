"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const TOTAL = 12;
const PAGES = Array.from(
  { length: TOTAL },
  (_, i) => `/menu/menu-${String(i + 1).padStart(2, "0")}.jpg`
);

export default function MenuGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback((i: number) => setActive(((i % TOTAL) + TOTAL) % TOTAL), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") setActive((p) => (p === null ? p : (p + 1) % TOTAL));
      else if (e.key === "ArrowLeft") setActive((p) => (p === null ? p : (p - 1 + TOTAL) % TOTAL));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="menu-grid">
        {PAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            className="menu-page"
            onClick={() => go(i)}
            aria-label={`View Hawai Jharokha menu page ${i + 1} full size`}
          >
            <Image
              src={src}
              alt={`Hawai Jharokha menu — page ${i + 1}`}
              width={1488}
              height={2105}
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 560px"
              className="menu-page-img"
              loading={i < 2 ? "eager" : "lazy"}
            />
            <span className="menu-page-zoom" aria-hidden>
              &#9906; Tap to zoom
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="menu-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="menu-lb-close" onClick={close} aria-label="Close menu viewer">
            &times;
          </button>
          <button
            className="menu-lb-nav menu-lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              go(active - 1);
            }}
            aria-label="Previous page"
          >
            &#8249;
          </button>
          <div className="menu-lb-stage" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PAGES[active]}
              alt={`Hawai Jharokha menu — page ${active + 1}`}
              className="menu-lb-img"
            />
          </div>
          <button
            className="menu-lb-nav menu-lb-next"
            onClick={(e) => {
              e.stopPropagation();
              go(active + 1);
            }}
            aria-label="Next page"
          >
            &#8250;
          </button>
          <span className="menu-lb-count">
            {active + 1} / {TOTAL}
          </span>
        </div>
      )}
    </>
  );
}
