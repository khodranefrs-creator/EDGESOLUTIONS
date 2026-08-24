import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ConnectsPathway } from "@/components/home/connects-pathway";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { ProductDirectory } from "@/components/home/product-directory";
import { ApplicationMap } from "@/components/home/application-map";
import { Confidence } from "@/components/home/confidence";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Homepage as narrative — one document, seven numbered views:
   01 SIGNAL · 02 CONNECTION · 03 ENGINEERING · 04 PRODUCTS
   05 APPLICATION · 06 CONFIDENCE · 07 CONTACT                  */

export default function HomePage() {
  return (
    <>
      <Hero />
      <ConnectsPathway />
      <ProcessTimeline />
      <ProductDirectory />
      <ApplicationMap />
      <Confidence />
      <CTASection />
    </>
  );
}
