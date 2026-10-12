import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link" | "white" | "outline-dark" | "ghost-dark";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
  "[&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  // The single main action of a view. brand-500, white text, shadow-button.
  primary: "bg-brand-500 text-white shadow-button hover:bg-brand-600 active:bg-brand-700",
  // A strong second action next to primary.
  secondary: "bg-brand-100 text-brand-600 hover:bg-brand-150 active:bg-brand-200",
  // Neutral actions.
  outline: "border border-line bg-surface text-ink shadow-card hover:border-line-strong hover:bg-canvas",
  // Toolbar and dismiss actions.
  ghost: "text-muted hover:bg-sunken hover:text-ink",
  link: "h-auto! px-0! text-brand-500 underline-offset-4 hover:text-brand-600 hover:underline",
  // On brand / night grounds (marketing only)
  white: "bg-white text-brand-600 shadow-[0_1px_2px_rgb(20_18_48/0.12)] hover:bg-brand-50 active:bg-brand-100",
  "outline-dark": "border border-white/15 text-white hover:border-white/30 hover:bg-white/8",
  "ghost-dark": "text-white/75 hover:bg-white/8 hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-[12px]",
  sm: "h-8 px-3 text-[13px]",
  md: "h-9 px-3.5 text-[14px]",
  lg: "h-11 px-5 text-[15px] font-semibold [&_svg]:size-[18px]",
  xl: "h-12 px-6 text-[15px] font-semibold [&_svg]:size-[18px]",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type Common = { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ variant, size, className })} {...props} />;
}
