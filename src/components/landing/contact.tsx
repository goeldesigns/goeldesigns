"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Clock,
  Copy,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
} from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { brief, services, site, type ServiceId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Button, buttonClass } from "../ui/button";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Choice = ServiceId | "other";
const steps = ["What you need", "Budget & timing", "Your details"] as const;

const serviceChoices: { id: Choice; label: string }[] = [
  ...services.map((s) => ({ id: s.id as Choice, label: s.title })),
  { id: "other", label: "Something else" },
];

/* Segmented: a raised chip on a sunken track. role=radiogroup / radio. */
function Segmented({
  label,
  options,
  value,
  onChange,
  cols,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
  cols: string;
}) {
  const id = useId();
  return (
    <div>
      <p id={id} className="text-[13px] font-medium text-ink">
        {label} <span className="font-normal text-subtle">Optional</span>
      </p>
      <div role="radiogroup" aria-labelledby={id} className={cn("mt-2 grid gap-0.5 rounded-lg border border-line bg-sunken p-0.5", cols)}>
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o)}
              className={cn(
                "h-9 rounded-md px-2 text-[13px] font-medium whitespace-nowrap transition-[background-color,color,box-shadow] duration-150",
                on ? "bg-surface text-ink shadow-[0_1px_2px_rgb(20_18_48/0.08),0_0_0_1px_var(--color-line)]" : "text-muted hover:text-ink",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  optional,
  error,
  children,
  htmlFor,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink">
        {label} {optional && <span className="font-normal text-subtle">Optional</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-[12px] text-danger-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * "Send" posts the brief to the Google Apps Script web app (google-apps-script/Code.gs), which adds a row
 * to the Briefs sheet and emails info@goeldesigns.com. Set its /exec URL in NEXT_PUBLIC_BRIEF_ENDPOINT.
 * Until it is set, Send falls back to opening the visitor’s email app.
 */
const BRIEF_ENDPOINT = process.env.NEXT_PUBLIC_BRIEF_ENDPOINT ?? "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Where a brief goes: info@goeldesigns.com and the studio WhatsApp (+91 9368207505), both from content.ts */
const mailtoUrl = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const gmailUrl = (subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const whatsappUrl = (text: string) => `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(text)}`;

const inputClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-lg border bg-surface px-3 text-[15px] text-ink shadow-card outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-subtle",
    invalid
      ? "border-danger ring-[3px] ring-danger-50"
      : "border-line hover:border-line-strong focus:border-brand-400 focus:ring-[3px] focus:ring-brand-100",
  );

export function Contact() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Choice[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: hidden from people, bots fill it
  const [errors, setErrors] = useState<{ services?: string; name?: string; email?: string; phone?: string }>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState<{
    via: "sheet" | "email-app" | "whatsapp";
    text: string;
    subject: string;
    whatsappText: string;
    copySent?: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const toggle = (c: Choice) => {
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
    setErrors((e) => ({ ...e, services: undefined }));
  };

  const labels = picked.map((c) => serviceChoices.find((s) => s.id === c)!.label);
  const summary = [picked.length ? `${picked.length} ${picked.length === 1 ? "service" : "services"}` : "No services yet", budget, timeline]
    .filter(Boolean)
    .join(" · ");

  /**
   * Everything the client filled in, as one message. WhatsApp gets *bold* headings;
   * email gets plain uppercase headings. Blank optional fields still show, as "Not given".
   * The "client" version (shown back to them after Send) drops the studio-only lines.
   */
  const composeBrief = (format: "whatsapp" | "email" | "client"): string => {
    if (format === "client") {
      return composeBrief("email")
        .split("\n")
        .filter((l) => !/^(NEW PROJECT ENQUIRY|WhatsApp them:|Sent from the brief builder)/.test(l))
        .join("\n")
        .trim();
    }
    const h = (t: string) => (format === "whatsapp" ? `*${t}*` : t.toUpperCase());
    const digits = phone.replace(/\D/g, "");
    const waDigits = digits.length === 10 ? `91${digits}` : digits;
    const sentAt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());

    return [
      h("New project enquiry — goeldesigns.com"),
      "",
      h("Client"),
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone / WhatsApp: ${phone.trim()}`,
      `WhatsApp them: https://wa.me/${waDigits}`,
      `Company / brand: ${company.trim() || "Not given"}`,
      "",
      h("Project"),
      "Services needed:",
      ...(labels.length ? labels.map((l) => `• ${l}`) : ["• Not given"]),
      `Budget: ${budget ?? "Not given"}`,
      `Timeline: ${timeline ?? "Not given"}`,
      "",
      h("About the project"),
      details.trim() || "Not given",
      "",
      `Sent from the brief builder on goeldesigns.com · ${sentAt.replace(/\b(am|pm)\b/, (m) => m.toUpperCase())} IST`,
    ].join("\n");
  };

  const next = () => {
    if (step === 0 && picked.length === 0) {
      setErrors({ services: "Pick at least one service to continue." });
      return;
    }
    setStep((s) => s + 1);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Enter your name.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email, like priya@cafe.in.";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) e.phone = "Enter a phone number with at least 10 digits.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const send = async (via: "submit" | "whatsapp") => {
    if (sending || !validate()) return;
    setSendError(null);
    const text = composeBrief("email");
    const whatsappText = composeBrief("whatsapp");
    const subject = `New project enquiry — ${name.trim()}${company.trim() ? ` (${company.trim()})` : ""}`;

    if (via === "whatsapp") {
      window.open(whatsappUrl(whatsappText), "_blank", "noopener,noreferrer");
      setSent({ via, text, subject, whatsappText });
      setStep(3);
      return;
    }

    // Not connected to the sheet yet: hand the brief to the visitor's email app instead
    if (!BRIEF_ENDPOINT) {
      window.location.href = mailtoUrl(subject, text);
      setSent({ via: "email-app", text, subject, whatsappText });
      setStep(3);
      return;
    }

    setSending(true);
    const timeout = new AbortController();
    const timer = setTimeout(() => timeout.abort(), 20000);
    try {
      // text/plain keeps this a "simple" request, so Apps Script answers without a CORS preflight
      const res = await fetch(BRIEF_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          services: labels,
          budget: budget ?? "",
          timeline: timeline ?? "",
          details: details.trim(),
          page: window.location.href,
          website,
          elapsedMs: Date.now() - startedAt.current,
        }),
        signal: timeout.signal,
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; copySent?: boolean } | null;
      if (!res.ok || !data?.ok) {
        setSendError(data?.error || "Your brief didn’t send. Please try again, or send it on WhatsApp.");
        return;
      }
      setSent({ via: "sheet", text: composeBrief("client"), subject, whatsappText, copySent: data.copySent });
      setStep(3);
    } catch {
      setSendError("Your brief didn’t send — check your connection and try again, or send it on WhatsApp.");
    } finally {
      clearTimeout(timer);
      setSending(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send("submit");
  };

  const reset = () => {
    setStep(0);
    setPicked([]);
    setBudget(null);
    setTimeline(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDetails("");
    setErrors({});
    setSendError(null);
    setSent(null);
    setCopied(false);
    startedAt.current = Date.now();
  };

  const copy = async () => {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(sent.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="bg-canvas py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Left: context */}
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow="Start a project"
            title="Start with a conversation,"
            accent="not a contract."
            lead="Tell us a little about the project. Press Send and it goes straight to our team — or open it in WhatsApp if you’d rather chat."
          />

          <Reveal anim="up" delay={0.2} className="mt-8">
            <p className="text-[12.5px] font-semibold tracking-[0.14em] text-muted uppercase">What happens next</p>
            <ol className="mt-3 grid gap-2">
              {brief.next.map((n) => (
                <li key={n.step} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3 shadow-card">
                  <span className="grid h-6 min-w-9 place-items-center rounded-md bg-brand-100 text-[11px] font-semibold text-brand-700 tabular-nums">
                    {n.step}
                  </span>
                  <span className="text-[14px] leading-[1.5] text-ink-2">{n.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal anim="up" delay={0.28} className="mt-8 grid gap-3 text-[14px]">
            <a href={`mailto:${site.email}`} className="group flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <Mail className="size-[18px]" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-medium text-ink group-hover:text-brand-600">{site.email}</span>
                <span className="block text-[12.5px] text-muted">Briefs, quotes and questions</span>
              </span>
            </a>
            <a href={site.phone.href} className="group flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#e3f6ee] text-[#167a50]">
                <Phone className="size-[18px]" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-medium text-ink group-hover:text-brand-600">{site.phone.display}</span>
                <span className="block text-[12.5px] text-muted">Call or WhatsApp</span>
              </span>
            </a>
            <p className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#fdf3dc] text-[#94620a]">
                <Clock className="size-[18px]" aria-hidden="true" />
              </span>
              <span className="text-ink-2">{site.hours}</span>
            </p>
          </Reveal>
        </div>

        {/* Right: brief builder */}
        <Reveal anim="scale" delay={0.1}>
          <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
            {/* Stepper */}
            <ol className="flex items-center gap-2 border-b border-line bg-canvas px-5 py-3.5" aria-label="Brief progress">
              {steps.map((label, i) => {
                const done = step > i;
                const on = step === i;
                return (
                  <li key={label} className="flex min-w-0 flex-1 items-center gap-2 last:flex-none" aria-current={on ? "step" : undefined}>
                    <span
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold tabular-nums transition-colors duration-300",
                        done
                          ? "bg-brand-500 text-white"
                          : on
                            ? "bg-brand-500 text-white ring-4 ring-brand-100"
                            : "border border-line-strong bg-surface text-muted",
                      )}
                    >
                      {done ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : i + 1}
                    </span>
                    <span className={cn("hidden truncate text-[13px] font-medium sm:block", on || done ? "text-ink" : "text-muted")}>
                      {label}
                    </span>
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="relative mx-1 h-px min-w-4 flex-1 bg-line">
                        <span
                          className={cn(
                            "absolute inset-0 origin-left bg-brand-500 transition-transform duration-500",
                            done ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>

            <form onSubmit={onSubmit} noValidate>
              <div className="min-h-[380px] p-5 sm:p-6">
                {step === 0 && (
                  <div key="s0" className="lp-step-in">
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">What do you need?</h3>
                    <p className="mt-1 text-[13px] text-muted">
                      Pick one or more. Not sure? Pick “Something else” and tell us on the last step.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Services">
                      {serviceChoices.map((s) => {
                        const on = picked.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(s.id)}
                            className={cn(
                              "flex h-10 items-center gap-1.5 rounded-lg border px-3.5 text-[13.5px] font-medium transition-[background-color,border-color,color] duration-150",
                              on
                                ? "border-brand-400 bg-brand-50 text-brand-700"
                                : "border-line bg-surface text-ink-2 shadow-card hover:border-line-strong",
                            )}
                          >
                            <span
                              className={cn(
                                "grid size-4 place-items-center rounded-sm border transition-colors",
                                on ? "border-brand-500 bg-brand-500 text-white" : "border-line-strong bg-surface",
                              )}
                            >
                              {on && <Check className="size-3" strokeWidth={3} aria-hidden="true" />}
                            </span>
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                    <p aria-live="polite" className="mt-3 min-h-5 text-[12px] text-danger-700">
                      {errors.services}
                    </p>
                  </div>
                )}

                {step === 1 && (
                  <div key="s1" className="lp-step-in grid gap-6">
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">Budget and timing</h3>
                      <p className="mt-1 text-[13px] text-muted">A rough idea helps us suggest the right scope. You can skip both.</p>
                    </div>
                    <Segmented
                      label="Budget"
                      options={brief.budgets}
                      value={budget}
                      onChange={setBudget}
                      cols="grid-cols-3 sm:grid-cols-5"
                    />
                    <Segmented
                      label="Timeline"
                      options={brief.timelines}
                      value={timeline}
                      onChange={setTimeline}
                      cols="grid-cols-2 sm:grid-cols-4"
                    />
                    <div className="rounded-xl bg-info-50 px-3.5 py-3 text-[13px] leading-[1.625] text-info-700 ring-1 ring-info-100 ring-inset">
                      <span className="font-semibold">Every project gets a written quote.</span> The budget only helps us suggest a scope —
                      you see the final price before any work starts.
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div key="s2" className="lp-step-in relative grid gap-4">
                    <div>
                      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">Your details</h3>
                      <p className="mt-1 text-[13px] text-muted">So we know who to reply to.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" htmlFor="b-name" error={errors.name}>
                        <input
                          id="b-name"
                          className={cn(inputClass(!!errors.name), "h-11")}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setErrors((x) => ({ ...x, name: undefined }));
                          }}
                          autoComplete="name"
                          placeholder="e.g. Priya Sharma"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "b-name-error" : undefined}
                        />
                      </Field>
                      <Field label="Email" htmlFor="b-email" error={errors.email}>
                        <input
                          id="b-email"
                          type="email"
                          className={cn(inputClass(!!errors.email), "h-11")}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((x) => ({ ...x, email: undefined }));
                          }}
                          autoComplete="email"
                          placeholder="e.g. priya@cafe.in"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "b-email-error" : undefined}
                        />
                      </Field>
                      <Field label="Phone / WhatsApp" htmlFor="b-phone" error={errors.phone}>
                        <input
                          id="b-phone"
                          type="tel"
                          className={cn(inputClass(!!errors.phone), "h-11")}
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setErrors((x) => ({ ...x, phone: undefined }));
                          }}
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="e.g. 98765 43210"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "b-phone-error" : undefined}
                        />
                      </Field>
                      <Field label="Company or brand" optional htmlFor="b-company">
                        <input
                          id="b-company"
                          className={cn(inputClass(), "h-11")}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          autoComplete="organization"
                          placeholder="e.g. Velvet Brew Café"
                        />
                      </Field>
                    </div>
                    {/* Honeypot: off-screen and skipped by keyboard and screen readers */}
                    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="b-website">Website</label>
                      <input id="b-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                    <Field label="About the project" optional htmlFor="b-details">
                      <textarea
                        id="b-details"
                        className={cn(inputClass(), "min-h-[96px] resize-y py-2.5 leading-[1.5]")}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="e.g. A website for our café with online ordering and a menu we can update ourselves"
                      />
                    </Field>
                    {sendError && (
                      <div
                        role="alert"
                        className="flex gap-2.5 rounded-xl bg-danger-50 px-3.5 py-3 text-[13px] leading-[1.625] text-danger-700 ring-1 ring-danger-100 ring-inset"
                      >
                        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        {sendError}
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div key="s3" className="lp-step-in flex flex-col items-center py-4 text-center" role="status">
                    <span className="relative grid size-16 place-items-center">
                      <span className="lp-burst absolute inset-0 rounded-full bg-success/30" aria-hidden="true" />
                      <span className="relative grid size-16 place-items-center rounded-full bg-success-50 ring-1 ring-success-100 ring-inset">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-8 text-success-700"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12.5l4.5 4.5L19 7.5" className="lp-tick" />
                        </svg>
                      </span>
                    </span>
                    <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink">
                      {sent?.via === "sheet"
                        ? `Thanks, ${name.trim().split(/\s+/)[0]} — your brief is with us`
                        : "Your brief is ready to send"}
                    </h3>
                    <p className="mt-2 max-w-[440px] text-[14px] leading-[1.6] text-muted">
                      {sent?.via === "sheet" ? (
                        <>
                          Our team has it and will reply to <span className="font-medium text-ink">{email.trim()}</span> soon to set up a
                          call.
                          {sent.copySent && " A copy of your brief is on its way to your inbox."}
                        </>
                      ) : sent?.via === "whatsapp" ? (
                        `WhatsApp opened with your brief to ${site.phone.display} — press send there. Nothing opened? Use the buttons below.`
                      ) : (
                        `Your email app opened with your brief to ${site.email} — press send there. Nothing opened? Use the buttons below.`
                      )}
                    </p>
                    <pre className="mt-5 max-h-48 w-full overflow-auto rounded-xl border border-line bg-canvas p-3.5 text-left font-sans text-[12.5px] leading-[1.6] whitespace-pre-wrap text-ink-2">
                      {sent?.text}
                    </pre>
                    {sent && (
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <a
                          href={whatsappUrl(sent.whatsappText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonClass({ variant: "outline" })}
                        >
                          <MessageCircle />
                          {sent.via === "sheet" ? "Chat on WhatsApp" : "Open WhatsApp"}
                        </a>
                        {sent.via === "email-app" && (
                          <a
                            href={gmailUrl(sent.subject, sent.text)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonClass({ variant: "outline" })}
                          >
                            <Mail />
                            Open in Gmail
                          </a>
                        )}
                        {sent.via !== "sheet" && (
                          <Button variant="outline" onClick={copy}>
                            {copied ? <Check /> : <Copy />}
                            {copied ? "Copied" : "Copy brief"}
                          </Button>
                        )}
                        <Button variant="ghost" onClick={reset}>
                          <RotateCcw />
                          Start a new brief
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {step < 3 && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5">
                  <p className="min-w-0 truncate text-[12.5px] text-muted" aria-live="polite">
                    {summary}
                  </p>
                  <div className="ml-auto flex items-center gap-2">
                    {step > 0 && (
                      <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                        <ArrowLeft />
                        Back
                      </Button>
                    )}
                    {step < 2 ? (
                      <Button variant="primary" onClick={next}>
                        Continue
                        <ArrowRight />
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => send("whatsapp")} disabled={sending}>
                          <MessageCircle />
                          <span>
                            <span className="max-sm:hidden">Send on </span>WhatsApp
                          </span>
                        </Button>
                        <button
                          type="submit"
                          disabled={sending}
                          aria-busy={sending}
                          className={buttonClass({ variant: "primary", className: "min-w-[96px]" })}
                        >
                          {sending ? <LoaderCircle className="motion-safe:animate-spin" /> : <Send />}
                          {sending ? "Sending…" : "Send"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
