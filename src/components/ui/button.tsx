import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[transform,box-shadow,background-color,border-color,opacity] duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-gradient text-black shadow-[0_10px_30px_-12px_rgba(186,138,75,0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(186,138,75,0.85)] active:translate-y-0",
        secondary:
          "border border-line text-ink-primary bg-transparent hover:border-gold hover:text-gold-light active:translate-y-0",
        ghost: "text-ink-secondary hover:text-ink-primary hover:bg-white/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
