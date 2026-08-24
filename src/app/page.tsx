import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ConnectsPathway } from "@/components/home/connects-pathway";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { ProductDirectory } from "@/components/home/product-directory";
import { ApplicationMap } from "@/components/home/application-map";
import { Confidence } from "@/components/home/confidence";
import { CTASection } from "@/components/cta-section";
import { ConductorSeam } from "@/components/conductor";
import { SheetRail, type RailSheet } from "@/components/sheet-rail";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Homepage as narrative — one continuous document, seven numbered
   sheets joined by conductor seams so the signal never breaks:
   01 SIGNAL · 02 CONNECTION · 03 ENGINEERING · 04 PRODUCTS
   05 APPLICATION · 06 CONFIDENCE · 07 CONTACT                  */

const sheets: RailSheet[] = [
  { id: "signal", n: "01", label: "Signal" },
  { id: "connection", n: "02", label: "Connection" },
  { id: "engineering", n: "03", label: "Engineering" },
  { id: "products", n: "04", label: "Products" },
  { id: "application", n: "05", label: "Application" },
  { id: "confidence", n: "06", label: "Confidence" },
  { id: "contact", n: "07", label: "Contact" },
];

export default function HomePage() {
  return (
    <>
      <SheetRail items={sheets} />

      <Hero />
      <ConductorSeam to="02 · Connection" theme="dark" />
      <ConnectsPathway />
      <ConductorSeam to="03 · Engineering" theme="light" />
      <ProcessTimeline />
      <ConductorSeam to="04 · Products" theme="dark" />
      <ProductDirectory />
      <ConductorSeam to="05 · Application" theme="light" />
      <ApplicationMap />
      <ConductorSeam to="06 · Confidence" theme="dark" />
      <Confidence />
      <ConductorSeam to="07 · Contact" theme="deep" />
      <CTASection id="contact" />
    </>
  );
}
