import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { ArrowLink } from "@/components/ui";
import { EngineeringChambers } from "@/components/engineering-chambers";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Fiber optic cabling, copper cabling, electro-mechanical box build assemblies, engineering collaboration, and build-to-print contract manufacturing — ISO certified quality throughout.",
  alternates: { canonical: "/capabilities" },
};

/* CAPABILITIES AS CHAMBERS.
   Three manufacturing disciplines occupy distinct spatial environments;
   collaboration and contract manufacturing follow as the two human
   disciplines that run through all of them. */

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title={
          <>
            Engineered capability, end to&nbsp;end.
          </>
        }
        lede="Five connected disciplines — one team, one standard of quality. Every capability exists to move your requirement from design intent to manufactured reality."
      />

      {/* the three manufacturing chambers (anchored) */}
      <EngineeringChambers withIds />

      {/* the two disciplines that run through everything */}
      <section id="engineering" className="scroll-mt-28 bg-bg-deep text-fg" aria-labelledby="collab-heading">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-20 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
          <Inview>
            <p className="label-mono !text-[0.62rem] text-accent">04</p>
            <h2 id="collab-heading" className="display-m mt-5 max-w-xl">
              Engineering — a collaboration, not a&nbsp;handoff.
            </h2>
            <p className="type-body measure mt-7 text-fg-muted">
              Our engineering and manufacturing teams collaborate directly
              with your team — from design through documentation to
              manufacturing — for cabling needs of any complexity.
            </p>
          </Inview>
          <Inview delay={140} className="flex flex-col justify-end">
            <div id="contract-manufacturing" className="scroll-mt-28 border-t border-line pt-10">
              <p className="label-mono !text-[0.62rem] text-accent">05</p>
              <h3 className="display-m mt-5 max-w-xl !text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)]">
                Contract manufacturing — build-to-print&nbsp;production.
              </h3>
              <p className="type-body measure mt-7 text-fg-muted">
                A complete build-to-print manufacturing partner for
                low-to-high volume cabling needs. ISO certified, with strict
                quality standards maintained throughout our manufacturing
                processes.
              </p>
              <ArrowLink href="/contact#quote-form" className="mt-9">
                Start the conversation
              </ArrowLink>
            </div>
          </Inview>
        </div>
      </section>

      {/* routing note */}
      <section className="theme-light bg-bg text-fg" aria-label="Where to begin">
        <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-between gap-x-16 gap-y-6 px-5 py-16 md:px-10 md:py-20">
          <p className="display-m max-w-2xl !text-[clamp(1.6rem,1.3rem+1.6vw,2.4rem)]">
            Not sure which discipline fits your&nbsp;requirement?
          </p>
          <Link href="/contact#quote-form" className="btn btn-primary !px-7 !py-4">
            Describe it to our engineers
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
