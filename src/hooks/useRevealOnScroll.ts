"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useRevealOnScroll(threshold = 0.1): void {
  const pathname = usePathname();

  useEffect(() => {
    // Defer observer setup until after hydration has fully committed so direct
    // DOM mutations never race React's reconciliation and trigger a hydration
    // mismatch (especially under Fast Refresh / HMR in dev).
    let observer: IntersectionObserver | null = null;
    let observed: Element[] = [];
    const rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold }
      );
      observed = Array.from(document.querySelectorAll(".reveal"));
      observed.forEach((el) => observer!.observe(el));
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      // Clear the visible class so HMR re-hydration doesn't see stale DOM state
      // and so the effect re-running on route change starts from a clean slate.
      observed.forEach((el) => el.classList.remove("visible"));
    };
    // Re-run on navigation so new `.reveal` elements on inner pages get observed.
  }, [threshold, pathname]);
}
