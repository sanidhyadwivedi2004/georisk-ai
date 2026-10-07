"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";
import { DURATION } from "@/lib/design-tokens";

interface AnimatedNumberProps {
  value: number;
  /** Duration in seconds */
  duration?: number;
  /** Format the number (e.g. toLocaleString) */
  formatter?: (n: number) => string;
  className?: string;
}

/**
 * Animates a number from 0 to the target value with smooth interpolation.
 * Uses requestAnimationFrame for smooth 60fps updates.
 * Respects prefers-reduced-motion.
 */
export function AnimatedNumber({
  value,
  duration = DURATION.cinematic,
  formatter = (n) => Math.round(n).toString(),
  className = "",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const hasAnimated = useRef(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration, prefersReduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatter(display)}
    </span>
  );
}
