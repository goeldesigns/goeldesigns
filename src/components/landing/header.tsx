"use client";

import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { buttonClass } from "../ui/button";
import { Logo } from "./logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Glass header + scroll progress
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Scrollspy: underline the section in the middle of the viewport. Sections
  // outside the nav (hero, contact) are observed too so nothing stays lit there.
  useEffect(() => {
    const ids = ["top", ...nav.map((n) => n.id), "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile sheet: lock scroll, close on Escape, return focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-brand-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled || open ? "bg-surface/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1200px] items-center gap-6 px-4 transition-[height] duration-300 sm:px-6",
            scrolled ? "h-16" : "h-[72px]",
          )}
        >
          <a href="#top" className="shrink-0 rounded-lg" aria-label="Goel Designs home" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const on = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                    on ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-500 transition-transform duration-300",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a href={site.phone.href} className={buttonClass({ variant: "ghost", size: "md", className: "max-md:hidden" })}>
              <Phone />
              {site.phone.display}
            </a>
            <a href="#contact" className={buttonClass({ variant: "primary", size: "md", className: "max-sm:hidden" })}>
              Start a project
              <ArrowRight />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-lg text-ink transition-colors hover:bg-sunken lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
          <div ref={progressRef} className="h-full origin-left scale-x-0 bg-brand-500/70" />
        </div>
      </header>

      {/* Mobile sheet: slides down, 220ms */}
      <div
        id="mobile-menu"
        ref={sheetRef}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-0 z-30 origin-top border-b border-line bg-surface px-4 pt-20 pb-6 shadow-pop transition-[translate,opacity] duration-[220ms] ease-out sm:px-6 lg:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between border-b border-line py-3.5 text-[17px] font-semibold tracking-[-0.01em] text-ink",
                open && "lp-step-in",
              )}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {item.label}
              <ArrowRight className="size-4 text-subtle" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mt-5 grid gap-2.5">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={buttonClass({ variant: "primary", size: "lg", className: "w-full" })}
          >
            Start a project
            <ArrowRight />
          </a>
          <a href={site.phone.href} className={buttonClass({ variant: "outline", size: "lg", className: "w-full" })}>
            <Phone />
            Call {site.phone.display}
          </a>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-20 bg-night/30 backdrop-blur-[2px] lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
