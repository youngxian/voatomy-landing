"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-lime text-teal shadow-sm hover:bg-accent-lime/90 hover:shadow-md hover:shadow-accent-lime/20",
        secondary:
          "border border-theme bg-theme-subtle text-theme hover:bg-theme-card hover:border-theme-h",
        ghost:
          "bg-transparent text-theme-s hover:bg-theme-subtle hover:text-theme",
        dark:
          "bg-theme-card text-theme border border-theme hover:bg-theme-s",
        link: "text-theme-s underline-offset-4 hover:underline hover:text-theme border-0 bg-transparent",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-lg",
        md: "h-11 px-5 text-sm rounded-xl",
        lg: "h-12 px-6 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl",
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
