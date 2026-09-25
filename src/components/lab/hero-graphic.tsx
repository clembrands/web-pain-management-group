// Abstract hero graphic built from the Balanced mark: three stepped planes in the brand
// blues, translucent and lit from above, dissolving into the navy behind them. Decorative;
// a real PMG photograph in navy duotone can take this slot later.
export function HeroGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 640"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="hg-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fb2d6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#7fb2d6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="hg-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3f78a5" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3f78a5" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hg-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b4a66" stopOpacity="0.9" />
          <stop offset="1" stopColor="#16293a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hg-glow" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#7fb2d6" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0f1e2c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hg-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor="#0f1e2c" stopOpacity="0" />
          <stop offset="1" stopColor="#0f1e2c" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="800" height="640" fill="url(#hg-glow)" />
      <g style={{ mixBlendMode: "screen" }}>
        <rect x="120" y="40" width="300" height="300" fill="url(#hg-navy)" />
        <rect x="300" y="170" width="300" height="300" fill="url(#hg-brand)" />
        <rect x="480" y="300" width="300" height="300" fill="url(#hg-sky)" />
      </g>
      <g fill="none" stroke="#7fb2d6" strokeOpacity="0.35" strokeWidth="1">
        <rect x="120" y="40" width="300" height="300" />
        <rect x="300" y="170" width="300" height="300" />
        <rect x="480" y="300" width="300" height="300" />
      </g>
      <rect width="800" height="640" fill="url(#hg-fade)" />
    </svg>
  );
}
