"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";
import { useInView } from "@/lib/hooks";
import { accent, cn } from "@/lib/utils";

function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return (
    <>
      {n.toLocaleString("en-IN")}
      {suffix}
    </>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, threshold: 0.4 });
  return (
    <section aria-label="Goel Designs in numbers" className="border-y border-line bg-surface">
      <div ref={ref} className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "border-line px-4 py-10 text-center sm:px-6",
              i % 2 === 1 && "border-l",
              i >= 2 && "border-t lg:border-t-0",
              i === 2 && "lg:border-l",
            )}
          >
            <p className={cn("text-[44px] leading-none font-semibold tracking-[-0.03em] tabular-nums sm:text-[52px]", accent[s.accent].fg)}>
              <span className="sr-only">
                {s.value}
                {s.suffix}
              </span>
              <span aria-hidden="true">
                <CountUp to={s.value} suffix={s.suffix} start={inView} />
              </span>
            </p>
            <p className="mx-auto mt-3 max-w-[200px] text-[13px] leading-[1.45] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
