// The Balanced model as a three-part mark: three stepped squares, one per responsibility
// (medically, socially, financially), echoing the block grid in PMG's logo. Used solid at
// small sizes and as an outline watermark at large ones.
export function BalancedMark({
  variant = "solid",
  className = "",
}: {
  variant?: "solid" | "outline";
  className?: string;
}) {
  const squares = [
    { x: 0, y: 0, fill: "#16293a" },
    { x: 34, y: 22, fill: "#3f78a5" },
    { x: 68, y: 44, fill: "#7fb2d6" },
  ];
  return (
    <svg
      viewBox="-1 -1 114 90"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {squares.map((s, i) =>
        variant === "solid" ? (
          <rect key={i} x={s.x} y={s.y} width={44} height={44} fill={s.fill} />
        ) : (
          <rect
            key={i}
            x={s.x}
            y={s.y}
            width={44}
            height={44}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.6}
          />
        ),
      )}
    </svg>
  );
}

export const balancedLines = [
  "Medically responsible for patients",
  "Socially responsible for communities",
  "Financially responsible for hospitals",
];
