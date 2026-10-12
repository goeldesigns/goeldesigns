import {
  ArrowRight,
  Braces,
  Clapperboard,
  CodeXml,
  Layers,
  Palette,
  PencilRuler,
  PenLine,
  PenTool,
  Server,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import { services, type ServiceId } from "@/lib/content";
import { accent, cn } from "@/lib/utils";
import { buttonClass } from "../ui/button";
import { Loop, Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { SpotGrid } from "./spot-grid";
import {
  ApiVisual,
  BrandingVisual,
  CollateralVisual,
  ContentVisual,
  DevVisual,
  HostingVisual,
  LogoVisual,
  UiuxVisual,
  VideoVisual,
} from "./visuals/service-visuals";

const meta: Record<ServiceId, { icon: LucideIcon; Visual: ComponentType; span?: string }> = {
  uiux: { icon: PencilRuler, Visual: UiuxVisual, span: "md:col-span-2" },
  logo: { icon: PenTool, Visual: LogoVisual },
  development: { icon: CodeXml, Visual: DevVisual },
  apis: { icon: Braces, Visual: ApiVisual },
  hosting: { icon: Server, Visual: HostingVisual },
  branding: { icon: Palette, Visual: BrandingVisual },
  content: { icon: PenLine, Visual: ContentVisual },
  collateral: { icon: Layers, Visual: CollateralVisual },
  video: { icon: Clapperboard, Visual: VideoVisual, span: "md:col-span-2" },
};

function ServiceCard({ id, index }: { id: ServiceId; index: number }) {
  const s = services.find((x) => x.id === id)!;
  const { icon: I, Visual, span } = meta[id];
  const a = accent[s.accent];
  return (
    <Reveal as="li" anim="up" delay={(index % 3) * 0.08} className={cn("flex", span)}>
      <article className="lp-lift lp-spot group flex w-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card hover:border-line-strong">
        <Loop className="relative h-[200px] overflow-hidden border-b border-line bg-canvas">
          <div aria-hidden="true">
            <Visual />
          </div>
        </Loop>
        <div className="flex gap-3.5 p-5">
          <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-inset", a.soft, a.ring, a.text)}>
            <I className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[15px] leading-[1.45] font-semibold text-ink">{s.title}</h3>
            <p className="mt-1 text-[13px] leading-[1.55] text-muted">{s.body}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-canvas py-24 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Everything a brand needs,"
          accent="under one roof."
          lead="Nine services, one team. Pick the one you need, or let us run the whole project — from the logo to launch day."
        />

        <SpotGrid className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard id="uiux" index={0} />
          <ServiceCard id="logo" index={1} />
          <ServiceCard id="development" index={0} />
          <ServiceCard id="apis" index={1} />
          <ServiceCard id="hosting" index={2} />
          <ServiceCard id="branding" index={0} />
          <ServiceCard id="content" index={1} />
          <ServiceCard id="collateral" index={2} />

          {/* Not sure? */}
          <Reveal as="li" anim="up" className="flex">
            <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-card bg-brand-500 p-6 text-white shadow-button">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full border-[28px] border-white/[0.07]"
              />
              <div className="relative">
                <p className="text-[12.5px] font-semibold tracking-[0.14em] text-brand-200 uppercase">Not sure where to start?</p>
                <p className="mt-3 text-[24px] leading-[1.15] font-semibold tracking-[-0.02em]">
                  Tell us the problem.{" "}
                  <span className="font-display font-normal tracking-[-0.01em] text-brand-200 italic">We’ll suggest the fix.</span>
                </p>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/75">
                  We’ll recommend the smallest thing that solves it — and tell you if you don’t need us at all.
                </p>
              </div>
              <a href="#contact" className={buttonClass({ variant: "white", size: "lg", className: "relative mt-8 self-start" })}>
                Talk it through
                <ArrowRight />
              </a>
            </div>
          </Reveal>

          <ServiceCard id="video" index={1} />
        </SpotGrid>
      </div>
    </section>
  );
}
