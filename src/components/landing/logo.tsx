import { cn } from "@/lib/utils";

/**
 * The logo plate: brand-500, radius-logo (10px), white stroke glyph — a G with a pen-tool anchor.
 * Pass size + radius classes together to resize it (defaults to 36px / radius-logo).
 */
export function LogoMark({ className = "size-9 rounded-logo" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid shrink-0 place-items-center bg-brand-500 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]", className)}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[62%]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.95 7.05A7 7 0 1 0 19 12h-6" />
        <circle cx="16.95" cy="7.05" r="1.7" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export function Logo({ subtitle, tone = "light", className }: { subtitle?: string; tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="min-w-0 leading-tight">
        <span className={cn("block text-[15px] font-semibold tracking-[-0.01em]", tone === "dark" ? "text-white" : "text-ink")}>
          Goel Designs
        </span>
        {subtitle && <span className={cn("block text-2xs font-medium", tone === "dark" ? "text-white/55" : "text-muted")}>{subtitle}</span>}
      </span>
    </span>
  );
}
