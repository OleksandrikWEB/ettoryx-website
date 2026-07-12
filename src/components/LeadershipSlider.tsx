"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { TeamMember } from "@/lib/cms/types";
import { TeamCard } from "@/components/cards";
import { cn } from "@/lib/utils";

export function LeadershipSlider({
  members,
  locale,
}: {
  members: TeamMember[];
  locale: Locale;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
  });

  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" data-testid="leadership-slider">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {members.map((m) => (
            <div
              key={m.slug}
              className="min-w-0 shrink-0 grow-0 basis-full pl-6 first:pl-0 sm:basis-1/2 lg:basis-1/3"
            >
              <TeamCard member={m} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              data-testid={`leadership-dot-${i}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected ? "w-8 bg-gold" : "w-1.5 bg-line"
              )}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
            data-testid="leadership-prev"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-primary transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
            data-testid="leadership-next"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-primary transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
