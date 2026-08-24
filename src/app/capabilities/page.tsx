import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { TechnicalLabel, ArrowLink } from "@/components/ui";
import { CapabilityRows } from "@/components/capability-rows";
import { CTASection } from "@/components/cta-section";
import { capabilities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Fiber optic cabling, copper cabling, electro-mechanical box build assemblies, engineering collaboration, and build-to-print contract manufacturing — ISO certified quality throughout.",
  alternates: { canonical: "/capabilities" },
};

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
        meta="05 CONNECTED DISCIPLINES"
      />

      {/* expanding technical rows */}
      <section className="theme-light bg-bg text-fg" aria-label="Capability inventory">
        <div className="mx-auto max-w-[84rem] px-5 py-16 md:px-10 lg:py-24">
          <Inview>
            <p className="label-mono mb-10 flex items-center gap-4 text-fg-faint" aria-hidden="true">
              <span>DISCIPLINE INDEX</span>
              <span className="h-[1px] flex-1 bg-line" />
              <span>EXPAND A ROW</span>
            </p>
          </Inview>
          <Inview delay={80}>
            <CapabilityRows capabilities={capabilities} />
          </Inview>
          <Inview delay={140}>
            <p className="mt-8 text-sm text-fg-muted">
              Not sure which discipline fits your requirement?{" "}
              <a href="/contact#quote-form" className="link-quiet">
                Describe it to our engineers
              </a>{" "}
              and we will route it.
            </p>
          </Inview>
        </div>
      </section>

      {/* engagement note */}
      <section className="bg-bg-deep text-fg" aria-labelledby="collab-heading">
        <div className="mx-auto grid max-w-[84rem] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1fr] lg:py-32">
          <Inview>
            <TechnicalLabel>How we engage</TechnicalLabel>
            <h2 id="collab-heading" className="type-display-m mt-6 max-w-xl">
              Collaboration is a capability&nbsp;too.
            </h2>
            <p className="type-body measure-tight mt-6 text-fg-muted">
              Our engineering and manufacturing teams collaborate with your
              team for design, documentation, and manufacturing of cabling
              needs — as a complete build-to-print manufacturing partner for
              low-to-high volume requirements.
            </p>
            <ArrowLink href="/contact#quote-form" className="mt-9">
              Start the conversation
            </ArrowLink>
          </Inview>
          <Inview delay={150} className="reveal-scale">
            <figure className="plate reg-corners p-8 md:p-10">
              <figcaption className="plate-head !mb-0">
                <span className="label-mono !text-[0.62rem] text-fg-faint">QUALITY STANDARD</span>
                <span className="label-mono !text-[0.62rem] text-fg-faint">NOTE 01</span>
              </figcaption>
              <p className="mt-6 text-sm leading-relaxed text-fg-muted">
                ISO certified manufacturing with strict quality standards
                maintained throughout our processes.
              </p>
              <p className="plate-note mt-6">▸ MAINTAINED FROM CONCEPT TO PRODUCTION</p>
            </figure>
          </Inview>
        </div>
      </section>

      <CTASection />
    </>
  );
}
