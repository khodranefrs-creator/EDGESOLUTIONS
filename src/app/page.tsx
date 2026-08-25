import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ConnectionStatement } from "@/components/home/connection-statement";
import { ProductObservatory } from "@/components/product-observatory";
import { EngineeringChambers } from "@/components/engineering-chambers";
import { EdgeField } from "@/components/edge-field";
import { Confidence } from "@/components/home/confidence";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Homepage as one continuous connection — the signal enters at the
   hero and resolves at contact. Seven movements:
   01 IDENTITY · 02 THE CONNECTION · 03 PRODUCTS · 04 ENGINEERING
   05 APPLICATIONS · 06 CONFIDENCE · 07 CONTACT                    */

export default function HomePage() {
  return (
    <>
      {/* 01 — identity */}
      <Hero />

      {/* 02 — the connection */}
      <ConnectionStatement />

      {/* 03 — products */}
      <section
        id="products"
        aria-labelledby="home-products-heading"
        className="scroll-mt-20 bg-bg text-fg"
      >
        <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="home-products-heading" className="display-functional mt-6 max-w-3xl">
              Three families. One connection
              infrastructure.
            </h2>
            <p className="label-mono hidden pb-2 !text-[0.58rem] text-fg-faint sm:block" aria-hidden="true">
              CATALOG — 03 FAMILIES
            </p>
          </div>

          <ProductObservatory />
        </div>
      </section>

      {/* 04 — engineering */}
      <section
        id="engineering"
        aria-labelledby="home-engineering-heading"
        className="theme-dark scroll-mt-20 bg-bg-deep text-fg"
      >
        <div className="mx-auto max-w-[84rem] px-5 pb-14 pt-24 md:px-10 md:pb-16 md:pt-36">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="home-engineering-heading" className="display-functional max-w-3xl">
              Every discipline has its own&nbsp;behavior.
            </h2>
            <p className="label-mono hidden pb-2 !text-[0.58rem] text-fg-faint sm:block" aria-hidden="true">
              DISCIPLINES — 05
            </p>
          </div>
        </div>
        <EngineeringChambers />
      </section>

      {/* 05 — applications */}
      <section
        id="applications"
        aria-labelledby="home-applications-heading"
        className="scroll-mt-20 bg-bg text-fg"
      >
        <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="home-applications-heading" className="display-l max-w-2xl">
              Where the connections&nbsp;go.
            </h2>
            <p className="label-mono max-w-xs pb-2 !text-[0.6rem] leading-relaxed text-fg-faint">
              HOVER TO TRACE A RELATION · CLICK TO PIN IT
            </p>
          </div>

          <div className="mt-16 md:mt-20">
            <EdgeField />
          </div>
        </div>
      </section>

      {/* 06 — confidence */}
      <Confidence />

      {/* 07 — contact */}
      <CTASection id="contact" />
    </>
  );
}
