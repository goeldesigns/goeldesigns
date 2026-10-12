import { cn } from "@/lib/utils";

/**
 * The Goel Designs "GD" monogram (public/brand/gd-mark.png, transparent, ~1.41:1).
 * Size it with a height or size class; it keeps its proportions inside the box.
 */
export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src="/brand/gd-mark.png"
      alt=""
      aria-hidden="true"
      width={512}
      height={364}
      decoding="async"
      className={cn("shrink-0 object-contain", className)}
    />
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
