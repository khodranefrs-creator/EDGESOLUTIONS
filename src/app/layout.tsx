import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Manrope, IBM_Plex_Mono } from "next/font/google";
import { company } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

/* Typography of the engineering documentation system:
   — Instrument Sans carries display statements and UI: architectural,
     confident, sentence case
   — Manrope carries body copy: editorial warmth with technical clarity
   — IBM Plex Mono only where information is genuinely technical */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default:
      "ClearEdge Solutions — Fiber Optic, Copper & Electro-Mechanical Manufacturing",
    template: "%s | ClearEdge Solutions",
  },
  description:
    "Located in the heart of Silicon Valley, ClearEdge Solutions designs and manufactures high performance fiber optic and copper cabling systems and electro-mechanical assemblies for data centers, semiconductor equipment, automotive, and clean energy.",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: company.url,
  email: company.email,
  telephone: "+1-408-649-3435",
  slogan: `${company.name} – ${company.slogan}.`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.zip,
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-408-649-3435",
      email: company.email,
      contactType: "sales",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${manrope.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* progressive enhancement flag: animations only apply when JS is present */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-bg text-fg antialiased">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
