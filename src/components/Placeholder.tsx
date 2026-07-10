import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

/**
 * Styled placeholder for imagery that will later be replaced by real assets.
 * Keeps correct aspect ratio + descriptive alt so swaps are drop-in.
 */
export function Placeholder({
  alt,
  className,
  ratio = "16/9",
  icon = true,
  label,
}: {
  alt: string;
  className?: string;
  ratio?: string;
  icon?: boolean;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      data-mock="true"
      className={cn(
        "bg-grain relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-bg-surface",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(120% 120% at 20% 10%, rgba(186,138,75,0.18), transparent 55%)",
        }}
      />
      {icon && (
        <div className="relative flex flex-col items-center gap-2 text-ink-secondary/50">
          <ImageOff className="h-8 w-8" />
          {label && <span className="text-caption">{label}</span>}
        </div>
      )}
    </div>
  );
}
