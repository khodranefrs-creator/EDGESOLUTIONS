"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "reveal" | "draw";

const attrFor: Record<Variant, { key: string; idle: string; active: string }> = {
  reveal: { key: "data-reveal", idle: "out", active: "in" },
  draw: { key: "data-draw", idle: "idle", active: "in" },
};

/**
 * Observes its subtree and flips a data attribute once the element
 * enters the viewport. All resulting motion lives in CSS, so this
 * component stays cheap and honors prefers-reduced-motion globally.
 */
export function Inview({
  children,
  className = "",
  variant = "reveal",
  delay = 0,
  threshold,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { key, active } = attrFor[variant];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute(key, active);
            io.disconnect();
          }
        }
      },
      { threshold: threshold ?? 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant, threshold]);

  const { key, idle } = attrFor[variant];
  const style =
    variant === "reveal" && delay
      ? ({ ["--reveal-delay" as string]: delay } as React.CSSProperties)
      : undefined;

  return (
    <div ref={ref} {...{ [key]: idle }} className={className} style={style}>
      {children}
    </div>
  );
}
