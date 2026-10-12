"use client";

import { ArrowRight, Check, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { hero, site } from "@/lib/content";
import { buttonClass } from "../ui/button";
import { StudioCanvas } from "./studio-canvas";

export function Hero() {
  const [word, setWord] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % hero.madeFor.length), 2400);
    return () => clearInterval(t);
  }, []);

  const prevWord = (word - 1 + hero.madeFor.length) % hero.madeFor.length;

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Faint design-canvas dots behind the visual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full bg-dots [mask-image:radial-gradient(60%_55%_at_75%_40%,#000,transparent)] lg:w-2/3"
      />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        {/* Copy */}
        <div className="max-w-[560px]">
          <p className="lp-rise inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3.5 pl-1 text-[13px] text-ink-2 shadow-card">
            <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-semibold text-white">{hero.pill.tag}</span>
            <span className="min-w-0 truncate">{hero.pill.text}</span>
          </p>

          <h1
            className="lp-rise mt-6 text-[40px] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[52px] lg:text-[58px]"
            style={{ "--lp-delay": "0.08s" } as React.CSSProperties}
          >
            {hero.title}
            <span className="block font-display font-normal tracking-[-0.01em] text-brand-500 italic">{hero.accent}</span>
          </h1>

          <p className="lp-rise mt-6 text-[17px] text-ink-2" style={{ "--lp-delay": "0.16s" } as React.CSSProperties}>
            <span className="sr-only">Made for {hero.madeFor.join(", ")}.</span>
            <span aria-hidden="true">
              Made for{" "}
              <span className="relative inline-grid overflow-hidden align-bottom font-semibold text-ink">
                {hero.madeFor.map((w, i) => (
                  <span
                    key={w}
                    className="lp-word col-start-1 row-start-1 whitespace-nowrap"
                    style={{
                      transform: i === word ? "translateY(0)" : i === prevWord ? "translateY(-110%)" : "translateY(110%)",
                      opacity: i === word ? 1 : 0,
                    }}
                  >
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </p>

          <p className="lp-rise mt-4 text-[16px] leading-[1.625] text-muted" style={{ "--lp-delay": "0.22s" } as React.CSSProperties}>
            {hero.lead}
          </p>

          <div className="lp-rise mt-8 flex flex-wrap items-center gap-3" style={{ "--lp-delay": "0.3s" } as React.CSSProperties}>
            <a href="#contact" className={buttonClass({ variant: "primary", size: "lg", className: "lp-sheen" })}>
              Start a project
              <ArrowRight />
            </a>
            <a href="#work" className={buttonClass({ variant: "outline", size: "lg" })}>
              See our work
            </a>
          </div>

          <p
            className="lp-rise mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted"
            style={{ "--lp-delay": "0.36s" } as React.CSSProperties}
          >
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-brand-600">
              <Mail className="size-4 text-brand-500" aria-hidden="true" />
              {site.email}
            </a>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
            <span>
              Prefer to talk?{" "}
              <a href={site.phone.href} className="font-medium text-brand-500 hover:text-brand-600">
                Call {site.phone.display}
              </a>
            </span>
          </p>

          <ul className="lp-rise mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2" style={{ "--lp-delay": "0.42s" } as React.CSSProperties}>
            {hero.checks.map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-[14px] text-ink-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#e3f6ee] text-[#167a50]">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: the studio canvas — each project from wireframe to design to live */}
        <StudioCanvas />
      </div>
    </section>
  );
}
