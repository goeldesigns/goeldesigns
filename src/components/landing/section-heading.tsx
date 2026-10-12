import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Marketing heading: eyebrow (12.5px / 600 / 0.14em) · section-title (Inter 600, -0.03em)
 * finishing on an italic Instrument Serif accent · lead in muted.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  tone = "light",
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  lead?: string;
  tone?: "light" | "night";
  align?: "center" | "left";
  className?: string;
}) {
  const night = tone === "night";
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[620px]", className)}>
      <Reveal
        as="p"
        anim="fade"
        className={cn("text-[12.5px] leading-[1.4] font-semibold tracking-[0.14em] uppercase", night ? "text-brand-300" : "text-brand-500")}
      >
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        anim="blur"
        delay={0.08}
        className={cn(
          "mt-3 text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] text-balance sm:text-[42px]",
          night ? "text-white" : "text-ink",
        )}
      >
        {title}{" "}
        <span className={cn("font-display font-normal tracking-[-0.01em] italic", night ? "text-brand-300" : "text-brand-500")}>
          {accent}
        </span>
      </Reveal>
      {lead && (
        <Reveal
          as="p"
          delay={0.16}
          className={cn(
            "mt-4 text-[16px] leading-[1.625] text-pretty",
            night ? "text-white/60" : "text-muted",
            align === "center" && "mx-auto max-w-[580px]",
          )}
        >
          {lead}
        </Reveal>
      )}
    </div>
  );
}
