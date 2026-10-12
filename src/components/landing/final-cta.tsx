import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { buttonClass } from "../ui/button";
import { LaunchCard } from "./launch-card";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-4 pb-24 sm:px-6">
      <Reveal anim="clip" className="mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-[28px] bg-brand-500 px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 size-[520px] rounded-full border-[48px] border-white/[0.05]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [mask-image:radial-gradient(50%_70%_at_80%_50%,#000,transparent)] bg-[length:16px_16px]"
          />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div>
              <p className="text-[12.5px] font-semibold tracking-[0.14em] text-brand-200 uppercase">Ready when you are</p>
              <h2
                id="cta-title"
                className="mt-3 text-[36px] leading-[1.06] font-semibold tracking-[-0.03em] text-balance text-white sm:text-[48px]"
              >
                Your next launch could be{" "}
                <span className="font-display font-normal tracking-[-0.01em] text-brand-200 italic">built by Goel Designs.</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-[16px] leading-[1.625] text-white/75">
                Bring the idea, the sketch or the old website. We’ll bring design, code, hosting and a plan to launch.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className={buttonClass({ variant: "white", size: "lg" })}>
                  Start a project
                  <ArrowRight />
                </a>
                <a href={site.phone.href} className={buttonClass({ variant: "outline-dark", size: "lg" })}>
                  <Phone />
                  Call {site.phone.display}
                </a>
              </div>
              <p className="mt-5 text-[13px] text-white/60">Call, video call or WhatsApp · {site.hours}</p>
            </div>

            {/* A project moving through our process to launch */}
            <LaunchCard />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
