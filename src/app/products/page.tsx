import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { CTASection } from "@/components/cta-section";
import { ProductWorld } from "@/components/product-world";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ClearEdge Solutions product families — fiber optic cable assemblies, copper cable assemblies, and electro-mechanical box builds, engineered to your print in Silicon Valley.",
  alternates: { canonical: "/products" },
};

/* THE PRODUCT OBSERVATORY — one environment, three families.
   The selector changes the world around each selection; deep links
   (/products#fiber-optic …) land directly in the right environment. */

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={
          <>
            Connectivity products, built to your&nbsp;print.
          </>
        }
        lede="Three product families spanning the entire signal path — fiber optic, copper, and electro-mechanical assemblies, each engineered around your requirements rather than a fixed catalogue."
      />

      <section className="bg-bg text-fg" aria-label="Product families">
        <div className="mx-auto max-w-[84rem] px-5 pb-24 pt-4 md:px-10 md:pb-36">
          <ProductWorld />
        </div>
      </section>

      {/* quality statement */}
      <section className="bg-bg text-fg" aria-labelledby="quality-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 md:py-28">
          <Inview>
            <h2 id="quality-heading" className="display-l max-w-3xl">
              Built to demanding performance and quality&nbsp;standards.
            </h2>
            <p className="type-body measure mt-8 text-fg-muted">
              Driven by engineering excellence and a customer-first mindset,
              every family is delivered under ISO certified manufacturing
              with strict quality standards maintained throughout our
              processes — from concept to production.
            </p>
          </Inview>
        </div>
      </section>

      <CTASection />
    </>
  );
}
