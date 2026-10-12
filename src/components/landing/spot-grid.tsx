"use client";

import type { ReactNode } from "react";

/** Feeds the pointer position to the hovered .lp-spot card (radial brand glow follows the cursor). */
export function SpotGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <ul
      className={className}
      onPointerMove={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>(".lp-spot");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--lp-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--lp-y", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </ul>
  );
}
