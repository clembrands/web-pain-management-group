"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Hero background: a still frame first (it is the page's largest paint), then, on screens
// 768px and wider for readers who have not asked for reduced motion, the concept video
// plays once over it and settles on its last frame. Both are toned navy by .duotone and
// fade into the background. A pause control is offered while the video is shown
// (WCAG 2.2.2). Concept footage; replaced or approved by PMG before launch.
export function HeroVideo({
  poster,
  sources,
}: {
  poster: string;
  sources: { src: string; type: string }[];
}) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const video = useRef<HTMLVideoElement>(null);

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

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      if (v.ended) v.currentTime = 0;
      void v.play();
    } else v.pause();
  };

  return (
    <>
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
              ref={video}
              aria-hidden="true"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={poster}
              onCanPlay={() => setVisible(true)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
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
      {enabled && visible && (
        <button
          type="button"
          onClick={toggle}
          className="label absolute top-6 right-6 z-20 inline-flex min-h-11 items-center border border-white/25 px-4 text-[#c4d3df] hover:border-white hover:text-white md:right-12"
        >
          {playing ? "Pause video" : "Play video"}
        </button>
      )}
    </>
  );
}
