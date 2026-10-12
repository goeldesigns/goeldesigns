import { capabilities } from "@/lib/content";
import { accent, cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Reveal } from "./reveal";

type Chip = (typeof capabilities.rowA)[number] | (typeof capabilities.rowB)[number];

function Row({ items, reverse, speed }: { items: readonly Chip[]; reverse?: boolean; speed: string }) {
  // Two copies side by side; the track moves -50% and loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="lp-marquee-mask overflow-hidden">
      <ul
        className="lp-marquee flex gap-3 py-1.5 pr-3"
        data-reverse={reverse ? "" : undefined}
        style={{ "--lp-speed": speed } as React.CSSProperties}
      >
        {loop.map((c, i) => (
          <li
            key={`${c.label}-${i}`}
            aria-hidden={i >= items.length}
            className="flex h-9 shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-[13px] font-medium text-ink-2 shadow-card"
          >
            <Icon name={c.icon} className={cn("size-4", accent[c.accent].fg)} />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="What we make" className="border-y border-line bg-canvas py-8">
      <Reveal as="p" anim="fade" className="mb-5 px-4 text-center text-[12.5px] font-semibold tracking-[0.14em] text-muted uppercase">
        Everything your brand needs, under one roof
      </Reveal>
      <div className="grid gap-2.5">
        <Row items={capabilities.rowA} speed="52s" />
        <Row items={capabilities.rowB} speed="60s" reverse />
      </div>
    </section>
  );
}
