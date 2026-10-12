"use client";

import { Check, LoaderCircle, Lock, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo";

const steps = [
  { title: "Discovery call", meta: "Goals, scope & quote" },
  { title: "Design approved", meta: "Mobile + desktop screens" },
  { title: "Built & tested", meta: "Real phones & browsers" },
  { title: "Domain, SSL & hosting", meta: "yourbrand.com connected" },
];

/** A project moving through our process until it goes live, then the loop restarts. */
export function LaunchCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(0);
  const [live, setLive] = useState(false);
  const [cycle, setCycle] = useState(0);
  const running = inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const wait = live ? 3200 : done === steps.length ? 500 : 1100;
    const t = setTimeout(() => {
      if (live) {
        setLive(false);
        setDone(0);
        setCycle((c) => c + 1);
      } else if (done < steps.length) {
        setDone((d) => d + 1);
      } else {
        setLive(true);
      }
    }, wait);
    return () => clearTimeout(t);
  }, [running, done, live]);

  // Reduced motion: show the finished state
  const shownDone = reduced ? steps.length : done;
  const shownLive = reduced || live;
  const pct = Math.round((shownDone / steps.length) * 100);

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-full max-w-[350px] pb-6">
      {/* Stacked cards behind for depth */}
      <div className="absolute inset-x-6 top-4 bottom-2 rotate-[4deg] rounded-card bg-white/10" />
      <div className="absolute inset-x-3 top-2 bottom-4 -rotate-[2deg] rounded-card bg-white/15" />

      <div className="relative overflow-hidden rounded-card border border-white/40 bg-surface shadow-pop">
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <LogoMark className="size-8 rounded-lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-tight font-semibold text-ink">Project launch</p>
            <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted">
              <Lock className="size-3" />
              yourbrand.com
            </p>
          </div>
          {shownLive ? (
            <span
              key={`live-${cycle}`}
              className="lp-pop relative flex h-[22px] items-center gap-1.5 rounded-full bg-success-50 px-2 text-[12px] font-medium text-success-700 ring-1 ring-success-100 ring-inset"
            >
              <span className="lp-burst absolute inset-0 rounded-full bg-success/25" />
              <span className="relative flex size-1.5">
                <span className="lp-ping absolute inset-0 rounded-full bg-success" />
                <span className="relative size-1.5 rounded-full bg-success" />
              </span>
              Live
            </span>
          ) : (
            <span className="flex h-[22px] items-center gap-1.5 rounded-full bg-warning-50 px-2 text-[12px] font-medium text-warning-700 ring-1 ring-warning-100 ring-inset">
              <span className="size-1.5 rounded-full bg-warning" />
              Building
            </span>
          )}
        </div>

        {/* Steps */}
        <ol className="divide-y divide-line px-4">
          {steps.map((s, i) => {
            const isDone = i < shownDone;
            const isCurrent = i === shownDone && !shownLive;
            return (
              <li key={s.title} className="flex items-center gap-3 py-2.5">
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    isDone
                      ? "bg-brand-500 text-white"
                      : isCurrent
                        ? "bg-brand-50 text-brand-500 ring-1 ring-brand-200 ring-inset"
                        : "border border-line-strong bg-surface",
                  )}
                >
                  {isDone ? (
                    <Check key={`c-${i}-${cycle}`} className="lp-pop size-3.5" strokeWidth={3} />
                  ) : isCurrent ? (
                    <LoaderCircle className="size-3.5 motion-safe:animate-spin" />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate text-[13.5px] font-medium", isDone || isCurrent ? "text-ink" : "text-muted")}>
                    {s.title}
                  </span>
                  <span className="block truncate text-[12px] text-muted">{s.meta}</span>
                </span>
                <span
                  className={cn(
                    "shrink-0 text-[11.5px] font-medium",
                    isDone ? "text-success-700" : isCurrent ? "text-brand-600" : "text-subtle",
                  )}
                >
                  {isDone ? "Done" : isCurrent ? "In progress" : "Up next"}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Progress */}
        <div className="border-t border-line bg-canvas px-4 py-3.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted">Launch progress</span>
            <span className="font-semibold text-ink tabular-nums">{pct}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sunken">
            <div
              className={cn(
                "h-full rounded-full transition-[width,background-color] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
                shownLive ? "bg-success" : "bg-brand-500",
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Launch toast */}
      {shownLive && (
        <div
          key={`toast-${cycle}`}
          className="lp-toast absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-night px-3.5 py-2 text-[12.5px] font-medium whitespace-nowrap text-white shadow-pop"
        >
          <Rocket className="size-4 text-brand-300" />
          yourbrand.com is live
        </div>
      )}
    </div>
  );
}
