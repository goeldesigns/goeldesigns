import { about } from "@/lib/content";
import { accent, cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-night py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="lp-drift pointer-events-none absolute -right-40 -bottom-56 size-[680px] rounded-full bg-[radial-gradient(closest-side,rgb(80_64_208/0.4),transparent)] blur-2xl"
      />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading
            tone="night"
            align="left"
            eyebrow="About us"
            title="We are Goel Designs,"
            accent="a studio that ships."
            lead={about.lead}
          />

          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.title} anim="up" delay={0.1 + i * 0.08}>
                <span className="grid size-10 place-items-center rounded-xl border border-night-3 bg-night-2 text-brand-300">
                  <Icon name={v.icon} className="size-5" />
                </span>
                <h3 className="mt-3.5 text-[15px] font-semibold text-white">{v.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-white/55">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Team panel, styled like Tabla's live attendance card */}
        <Reveal anim="right" delay={0.15}>
          <div className="rounded-card border border-night-3 bg-night-2 p-3 shadow-[0_40px_80px_-32px_rgb(0_0_0/0.6)]">
            <div className="flex items-center justify-between px-2 pt-1.5 pb-3">
              <p className="flex items-center gap-2 text-2xs font-semibold tracking-[0.08em] text-white/55 uppercase">
                <span className="relative flex size-2">
                  <span className="lp-ping absolute inset-0 rounded-full bg-success" />
                  <span className="relative size-2 rounded-full bg-success" />
                </span>
                The team
              </p>
              <p className="text-[12px] text-white/45">
                <span className="font-semibold text-white tabular-nums">15+</span> people · 5 disciplines
              </p>
            </div>
            <ul className="grid gap-1.5">
              {about.team.map((t, i) => {
                const a = accent[t.accent];
                return (
                  <Reveal as="li" key={t.role} anim="left" delay={0.25 + i * 0.07}>
                    <div className="flex items-center gap-3 rounded-xl border border-night-3/60 bg-night/60 p-2.5 transition-colors hover:border-night-3 hover:bg-night">
                      <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", a.soft, a.text)}>
                        <Icon name={t.icon} className="size-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-semibold text-white">{t.role}</span>
                        <span className="block truncate text-[12px] text-white/50">{t.detail}</span>
                      </span>
                      <span className="rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-medium text-[#5fd3a0] ring-1 ring-success/25 ring-inset">
                        In-house
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
            <p className="mt-3 rounded-xl border border-dashed border-night-3 px-3 py-2.5 text-[12.5px] leading-[1.55] text-white/55">
              One project manager is your single point of contact — design, code and launch all report back through them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
