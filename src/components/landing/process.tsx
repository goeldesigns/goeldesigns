"use client";

import { FileCheck2, Link2, MonitorSmartphone, Rocket, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { process } from "@/lib/content";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const outputIcons: LucideIcon[] = [FileCheck2, MonitorSmartphone, Link2, Rocket];

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Walk through the steps while the list is on screen
  useEffect(() => {
    if (!inView || reduced || hovered !== null) return;
    const t = setInterval(() => setStep((s) => (s + 1) % process.length), 2600);
    return () => clearInterval(t);
  }, [inView, reduced, hovered]);

  const active = hovered ?? step;

  return (
    <section id="process" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we work"
          title={"From first call to launch\u00a0day,"}
          accent="without the fuss."
          lead="One team and one point of contact, from the brief to the day your site goes live — and after."
        />

        <div className="relative mt-16">
          {/* Connector: dashed track, brand fill up to the active step */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-5 right-[12.5%] left-[12.5%] hidden border-t border-dashed border-line-strong lg:block"
          >
            <div
              className="absolute -top-px left-0 h-0.5 w-full origin-left bg-brand-500 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              style={{ transform: `scaleX(${inView ? active / (process.length - 1) : 0})` }}
            />
          </div>

          <ol ref={listRef} className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((p, i) => {
              const on = i === active;
              const done = i < active;
              const I = outputIcons[i];
              return (
                <Reveal as="li" key={p.title} anim="up" delay={0.1 + i * 0.1} className="relative">
                  <div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "h-full rounded-card border bg-surface p-5 transition-[border-color,box-shadow] duration-300 lg:border-transparent lg:bg-transparent lg:p-0 lg:text-center",
                      on ? "border-brand-200 shadow-raised lg:shadow-none" : "border-line shadow-card lg:shadow-none",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 grid size-10 place-items-center rounded-full text-[14px] font-semibold tabular-nums transition-colors duration-300 lg:mx-auto",
                        on
                          ? "lp-ring bg-brand-500 text-white"
                          : done
                            ? "bg-brand-100 text-brand-700"
                            : "border border-line-strong bg-surface text-muted",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-muted lg:mx-auto lg:max-w-[240px]">{p.body}</p>
                    <p
                      className={cn(
                        "mt-4 inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium ring-1 transition-colors duration-300 ring-inset",
                        on ? "bg-brand-100 text-brand-700 ring-brand-200" : "bg-sunken text-ink-2 ring-line",
                      )}
                    >
                      <I className="size-3.5" aria-hidden="true" />
                      You get: {p.output}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
