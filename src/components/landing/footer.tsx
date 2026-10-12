import { ArrowUp, ArrowUpRight, Clock, Mail, Phone } from "lucide-react";
import { projects, services, site } from "@/lib/content";
import { Logo } from "./logo";

const linkClass = "text-[14px] text-muted transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <Logo subtitle={site.descriptor} />
          <p className="mt-4 max-w-[300px] text-[14px] leading-[1.6] text-muted">
            Design, development, branding and hosting — one team from the first call to launch day.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="text-[14px] font-semibold text-ink">Services</p>
          <ul className="mt-4 grid gap-2.5">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <a href="#services" className={linkClass}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid content-start gap-8">
          <nav aria-label="Work">
            <p className="text-[14px] font-semibold text-ink">Work</p>
            <ul className="mt-4 grid gap-2.5">
              {projects.map((p) => (
                <li key={p.id}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                    {p.name}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="text-[14px] font-semibold text-ink">Company</p>
            <ul className="mt-4 grid gap-2.5">
              {[
                ["#about", "About us"],
                ["#process", "How we work"],
                ["#faq", "FAQ"],
                ["#contact", "Start a project"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <p className="text-[14px] font-semibold text-ink">Talk to us</p>
          <ul className="mt-4 grid gap-3 text-[14px]">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-ink-2 hover:text-brand-600">
                <Mail className="size-4 text-subtle" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phone.href} className="flex items-center gap-2.5 text-ink-2 hover:text-brand-600">
                <Phone className="size-4 text-subtle" aria-hidden="true" />
                {site.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <Clock className="size-4 text-subtle" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-[12.5px] text-muted sm:px-6">
          <p>© {new Date().getFullYear()} Goel Designs. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 font-medium hover:text-ink">
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
