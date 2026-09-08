import Image from "next/image";
import type { ReviewMedia } from "@/content/review/media";
export function ReviewMediaFigure({
  media,
  compact = false,
  priority = false,
}: {
  media: ReviewMedia;
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-[22px] bg-[#e8f0f5] text-navy">
      <div
        className={`relative overflow-hidden ${compact ? "aspect-[1.8]" : media.treatment === "portrait" ? "aspect-[1.1]" : "aspect-[1.3]"}`}
      >
        {media.src ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            preload={priority}
            sizes={
              compact
                ? "(max-width:767px) 100vw, 33vw"
                : "(max-width:1023px) 100vw, 45vw"
            }
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={media.alt}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#dce9f1] px-6"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 240 180"
              className="h-3/5 w-3/5 max-w-64 text-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {media.treatment === "portrait" ? (
                <>
                  <circle cx="120" cy="60" r="30" fill="#c2d7e5" />
                  <path
                    d="M55 158v-12c0-35 29-58 65-58s65 23 65 58v12"
                    fill="#c2d7e5"
                  />
                  <path d="M35 40V20h25m120 0h25v20M35 140v20h25m120 0h25v-20" />
                </>
              ) : (
                <>
                  <path d="M30 158V45h125v113M155 85h55v73M15 158h210" />
                  <path d="M52 64h20v20H52zm40 0h20v20H92zm40 0h10v20h-10M52 100h20v20H52zm40 0h20v20H92zm40 0h10v20h-10M80 158v-25h30v25M171 102h22m-22 20h22" />
                  <path d="M80 20h25m-12-12v25" />
                </>
              )}
            </svg>
            {!compact && (
              <p className="mt-3 max-w-xs text-center text-sm font-medium">
                {media.treatment === "portrait"
                  ? "The people behind PMG"
                  : "Care in your community"}
              </p>
            )}
          </div>
        )}
      </div>
      <figcaption
        className={`${compact ? "px-4 py-2 text-[10px]" : "px-5 py-3 text-xs"} leading-relaxed text-[#415b70]`}
      >
        {media.caption}
      </figcaption>
    </figure>
  );
}
