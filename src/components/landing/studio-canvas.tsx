"use client";

import { Check, Frame, Globe, Hand, MessageCircle, MousePointer2, Palette, PenTool, Type, type LucideIcon } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { projects } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo";

/* Each project moves through the studio's process: wireframe → design → live. */
const stages: { id: "wireframe" | "design" | "live"; label: string; icon: LucideIcon; ms: number }[] = [
  { id: "wireframe", label: "Wireframe", icon: Frame, ms: 2600 },
  { id: "design", label: "Design", icon: Palette, ms: 3400 },
  { id: "live", label: "Live", icon: Globe, ms: 3400 },
];

// Cursor positions (% of the canvas) and what each collaborator says, per stage
// (the developer's live-stage line is filled in with the project name)
const designer = [
  { x: 52, y: 40, chat: "Layout first" },
  { x: 14, y: 51, chat: "Approved — looks great" },
  { x: 86, y: 58, chat: "Ship it" },
];
const developer = [
  { x: 40, y: 84, chat: "" },
  { x: 84, y: 46, chat: "Building mobile" },
  { x: 25, y: 23, chat: "" },
];

const tools: { icon: LucideIcon; label: string }[] = [
  { icon: MousePointer2, label: "Move" },
  { icon: Frame, label: "Frame" },
  { icon: PenTool, label: "Pen" },
  { icon: Type, label: "Text" },
  { icon: MessageCircle, label: "Comment" },
  { icon: Hand, label: "Hand" },
];
const activeTool = [1, 2, 0]; // Frame while wireframing, Pen while designing, Move once live

export function StudioCanvas() {
  const reduced = usePrefersReducedMotion();
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resumes, setResumes] = useState(0);

  // Reduced motion: no auto-play, show the finished design
  useEffect(() => {
    if (reduced) setS(1);
  }, [reduced]);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setTimeout(() => {
      if (s < stages.length - 1) setS(s + 1);
      else {
        setS(0);
        setP((x) => (x + 1) % projects.length);
      }
    }, stages[s].ms);
    return () => clearTimeout(t);
  }, [s, p, paused, reduced, resumes]);

  const project = projects[p];
  const stage = stages[s].id;
  const live = stage === "live";
  const shown = stage !== "wireframe";

  return (
    <div
      className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setResumes((r) => r + 1);
      }}
    >
      <div className="lp-frame-in overflow-hidden rounded-[16px] border border-line bg-surface shadow-frame">
        {/* Tool bar */}
        <div className="flex h-11 items-center gap-2.5 border-b border-line px-3">
          <LogoMark className="h-6 w-auto" />
          <p className="hidden min-w-0 truncate text-[12.5px] font-medium text-ink sm:block">{project.name}</p>

          <div
            role="radiogroup"
            aria-label="Project stage"
            className="mx-auto flex shrink-0 rounded-lg border border-line bg-sunken p-0.5 sm:mx-0 sm:ml-auto"
          >
            {stages.map((st, i) => {
              const on = i === s;
              return (
                <button
                  key={st.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setS(i)}
                  className={cn(
                    "relative flex h-7 items-center gap-1.5 overflow-hidden rounded-md px-2.5 text-[12px] font-medium transition-[background-color,color,box-shadow] duration-150",
                    on
                      ? "bg-surface text-ink shadow-[0_1px_2px_rgb(20_18_48/0.08),0_0_0_1px_var(--color-line)]"
                      : "text-muted hover:text-ink",
                  )}
                >
                  <st.icon
                    className={cn("size-3.5 max-sm:hidden", on && (st.id === "live" ? "text-success" : "text-brand-500"))}
                    aria-hidden="true"
                  />
                  {st.label}
                  {on && !reduced && (
                    <span
                      key={`${p}-${s}-${resumes}`}
                      aria-hidden="true"
                      data-paused={paused ? "" : undefined}
                      className="lp-progress absolute inset-x-1.5 bottom-0 h-0.5 rounded-full bg-brand-500/50"
                      style={{ "--lp-duration": `${st.ms}ms` } as CSSProperties}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="hidden -space-x-0.5 md:flex">
              <span className="grid size-6 place-items-center rounded-full bg-brand-100 text-[9.5px] font-semibold text-brand-700 ring-2 ring-surface">
                UX
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-[#e3f6ee] text-[9.5px] font-semibold text-[#167a50] ring-2 ring-surface">
                FE
              </span>
            </span>
            {live ? (
              <span
                key={`pub-${p}`}
                className="lp-pop flex h-7 items-center gap-1 rounded-lg bg-success-50 px-2.5 text-[12px] font-semibold text-success-700 ring-1 ring-success-100 ring-inset"
              >
                <Check className="size-3.5" strokeWidth={3} />
                Live
              </span>
            ) : (
              <span className="flex h-7 items-center rounded-lg bg-brand-500 px-2.5 text-[12px] font-semibold text-white shadow-button">
                Publish
              </span>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative aspect-[600/380] overflow-hidden bg-canvas bg-dots">
          {/* Desktop artboard */}
          <div className="absolute" style={{ left: "5%", top: "13%", width: "64%" }}>
            <p
              className="absolute -top-5 left-0 flex items-center gap-1 text-[10.5px] font-medium whitespace-nowrap text-muted"
              aria-hidden="true"
            >
              <Frame className="size-3" />
              Home — Desktop
            </p>
            <div
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-md bg-surface shadow-raised ring-1 transition-shadow duration-500",
                live ? "ring-success/50" : "ring-line",
              )}
            >
              <WireDesktop />
              {projects.map((pr, i) => (
                <img
                  key={pr.id}
                  src={pr.shots.desktop.src}
                  alt={i === p && shown ? pr.shots.desktop.alt : ""}
                  aria-hidden={!(i === p && shown)}
                  width={1440}
                  height={900}
                  fetchPriority={i === 0 ? "high" : "low"}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-top transition-[clip-path,opacity] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                  style={{ clipPath: i === p && shown ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", opacity: i === p ? 1 : 0 }}
                />
              ))}
              {live && (
                <span
                  key={`live-${p}`}
                  aria-hidden="true"
                  className="lp-pop absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-success-50 px-2 py-0.5 text-[10.5px] font-medium text-success-700 shadow-card ring-1 ring-success-100 ring-inset"
                >
                  <span className="relative flex size-1.5">
                    <span className="lp-ping absolute inset-0 rounded-full bg-success" />
                    <span className="relative size-1.5 rounded-full bg-success" />
                  </span>
                  Live · {project.domain}
                </span>
              )}
            </div>
            {/* Selection while designing */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-[3px] rounded-[8px] border-[1.5px] border-brand-400 transition-opacity duration-300",
                stage === "design" ? "opacity-100" : "opacity-0",
              )}
            >
              {["-top-[4px] -left-[4px]", "-top-[4px] -right-[4px]", "-bottom-[4px] -left-[4px]", "-right-[4px] -bottom-[4px]"].map(
                (pos) => (
                  <span key={pos} className={`absolute size-[7px] border-[1.5px] border-brand-400 bg-surface ${pos}`} />
                ),
              )}
              <span className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 rounded-md bg-brand-500 px-1.5 py-0.5 font-mono text-[9.5px] whitespace-nowrap text-white">
                1440 × 900
              </span>
            </div>
          </div>

          {/* Mobile artboard */}
          <div className="absolute" style={{ left: "75%", top: "13%", width: "19%" }} aria-hidden="true">
            <p className="absolute -top-5 left-0 flex items-center gap-1 text-[10.5px] font-medium whitespace-nowrap text-muted">
              <Frame className="size-3" />
              Mobile
            </p>
            <div
              className={cn(
                "relative aspect-[390/844] overflow-hidden rounded-md bg-surface shadow-raised ring-1 transition-shadow duration-500",
                live ? "ring-success/50" : "ring-line",
              )}
            >
              <WireMobile />
              {projects.map((pr, i) => (
                <img
                  key={pr.id}
                  src={pr.shots.mobile.src}
                  alt=""
                  width={780}
                  height={1688}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-top transition-[clip-path,opacity] delay-150 duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                  style={{ clipPath: i === p && shown ? "inset(0 0 0 0)" : "inset(0 0 100% 0)", opacity: i === p ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          {/* Styles: the client's palette and type, once the design is in */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute bottom-[4%] left-[3%] hidden items-center gap-2 rounded-xl border border-line bg-surface py-1.5 pr-2.5 pl-2 shadow-raised transition-[opacity,translate] duration-500 sm:flex",
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <span className="text-[10px] font-semibold tracking-[0.08em] text-subtle uppercase">Styles</span>
            <span className="flex -space-x-1">
              {project.palette.map((c) => (
                <span
                  key={c}
                  className="size-4 rounded-full ring-2 ring-surface"
                  style={{ background: c, boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.08)" }}
                />
              ))}
            </span>
            <span className="text-[11px] font-medium whitespace-nowrap text-ink-2">{project.fonts}</span>
          </div>

          {/* Tools */}
          <div
            aria-hidden="true"
            className="absolute right-[3%] bottom-[4%] hidden items-center gap-0.5 rounded-xl border border-line bg-surface p-1 shadow-raised sm:flex"
          >
            {tools.map((t, i) => (
              <span
                key={t.label}
                className={cn(
                  "grid size-7 place-items-center rounded-lg transition-colors duration-300",
                  i === activeTool[s] ? "bg-brand-500 text-white" : "text-muted",
                )}
              >
                <t.icon className="size-3.5" />
              </span>
            ))}
          </div>

          {/* Collaborators */}
          <Cursor tone="designer" label="Designer" {...designer[s]} flip={designer[s].x > 60} />
          <Cursor
            tone="developer"
            label="Developer"
            {...developer[s]}
            chat={s === 2 ? `${project.short} is live` : developer[s].chat}
            flip={developer[s].x > 60}
          />
        </div>
      </div>

      {/* Project switcher */}
      <div
        className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:justify-end"
        role="group"
        aria-label="Projects shown on the canvas"
      >
        <span className="mr-1 text-[12.5px] text-muted max-sm:hidden">Now on the canvas:</span>
        {projects.map((pr, i) => (
          <button
            key={pr.id}
            type="button"
            onClick={() => {
              setP(i);
              setS(1);
            }}
            aria-pressed={i === p}
            className={cn(
              "h-8 rounded-lg px-3 text-[13px] font-medium transition-colors",
              i === p ? "bg-brand-100 text-brand-600" : "text-muted hover:bg-sunken hover:text-ink",
            )}
          >
            {pr.short}
          </button>
        ))}
      </div>
    </div>
  );
}

function Cursor({
  x,
  y,
  label,
  tone,
  chat,
  flip,
}: {
  x: number;
  y: number;
  label: string;
  tone: "designer" | "developer";
  chat?: string;
  flip?: boolean;
}) {
  const designerTone = tone === "designer";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-20 transition-[left,top] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <MousePointer2
        className={cn(
          "size-[18px] drop-shadow-[0_1px_1px_rgb(0_0_0/0.2)]",
          designerTone ? "fill-brand-500 text-brand-500" : "fill-[#167a50] text-[#167a50]",
        )}
        strokeWidth={1.5}
      />
      <div className={cn("absolute top-4 flex flex-col gap-1", flip ? "right-3 items-end" : "left-3 items-start")}>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10.5px] font-semibold whitespace-nowrap text-white",
            designerTone ? "bg-brand-500" : "bg-[#167a50]",
          )}
        >
          {label}
        </span>
        {chat && (
          <span
            key={chat}
            className={cn(
              "lp-pop rounded-xl bg-surface px-2 py-1 text-[11px] font-medium whitespace-nowrap text-ink shadow-pop ring-1 ring-line max-sm:hidden",
              flip ? "origin-top-right rounded-tr-sm" : "origin-top-left rounded-tl-sm",
            )}
          >
            {chat}
          </span>
        )}
      </div>
    </div>
  );
}

/* Wireframes: neutral blocks, an X'd image box, the way every project starts */
function XBox({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn("absolute overflow-hidden rounded-[3px] border-[1.5px] border-dashed border-brand-300 bg-brand-50/60", className)}
      style={style}
    >
      <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        <line x1="0" y1="0" x2="100" y2="100" stroke="var(--color-brand-200)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="var(--color-brand-200)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

const b = (left: string, top: string, width: string, height: string): CSSProperties => ({ left, top, width, height });

function WireDesktop() {
  return (
    <div className="absolute inset-0 bg-surface" aria-hidden="true">
      <div className="absolute rounded-[2px] bg-line-strong" style={b("4%", "5%", "10%", "5%")} />
      {["40%", "48%", "56%", "64%"].map((l) => (
        <div key={l} className="absolute rounded-full bg-line" style={b(l, "6.5%", "6%", "2.5%")} />
      ))}
      <div className="absolute rounded-[3px] border-[1.5px] border-line-strong" style={b("85%", "4.5%", "11%", "6.5%")} />
      <div className="absolute rounded-[2px] bg-line-strong" style={b("4%", "22%", "40%", "6.5%")} />
      <div className="absolute rounded-[2px] bg-line-strong" style={b("4%", "31%", "30%", "6.5%")} />
      <div className="absolute rounded-full bg-line" style={b("4%", "42%", "38%", "2.5%")} />
      <div className="absolute rounded-full bg-line" style={b("4%", "46.5%", "30%", "2.5%")} />
      <div className="absolute rounded-[3px] bg-line-strong" style={b("4%", "55%", "13%", "7.5%")} />
      <div className="absolute rounded-[3px] border-[1.5px] border-line-strong" style={b("19%", "55%", "11%", "7.5%")} />
      <XBox style={b("54%", "20%", "42%", "44%")} />
      {["4%", "36%", "68%"].map((l) => (
        <div key={l} className="absolute rounded-[3px] border border-line" style={b(l, "72%", "28%", "21%")}>
          <div className="absolute rounded-full bg-line" style={b("8%", "22%", "50%", "12%")} />
          <div className="absolute rounded-full bg-sunken" style={b("8%", "48%", "80%", "10%")} />
          <div className="absolute rounded-full bg-sunken" style={b("8%", "66%", "64%", "10%")} />
        </div>
      ))}
    </div>
  );
}

function WireMobile() {
  return (
    <div className="absolute inset-0 bg-surface" aria-hidden="true">
      <div className="absolute rounded-[2px] bg-line-strong" style={b("8%", "3%", "26%", "2.5%")} />
      <div className="absolute rounded-[2px] bg-line" style={b("80%", "3%", "12%", "2.5%")} />
      <div className="absolute rounded-[2px] bg-line-strong" style={b("8%", "10%", "78%", "3.5%")} />
      <div className="absolute rounded-[2px] bg-line-strong" style={b("8%", "15%", "58%", "3.5%")} />
      <div className="absolute rounded-full bg-line" style={b("8%", "21%", "84%", "1.5%")} />
      <div className="absolute rounded-full bg-line" style={b("8%", "24%", "68%", "1.5%")} />
      <div className="absolute rounded-[3px] bg-line-strong" style={b("8%", "29%", "50%", "4.5%")} />
      <XBox style={b("8%", "37%", "84%", "22%")} />
      <div className="absolute rounded-[3px] border border-line" style={b("8%", "63%", "84%", "14%")} />
      <div className="absolute rounded-[3px] border border-line" style={b("8%", "80%", "84%", "14%")} />
    </div>
  );
}
