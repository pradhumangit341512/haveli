"use client";

import { useEffect, useState } from "react";

export function useLoader(delay = 1200): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return hidden;
}
