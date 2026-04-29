"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-in + ongoing gentle float for product imagery and mockup frames.
 */
export function FloatingPictureFrame({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "-0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="origin-center animate-picture-float"
        style={{ animationDelay: `${0.2 + delay * 0.12}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}
