import * as React from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  itemClassName,
}: {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div className="marquee-track group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <div
            key={i}
            className={cn(
              "mx-4 flex shrink-0 items-center justify-center",
              itemClassName
            )}
            aria-hidden={i >= items.length}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
