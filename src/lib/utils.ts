import type { Accent } from "./content";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Category accents. Soft fills and text come from the six Avatar tint
 * pairs in the design system; solid/fg use the chart accent tokens.
 */
export const accent: Record<Accent, { soft: string; ring: string; text: string; solid: string; fg: string; hex: string }> = {
  brand: {
    soft: "bg-brand-100",
    ring: "ring-brand-150",
    text: "text-brand-700",
    solid: "bg-brand-500",
    fg: "text-brand-500",
    hex: "#5040d0",
  },
  saffron: {
    soft: "bg-[#fdeee6]",
    ring: "ring-[#f9dccd]",
    text: "text-[#b14a1f]",
    solid: "bg-saffron",
    fg: "text-saffron",
    hex: "#eb6834",
  },
  mint: { soft: "bg-[#e3f6ee]", ring: "ring-[#c8ecdc]", text: "text-[#167a50]", solid: "bg-mint", fg: "text-mint", hex: "#1baf7a" },
  turmeric: {
    soft: "bg-[#fdf3dc]",
    ring: "ring-[#f8e5b5]",
    text: "text-[#94620a]",
    solid: "bg-turmeric",
    fg: "text-turmeric",
    hex: "#eda100",
  },
  blush: { soft: "bg-[#fbe9f0]", ring: "ring-[#f6d3e1]", text: "text-[#a83a64]", solid: "bg-blush", fg: "text-blush", hex: "#e87ba4" },
  ocean: { soft: "bg-[#e7f0fd]", ring: "ring-[#cfe0fa]", text: "text-[#1d5fd0]", solid: "bg-ocean", fg: "text-ocean", hex: "#2a78d6" },
};
