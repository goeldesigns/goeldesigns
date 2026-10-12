"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions clients" accent="usually ask." />

        <Reveal anim="up" delay={0.1} className="mx-auto mt-12 max-w-[760px]">
          <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-card">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={on}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(on ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-ink transition-colors hover:bg-canvas"
                    >
                      {f.q}
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full transition-[background-color,color,rotate] duration-300",
                          on ? "rotate-45 bg-brand-500 text-white" : "bg-sunken text-muted",
                        )}
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="lp-collapse"
                    data-open={on ? "" : undefined}
                  >
                    <div>
                      <p className="px-5 pb-5 text-[14px] leading-[1.65] text-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center text-[14px] text-muted">
            Something else?{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-brand-500 hover:text-brand-600">
              Email {site.email}
            </a>{" "}
            or{" "}
            <a href={site.phone.href} className="font-medium text-brand-500 hover:text-brand-600">
              call {site.phone.display}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
