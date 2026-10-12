import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Goel Designs — Design, build and launch from one studio";
const description =
  "UI/UX, web development, branding, hosting, APIs and video under one roof. See Tabla, Velvet Brew and The Only Teacher — live products designed and built by Goel Designs.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: ["Goel Designs", "UI/UX design", "web development", "branding", "logo design", "hosting", "design studio India"],
  openGraph: { title, description, url: site.url, siteName: site.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
  verification: { google: "fwPaXeiqj0K-C3_TrWSZKwaamm0SIVPjWAUnnfmCTPo" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${instrument.variable}`}>
      <head>
        <noscript>
          <style>{`.lp-reveal{opacity:1!important;transform:none!important;filter:none!important}.lp-reveal>*{clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              email: site.email,
              telephone: "+919368207505",
              logo: `${site.url}/brand/goel-designs-logo.png`,
            }),
          }}
        />
      </body>
    </html>
  );
}
