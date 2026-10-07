"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, STAGGER } from "@/lib/design-tokens";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Index for staggered lists */
  staggerIndex?: number;
}

/**
 * Wraps content in a subtle fade-up reveal animation triggered on scroll.
 * Uses CSS transforms (GPU-accelerated). Respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  staggerIndex = 0,
}: AnimatedSectionProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const prefersReduced = useReducedMotion();

  const totalDelay = delay + staggerIndex * STAGGER.normal;

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity ${DURATION.slow}s cubic-bezier(0.25,0.1,0.25,1) ${totalDelay}s, transform ${DURATION.slow}s cubic-bezier(0.25,0.1,0.25,1) ${totalDelay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
