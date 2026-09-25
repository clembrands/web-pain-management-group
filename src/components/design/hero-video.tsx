"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Hero background: a still frame first (it is the page's largest paint), then, on screens
// 768px and wider for readers who have not asked for reduced motion, the concept video
// plays once over it and settles on its last frame. Both are toned navy by .duotone and
// fade into the background. No controls: it plays once and stops. Concept footage;
// replaced or approved by PMG before launch.
export function HeroVideo({
  poster,
  sources,
}: {
  poster: string;
  sources: { src: string; type: string }[];
}) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(wide.matches && !calm.matches);
    update();
    wide.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  return (
    <figure className="duotone-wrap pointer-events-none absolute inset-0 md:left-[28%]">
      <div className="drift absolute inset-0 scale-110">
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 62vw"
          className="duotone object-cover object-[70%_center] opacity-50 md:opacity-90"
        />
        {enabled && (
          <video
            aria-hidden="true"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={poster}
            onCanPlay={() => setVisible(true)}
            className={`duotone absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-0 transition-opacity duration-700 ${visible ? "md:opacity-90" : ""}`}
          >
            {sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-deep from-5% via-deep/60 via-40% to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-deep via-transparent to-transparent"
      />
    </figure>
  );
}
