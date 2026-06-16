"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function RoomGallery({ images }: { images: GalleryImage[] }) {
  // Only the first three images are shown in the grid (main + 2 side).
  const shown = images.slice(0, 3);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (i: number) => setOpenIndex(((i % shown.length) + shown.length) % shown.length),
    [shown.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(openIndex + 1);
      else if (e.key === "ArrowLeft") go(openIndex - 1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, go, close]);

  if (shown.length === 0) return null;
  const main = shown[0];
  const side = shown.slice(1);

  return (
    <>
      <div className="container room-detail-gallery">
        <button type="button" className="rg-item rg-main" onClick={() => go(0)} aria-label={`View ${main.alt} full size`}>
          <Image src={main.src} alt={main.alt} width={900} height={600} sizes="(max-width: 1024px) 100vw, 66vw" priority />
          <span className="rg-zoom" aria-hidden>⤢</span>
        </button>
        <div className="room-detail-gallery-side">
          {side.map((img, i) => (
            <button type="button" key={i} className="rg-item" onClick={() => go(i + 1)} aria-label={`View ${img.alt} full size`}>
              <Image src={img.src} alt={img.alt} width={450} height={300} sizes="(max-width: 1024px) 50vw, 33vw" />
              <span className="rg-zoom" aria-hidden>⤢</span>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div className="rg-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="rg-close" onClick={close} aria-label="Close">&times;</button>
          {shown.length > 1 && (
            <button type="button" className="rg-nav rg-prev" onClick={(e) => { e.stopPropagation(); go(openIndex - 1); }} aria-label="Previous image">&#8249;</button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown[openIndex].src} alt={shown[openIndex].alt} onClick={(e) => e.stopPropagation()} />
          {shown.length > 1 && (
            <button type="button" className="rg-nav rg-next" onClick={(e) => { e.stopPropagation(); go(openIndex + 1); }} aria-label="Next image">&#8250;</button>
          )}
          <div className="rg-counter">{openIndex + 1} / {shown.length}</div>
        </div>
      )}
    </>
  );
}
