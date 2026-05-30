"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fynk-orange/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-fynk-orange text-white shadow-sm shadow-fynk-orange/20 hover:bg-fynk-orange-hover hover:shadow-md hover:shadow-fynk-orange/25",
        secondary:
          "rounded-full border border-fynk-border bg-white text-fynk-ink hover:border-fynk-border-hover hover:bg-fynk-surface-alt",
        ghost:
          "rounded-xl bg-transparent text-fynk-body hover:bg-fynk-surface-alt hover:text-fynk-ink",
        dark:
          "rounded-xl bg-fynk-ink text-white border border-fynk-ink hover:bg-fynk-body",
        link: "text-fynk-body underline-offset-4 hover:underline hover:text-fynk-ink border-0 bg-transparent rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
