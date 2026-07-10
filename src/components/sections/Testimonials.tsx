"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export interface TItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function Testimonials({ items }: { items: TItem[] }) {
  const [i, setI] = React.useState(0);
  const go = (d: number) => setI((p) => (p + d + items.length) % items.length);

  React.useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  const item = items[i];

  return (
    <div className="relative mx-auto max-w-3xl text-center" data-testid="testimonials">
      <Quote className="mx-auto mb-6 h-10 w-10 text-gold" />
      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-display text-h5 leading-relaxed text-ink-primary sm:text-h4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-6 text-body text-ink-secondary">
              <span className="font-semibold text-gold-light">{item.author}</span>
              {" — "}
              {item.role}, {item.company}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          data-testid="testimonial-prev"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-gold hover:text-gold-light"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${idx === i ? "w-6 bg-gold-gradient" : "w-2 bg-line"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          data-testid="testimonial-next"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-gold hover:text-gold-light"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
