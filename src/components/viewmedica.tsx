"use client";
import Script from "next/script";

// ViewMedica embeds, reproduced exactly as they appear on the live articles. ViewMedica
// licenses can be locked to a domain, so playback is checked on the production domain
// before launch (docs/launch-checklist.md).

// "width:720px; max-width:100%" -> { width: "720px", maxWidth: "100%" }
function parseStyle(css?: string): React.CSSProperties | undefined {
  if (!css) return undefined;
  return Object.fromEntries(
    css
      .split(";")
      .map((rule) => rule.split(":").map((s) => s.trim()))
      .filter(([k, v]) => k && v)
      .map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v]),
  );
}

export function ViewMedicaFrame({
  src,
  style,
  allow,
  loading,
  allowFullScreen,
  title,
}: {
  src: string;
  style?: string;
  allow?: string;
  loading?: string;
  allowFullScreen?: boolean;
  title: string;
}) {
  return (
    <iframe
      src={src}
      style={parseStyle(style)}
      allow={allow}
      loading={loading === "lazy" ? "lazy" : undefined}
      allowFullScreen={allowFullScreen}
      frameBorder="0"
      title={title}
      className="my-8 block"
    />
  );
}

declare global {
  interface Window {
    client?: string;
    openthis?: string;
    width?: number;
    vm_open?: () => void;
  }
}

// The older embed: a target div, ViewMedica's loader script, and a call to vm_open() with
// the same client, video code, and width the live page used.
export function ViewMedicaScript({
  code,
  client,
  width,
  scriptSrc,
}: {
  code: string;
  client: string;
  width?: number;
  scriptSrc: string;
}) {
  return (
    <div className="my-8">
      <div id={code} />
      <Script
        src={scriptSrc}
        strategy="afterInteractive"
        onReady={() => {
          window.client = client;
          window.openthis = code;
          if (width) window.width = width;
          window.vm_open?.();
        }}
      />
    </div>
  );
}
