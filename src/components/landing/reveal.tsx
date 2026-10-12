"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Anim = "up" | "down" | "left" | "right" | "scale" | "blur" | "tilt" | "fade" | "clip";
type Tag = "div" | "li" | "span" | "p" | "ul" | "ol" | "article" | "figure" | "h2" | "h3" | "header";

/** Fades/slides its content in the first time it scrolls into view (sets data-in). */
export function Reveal({
  as = "div",
  anim = "up",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: Tag;
  anim?: Anim;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  role?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Component = as as ElementType;
  return (
    <Component
      ref={ref}
      data-anim={anim}
      className={cn("lp-reveal", className)}
      style={{ "--lp-delay": `${delay}s`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Runs the looping CSS animations inside only while the block is on screen. */
export function Loop({ className, children, style }: { className?: string; children?: ReactNode; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute("data-in", "");
        else el.removeAttribute("data-in");
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("lp-loop", className)} style={style}>
      {children}
    </div>
  );
}
