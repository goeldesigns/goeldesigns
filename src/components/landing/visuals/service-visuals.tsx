import { Braces, Check, Globe, Image as ImageIcon, MousePointer2, Play, ShieldCheck, ShoppingBag, Store } from "lucide-react";
import type { CSSProperties } from "react";
import { LogoMark } from "../logo";

const d = (s: number) => ({ "--lp-delay": `${s}s` }) as CSSProperties;

/* ── UI/UX: a design canvas. The cursor selects the button and presses it. ── */
export function UiuxVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 bg-dots px-6">
      {/* Layers */}
      <div className="hidden w-[132px] shrink-0 rounded-xl border border-line bg-surface p-2 shadow-card sm:block">
        <p className="px-1.5 pb-1.5 text-[10px] font-semibold tracking-[0.08em] text-subtle uppercase">Layers</p>
        {["Header", "Hero image", "Title", "Button", "Tab bar"].map((l) => (
          <div
            key={l}
            className={
              l === "Button"
                ? "flex h-6 items-center gap-1.5 rounded-md bg-brand-50 px-1.5 text-[11px] font-medium text-brand-700"
                : "flex h-6 items-center gap-1.5 px-1.5 text-[11px] text-ink-2"
            }
          >
            <span className={l === "Button" ? "size-2 rounded-[3px] bg-brand-500" : "size-2 rounded-[3px] border border-line-strong"} />
            {l}
          </div>
        ))}
      </div>

      {/* Artboard */}
      <div className="relative shrink-0">
        <p className="mb-1.5 text-[10px] font-medium text-muted">Home — Mobile</p>
        <div className="w-[170px] rounded-xl border border-line bg-surface p-2.5 shadow-raised">
          <div className="flex items-center justify-between">
            <span className="h-2 w-10 rounded-full bg-ink/80" />
            <span className="size-3.5 rounded-full bg-sunken" />
          </div>
          <div className="mt-2 grid h-[34px] place-items-center rounded-lg bg-brand-50 text-brand-300">
            <ImageIcon className="size-5" aria-hidden="true" />
          </div>
          <span className="mt-2 block h-2 w-[80%] rounded-full bg-ink/70" />
          <span className="mt-1.5 block h-1.5 w-[60%] rounded-full bg-line-strong" />
          <div className="relative mt-2.5">
            <span className="lp-press grid h-7 w-full place-items-center rounded-lg text-[10.5px] font-semibold">Order now</span>
            {/* Selection */}
            <span className="lp-select pointer-events-none absolute -inset-1 rounded-[9px] border-[1.5px] border-brand-400">
              {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-right-[3px] -bottom-[3px]"].map(
                (pos) => (
                  <span key={pos} className={`absolute size-[5px] border border-brand-400 bg-surface ${pos}`} />
                ),
              )}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-brand-500 px-1.5 py-0.5 font-mono text-[9.5px] whitespace-nowrap text-white">
                148 × 28
              </span>
            </span>
          </div>
        </div>
        {/* Cursor: starts bottom-right of the artboard, travels to the button */}
        <MousePointer2
          aria-hidden="true"
          className="lp-cursor absolute top-[138px] left-[178px] size-5 fill-ink text-white drop-shadow"
          style={{ "--lp-cx": "-80px", "--lp-cy": "6px" } as CSSProperties}
        />
      </div>

      {/* Properties */}
      <div className="hidden w-[140px] shrink-0 rounded-xl border border-line bg-surface p-2.5 shadow-card md:block">
        <p className="pb-2 text-[10px] font-semibold tracking-[0.08em] text-subtle uppercase">Button</p>
        <dl className="grid gap-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <dt className="text-muted">Fill</dt>
            <dd className="flex items-center gap-1 font-mono text-[10px] text-ink-2">
              <span className="size-2.5 rounded-[3px] bg-brand-500" />
              5040D0
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Radius</dt>
            <dd className="font-mono text-[10px] text-ink-2">8</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Height</dt>
            <dd className="font-mono text-[10px] text-ink-2">44</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted">Shadow</dt>
            <dd className="text-[10px] text-ink-2">button</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ── Logo: construction circles, the mark draws itself, then the size test ── */
export function LogoVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6">
      <svg viewBox="0 0 160 160" className="h-[150px] w-[150px]" aria-hidden="true">
        <g className="lp-spin" style={{ transformOrigin: "80px 80px", transformBox: "view-box" }}>
          <circle cx="80" cy="80" r="62" fill="none" stroke="var(--color-line-strong)" strokeDasharray="3 5" />
          <circle cx="80" cy="80" r="38" fill="none" stroke="var(--color-line-strong)" strokeDasharray="3 5" />
        </g>
        <line x1="10" y1="80" x2="150" y2="80" stroke="var(--color-line)" />
        <line x1="80" y1="10" x2="80" y2="150" stroke="var(--color-line)" />
        <path
          d="M112.2 47.8A46 46 0 1 0 126 80H86"
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lp-draw"
          style={{ "--lp-len": 330 } as CSSProperties}
        />
        <circle cx="112.2" cy="47.8" r="9" fill="var(--color-brand-500)" />
        <circle cx="112.2" cy="47.8" r="13" fill="none" stroke="var(--color-brand-400)" strokeWidth="1.5" />
      </svg>
      <div className="hidden flex-col items-center gap-3 sm:flex">
        <p className="text-[10px] font-semibold tracking-[0.08em] text-subtle uppercase">Size test</p>
        <div className="flex items-end gap-2.5">
          <LogoMark className="h-10 w-auto" />
          <LogoMark className="h-7 w-auto" />
          <LogoMark className="h-5 w-auto" />
        </div>
        <p className="font-mono text-[10px] text-muted">40 · 28 · 20 px</p>
      </div>
    </div>
  );
}

/* ── Development: build log in a terminal ── */
export function DevVisual() {
  const lines: { t: string; c: string; delay: number }[] = [
    { t: "$ npm run build", c: "text-white/85", delay: 0 },
    { t: "✓ Compiled successfully", c: "text-mint", delay: 0.6 },
    { t: "✓ 24 pages generated", c: "text-mint", delay: 1.1 },
    { t: "→ Deploying to production…", c: "text-white/55", delay: 1.7 },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center px-5">
      <div className="w-full max-w-[300px] overflow-hidden rounded-xl border border-night-3 bg-night shadow-raised">
        <div className="flex h-7 items-center gap-1.5 border-b border-night-3 px-3">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-white/40">~/velvet-brew</span>
        </div>
        <div className="grid gap-1 p-3 font-mono text-[11px] leading-[1.5]">
          {lines.map((l) => (
            <span key={l.t} className={`lp-line-in ${l.c}`} style={d(l.delay)}>
              {l.t}
            </span>
          ))}
          <span className="lp-line-in mt-1 flex items-center gap-1.5 text-white" style={d(2.4)}>
            <span className="relative flex size-2">
              <span className="lp-ping absolute inset-0 rounded-full bg-success" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            Live · velvetbrew.in
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── APIs: requests flowing between systems ── */
export function ApiVisual() {
  const Node = ({ icon: I, label, strong }: { icon: typeof Globe; label: string; strong?: boolean }) => (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className={
          strong
            ? "grid size-11 place-items-center rounded-xl bg-brand-500 text-white shadow-button"
            : "grid size-11 place-items-center rounded-xl border border-line bg-surface text-ink-2 shadow-card"
        }
      >
        <I className="size-5" aria-hidden="true" />
      </span>
      <span className="text-[10.5px] font-medium text-muted">{label}</span>
    </div>
  );
  const Wire = ({ delay }: { delay: number }) => (
    <div className="relative mb-5 h-px flex-1 border-t border-dashed border-line-strong">
      <span className="lp-flow absolute -top-[3.5px] size-1.5 rounded-full bg-brand-500" style={d(delay)} />
      <span className="lp-flow absolute -top-[3.5px] size-1.5 rounded-full bg-saffron" style={d(delay + 1.2)} />
    </div>
  );
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6">
      <div className="flex items-center gap-2">
        <Node icon={ShoppingBag} label="Website" />
        <Wire delay={0} />
        <Node icon={Braces} label="Your API" strong />
        <Wire delay={0.6} />
        <Node icon={Store} label="Kitchen" />
      </div>
      <div className="mx-auto flex w-full max-w-[270px] items-center justify-between rounded-lg border border-line bg-surface px-2.5 py-2 shadow-card">
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-2">
          <span className="rounded-[4px] bg-brand-100 px-1 py-px text-[9.5px] font-semibold text-brand-700">POST</span>
          /v1/orders
        </span>
        <span className="lp-blink rounded-full bg-success-50 px-1.5 py-px text-[10px] font-medium text-success-700 ring-1 ring-success-100 ring-inset">
          201 Created
        </span>
      </div>
    </div>
  );
}

/* ── Hosting: status card with request bars ── */
export function HostingVisual() {
  const bars = [38, 52, 44, 60, 72, 58, 66, 80, 70, 88, 76, 92, 84, 70, 64, 78];
  return (
    <div className="absolute inset-0 grid place-items-center px-5">
      <div className="w-full max-w-[290px] rounded-xl border border-line bg-surface p-3 shadow-card">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
            <Globe className="size-3.5 text-muted" aria-hidden="true" />
            goeldesigns.com
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-success-50 px-2 py-0.5 text-[10.5px] font-medium text-success-700 ring-1 ring-success-100 ring-inset">
            <span className="relative flex size-1.5">
              <span className="lp-ping absolute inset-0 rounded-full bg-success" />
              <span className="relative size-1.5 rounded-full bg-success" />
            </span>
            Online
          </span>
        </div>
        <div className="mt-2.5 flex gap-3 text-[10.5px] text-muted">
          <span className="flex items-center gap-1">
            <ShieldCheck className="size-3 text-mint" aria-hidden="true" />
            SSL active
          </span>
          <span className="flex items-center gap-1">
            <Check className="size-3 text-mint" aria-hidden="true" />
            Domain connected
          </span>
        </div>
        <div className="mt-3 flex h-[56px] items-end gap-[3px]">
          {bars.map((h, i) => (
            <span key={i} className="lp-bar flex-1 rounded-t-[2px] bg-mint/80" style={{ height: `${h}%`, ...d(i * 0.04) }} />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-subtle">Requests · last 24 hours</p>
      </div>
    </div>
  );
}

/* ── Branding: palette pops in, then the type pair ── */
export function BrandingVisual() {
  const swatches = [
    { c: "bg-brand-500", hex: "5040D0" },
    { c: "bg-saffron", hex: "EB6834" },
    { c: "bg-mint", hex: "1BAF7A" },
    { c: "bg-night", hex: "16152A" },
    { c: "bg-canvas border border-line", hex: "F7F7FA" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5">
      <div className="flex gap-2">
        {swatches.map((s, i) => (
          <div key={s.hex} className="lp-swatch flex flex-col items-center gap-1" style={d(i * 0.12)}>
            <span className={`size-10 rounded-xl shadow-card ${s.c}`} />
            <span className="font-mono text-[9px] text-muted">{s.hex}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-5">
        <div className="text-center">
          <span className="block text-[34px] leading-none font-semibold tracking-[-0.03em] text-ink">Aa</span>
          <span className="mt-1 block text-[10px] text-muted">Inter</span>
        </div>
        <div className="text-center">
          <span className="block font-display text-[38px] leading-none text-brand-500 italic">Aa</span>
          <span className="mt-1 block text-[10px] text-muted">Instrument Serif</span>
        </div>
      </div>
    </div>
  );
}

/* ── Content: a headline being written, in the house voice ── */
export function ContentVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center px-5">
      <div className="w-full max-w-[290px] rounded-xl border border-line bg-surface p-3.5 shadow-card">
        <div className="flex items-center gap-1 border-b border-line pb-2 text-[11px] text-subtle">
          <span className="grid size-5 place-items-center rounded font-bold text-ink-2">B</span>
          <span className="grid size-5 place-items-center rounded italic">I</span>
          <span className="grid size-5 place-items-center rounded underline">U</span>
          <span className="ml-auto text-[10px]">Headline · 6 words</span>
        </div>
        <p className="mt-2.5 flex items-center text-[14px] font-semibold tracking-[-0.01em] text-ink">
          <span
            className="lp-type inline-block overflow-hidden whitespace-nowrap"
            style={{ "--lp-w": "240px", "--lp-steps": 31, "--lp-duration": "6s" } as CSSProperties}
          >
            Fresh coffee, ready in 8 min.
          </span>
          <span className="lp-caret ml-px inline-block h-4 w-[1.5px] bg-brand-500" />
        </p>
        <span className="mt-2 block h-1.5 w-[92%] rounded-full bg-sunken" />
        <span className="mt-1.5 block h-1.5 w-[78%] rounded-full bg-sunken" />
        <span className="mt-1.5 block h-1.5 w-[64%] rounded-full bg-sunken" />
        <div className="mt-3 flex gap-1.5">
          {["Plain", "Short", "Specific"].map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#fdf3dc] px-2 py-0.5 text-[10px] font-medium text-[#94620a] ring-1 ring-[#f8e5b5] ring-inset"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Collateral: business card, menu and flyer fan out on hover ── */
export function CollateralVisual() {
  return (
    <div className="lp-fan absolute inset-0 flex items-center justify-center">
      <div className="absolute h-[124px] w-[92px] -translate-x-[70px] -rotate-[10deg] rounded-lg border border-line bg-[#fdf3dc] p-2 shadow-raised group-hover:-translate-x-[92px] group-hover:-rotate-[14deg]">
        <p className="text-center font-display text-[13px] text-[#94620a] italic">Menu</p>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mt-1.5 flex items-center justify-between">
            <span className="h-1 w-9 rounded-full bg-[#94620a]/35" />
            <span className="h-1 w-3 rounded-full bg-[#94620a]/55" />
          </div>
        ))}
      </div>
      <div className="absolute h-[124px] w-[92px] translate-x-[70px] rotate-[10deg] rounded-lg bg-brand-500 p-2.5 shadow-raised group-hover:translate-x-[92px] group-hover:rotate-[14deg]">
        <span className="block h-1.5 w-8 rounded-full bg-white/50" />
        <p className="mt-3 text-[13px] leading-[1.1] font-semibold text-white">Grand opening</p>
        <p className="font-display text-[13px] text-brand-200 italic">this Friday</p>
        <span className="mt-3 block h-4 w-12 rounded bg-white" />
      </div>
      <div className="relative w-[158px] rounded-lg border border-line bg-surface p-3 shadow-pop transition-transform group-hover:-translate-y-1.5">
        <LogoMark className="h-6 w-auto" />
        <p className="mt-3 text-[11px] font-semibold text-ink">Goel Designs</p>
        <p className="text-[9.5px] text-muted">Design & development studio</p>
        <span className="mt-2 block h-1 w-16 rounded-full bg-line-strong" />
        <span className="mt-1 block h-1 w-12 rounded-full bg-line" />
      </div>
    </div>
  );
}

/* ── Video: preview + timeline with a moving playhead ── */
export function VideoVisual() {
  const wave = [30, 55, 40, 70, 50, 85, 60, 45, 75, 52, 66, 38, 58, 80, 48, 62, 36, 70, 54, 42, 64, 50, 76, 44];
  return (
    <div className="absolute inset-0 flex items-center gap-5 px-5 sm:px-6">
      <div className="relative hidden aspect-video w-[200px] shrink-0 overflow-hidden rounded-xl bg-night shadow-raised sm:block">
        <img
          src="/work/velvetbrew-menu.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-[9.5px] font-semibold text-white">
          <span className="lp-blink size-1.5 rounded-full bg-danger" />
          REC
        </span>
        <span className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 py-0.5 font-mono text-[9.5px] text-white/85">00:12:04</span>
        <span className="absolute inset-0 m-auto grid size-9 place-items-center rounded-full bg-white/90 text-ink">
          <Play className="size-4 fill-current" aria-hidden="true" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between pb-1.5 font-mono text-[9.5px] text-subtle">
          <span>00:00</span>
          <span>00:15</span>
          <span>00:30</span>
        </div>
        <div className="relative grid gap-1.5 rounded-lg border border-line bg-surface p-2 shadow-card">
          <div className="flex h-6 gap-1">
            <span className="w-[28%] rounded-[4px] bg-blush/80" />
            <span className="w-[40%] rounded-[4px] bg-brand-400" />
            <span className="flex-1 rounded-[4px] bg-ocean/70" />
          </div>
          <div className="flex h-4 gap-1 pl-[18%]">
            <span className="w-[22%] rounded-[4px] bg-turmeric/80" />
            <span className="ml-[20%] w-[18%] rounded-[4px] bg-turmeric/60" />
          </div>
          <div className="flex h-6 items-center gap-[2px] rounded-[4px] bg-[#e3f6ee] px-1">
            {wave.map((h, i) => (
              <span key={i} className="flex-1 rounded-full bg-mint" style={{ height: `${h}%` }} />
            ))}
          </div>
          <span className="lp-playhead pointer-events-none absolute top-0 bottom-0 w-px bg-danger">
            <span className="absolute -top-1 -left-[3.5px] size-2 rotate-45 rounded-[1px] bg-danger" />
          </span>
        </div>
        <div className="mt-2 flex gap-3 text-[10px] text-muted">
          <span>V1 · Reel cut</span>
          <span>V2 · Titles</span>
          <span>A1 · Voice-over</span>
        </div>
      </div>
    </div>
  );
}
