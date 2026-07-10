import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "gold" | "outline";
}) {
  const variants = {
    default: "bg-white/5 text-ink-secondary border border-line",
    gold: "bg-gold/10 text-gold-light border border-gold/30",
    outline: "border border-line text-ink-secondary",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
