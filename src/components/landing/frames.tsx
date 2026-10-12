import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Marketing screenshots sit in a browser or phone frame (design system: Imagery). */
export function BrowserFrame({
  url,
  tone = "light",
  className,
  children,
}: {
  url: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border",
        dark ? "border-night-3 bg-night-2 shadow-[0_40px_80px_-32px_rgb(0_0_0/0.6)]" : "border-line bg-surface shadow-frame",
        className,
      )}
    >
      <div className={cn("flex h-9 items-center gap-3 border-b px-3.5", dark ? "border-night-3" : "border-line bg-canvas")}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          className={cn(
            "mx-auto flex h-6 max-w-[60%] min-w-0 items-center gap-1.5 rounded-md px-3 text-[11.5px] font-medium",
            dark ? "bg-night-3/70 text-white/60" : "border border-line bg-surface text-muted",
          )}
        >
          <Lock className="size-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] border-[6px] border-night bg-night shadow-[0_30px_60px_-24px_rgb(22_21_42/0.55)]",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-night" />
      <div className="overflow-hidden rounded-[24px] bg-surface">{children}</div>
    </div>
  );
}
