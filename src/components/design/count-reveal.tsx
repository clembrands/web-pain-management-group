"use client";

import { useEffect, useRef, useState } from "react";

// Keeps its counting figures out of sight until they are fully in view, then lets them count
// up once (see .count-reveal in globals.css). Used for figures that sit near the bottom of the
// screen when a page opens, where a scroll-linked count would stop at a partial number. On a
// screen tall enough to show them whole, they count as the page loads.
export function CountReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      // Whole figure visible, and clear of the bottom tenth of the screen.
      { threshold: 1, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return (
    <span
      ref={ref}
      className="count-reveal"
      data-shown={shown ? "" : undefined}
    >
      {children}
    </span>
  );
}
