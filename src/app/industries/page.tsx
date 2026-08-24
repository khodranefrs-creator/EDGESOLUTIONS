import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { EdgeField } from "@/components/edge-field";
import { CTASection } from "@/components/cta-section";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "ClearEdge Solutions serves technology-driven industries including data centers, semiconductor equipment, automotive, and clean energy with engineered connectivity and assembly solutions.",
  alternates: { canonical: "/industries" },
};

/* APPLICATIONS AS A LIVING FIELD.
   The relations between industries and product families are drawn as
   the actual network they are — six verified edges, nothing invented.
   Deep links (/industries#data-centers …) anchor beside the field. */

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={
          <>
            Connectivity for the industries that can&rsquo;t afford
            unreliable.
          </>
        }
        lede="We serve technology-driven industries — where performance requirements are exacting and dependability is the baseline, not the goal."
      />

      <section className="bg-bg text-fg" aria-label="Industry application field">
        {/* stable anchors for /industries#<industry> */}
        {industries.map((ind) => (
          <div key={ind.id} id={ind.id} aria-hidden="true" className="h-0 scroll-mt-28" />
        ))}

        <div className="mx-auto max-w-[84rem] px-5 pb-28 pt-6 md:px-10 md:pb-40">
          <EdgeField />
        </div>
      </section>

      <CTASection />
    </>
  );
}
