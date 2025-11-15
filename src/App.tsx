import React, { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    const originalTitle = document.title;

    const handleBlur = () => {
      document.title = "Come back to Goel Designs!";
    };

    const handleFocus = () => {
      document.title = originalTitle;
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    // Cleanup when unmounted
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      {/* <Portfolio /> */}
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
