import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { Process } from "@/components/landing/process";
import { Services } from "@/components/landing/services";
import { Stats } from "@/components/landing/stats";
import { Work } from "@/components/landing/work";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Stats />
        <Process />
        <About />
        <Contact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
