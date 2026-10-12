"use client";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { projects } from "@/lib/content";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { accent, cn } from "@/lib/utils";
import { buttonClass } from "../ui/button";
import { BrowserFrame, PhoneFrame } from "./frames";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const DURATION = 9; // seconds per project while auto-playing

export function Work() {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState<"home" | "detail">("home");
  const [hold, setHold] = useState(false); // hover / focus inside
  const [manual, setManual] = useState(false); // user picked a project: stop auto-play
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(stageRef, { threshold: 0.25 });
  const reduced = usePrefersReducedMotion();
  const playing = inView && !hold && !manual && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % projects.length);
      setView("home");
    }, DURATION * 1000);
    return () => clearTimeout(t);
  }, [playing, index]);

  const select = (i: number) => {
    setIndex(i);
    setView("home");
    setManual(true);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + projects.length) % projects.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const p = projects[index];
  const a = accent[p.accent];
  const shot = view === "home" ? p.shots.desktop : p.shots.detail;

  return (
    <section id="work" className="relative overflow-hidden bg-night py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="lp-drift pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(80_64_208/0.35),transparent)] blur-2xl"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          tone="night"
          eyebrow="Selected work"
          title="Real products,"
          accent="live right now."
          lead="Sites and apps our team designed and built. Every one is live — open it in a new tab and try it yourself."
        />

        <div
          ref={stageRef}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
          }}
        >
          {/* Project tabs */}
          <Reveal anim="up" delay={0.1} className="mt-12">
            <div
              role="tablist"
              aria-label="Projects"
              className="-mx-4 no-scrollbar flex snap-x gap-2 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0"
            >
              {projects.map((proj, i) => {
                const on = i === index;
                const pa = accent[proj.accent];
                return (
                  <button
                    key={proj.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`work-tab-${proj.id}`}
                    aria-selected={on}
                    aria-controls="work-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={cn(
                      "relative flex min-w-[240px] snap-start items-center gap-3 overflow-hidden rounded-xl border p-3 text-left transition-colors duration-150 sm:min-w-0",
                      on ? "border-white/15 bg-night-2" : "border-night-3/70 bg-night-2/40 hover:border-night-3 hover:bg-night-2/70",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl text-[12px] font-bold tracking-[-0.01em] text-white transition-opacity",
                        pa.solid,
                        !on && "opacity-70",
                      )}
                    >
                      {proj.initials}
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block truncate text-[14px] font-semibold", on ? "text-white" : "text-white/75")}>
                        {proj.name}
                      </span>
                      <span className="block truncate text-[12px] text-white/45">{proj.category}</span>
                    </span>
                    {on && (
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
                        {playing ? (
                          <span
                            key={`bar-${index}`}
                            className="lp-progress block h-full bg-brand-300"
                            style={{ "--lp-duration": `${DURATION}s` } as React.CSSProperties}
                          />
                        ) : (
                          <span className="block h-full bg-brand-300" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Panel */}
          <div
            id="work-panel"
            role="tabpanel"
            aria-labelledby={`work-tab-${p.id}`}
            className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12"
          >
            <Reveal anim="tilt" delay={0.15} className="relative pb-6 sm:pr-10">
              <BrowserFrame url={p.domain} tone="dark">
                <div className="relative aspect-[16/10] overflow-hidden bg-night-3">
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="lp-shot-enter absolute inset-0 size-full object-cover object-top"
                  />
                </div>
              </BrowserFrame>

              <div
                key={`phone-${p.id}`}
                className="lp-rise absolute -right-1 -bottom-2 hidden w-[22%] sm:block"
                style={{ "--lp-delay": "0.2s" } as React.CSSProperties}
              >
                <PhoneFrame className="border-night-3">
                  <img
                    src={p.shots.mobile.src}
                    alt={p.shots.mobile.alt}
                    width={780}
                    height={1688}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </PhoneFrame>
              </div>

              {/* Page switcher (Segmented, night variant) */}
              <div role="radiogroup" aria-label="Page shown" className="mt-4 inline-flex rounded-lg border border-night-3 bg-night-2 p-0.5">
                {(["home", "detail"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="radio"
                    aria-checked={view === v}
                    onClick={() => {
                      setView(v);
                      setManual(true);
                    }}
                    className={cn(
                      "h-7 rounded-md px-3 text-[13px] font-medium transition-colors duration-150",
                      view === v ? "bg-night-3 text-white shadow-[0_1px_2px_rgb(0_0_0/0.3)]" : "text-white/55 hover:text-white",
                    )}
                  >
                    {v === "home" ? "Home page" : p.shots.detail.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div key={p.id} className="lp-step-in">
              <p className="flex items-center gap-2 text-[12.5px] font-semibold tracking-[0.14em] text-brand-300 uppercase">
                <span className={cn("size-1.5 rounded-full", a.solid)} aria-hidden="true" />
                {p.category}
              </p>
              <h3 className="mt-3 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] text-white">{p.name}</h3>
              <p className="mt-3 text-[15px] leading-[1.625] text-white/65">{p.summary}</p>

              <dl className="mt-6 grid grid-cols-3 divide-x divide-night-3 border-y border-night-3 py-4">
                {p.stats.map((s) => (
                  <div key={s.label} className="px-4 first:pl-0">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-[24px] leading-none font-semibold tracking-[-0.02em] text-white tabular-nums">{s.value}</dd>
                    <dd className="mt-1.5 text-[12px] text-white/50">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <ul className="lp-stagger mt-6 grid gap-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[14px] leading-[1.5] text-white/75">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="What we did">
                {p.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex h-7 items-center rounded-full border border-night-3 bg-night-2 px-2.5 text-[12px] font-medium text-white/70"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "white", size: "lg" })}>
                  {p.linkLabel}
                  <ArrowUpRight />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href="#contact" className={buttonClass({ variant: "ghost-dark", size: "lg" })}>
                  Start a similar project
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
