import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { TechnicalLabel, ArrowLink, SectionIndex } from "@/components/ui";
import { CTASection } from "@/components/cta-section";
import { productFamilies, industries } from "@/lib/site";
import { CopperSchematic, BoxSchematic } from "@/components/glyphs";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ClearEdge Solutions product families — fiber optic cable assemblies, copper cable assemblies, and electro-mechanical box builds, engineered to your print in Silicon Valley.",
  alternates: { canonical: "/products" },
};

const figureCaptions: Record<string, string> = {
  "fiber-optic": "MULTI-FIBER TRUNK ASSEMBLY",
  "copper-cabling": "COPPER CABLE SYSTEMS",
  "electro-mechanical": "BOX BUILD INTEGRATION",
};

/* accent annotations close every plate */
const plateAnnotations: Record<string, string> = {
  "fiber-optic": "REPRESENTATIVE MULTI-FIBER ASSEMBLY",
  "copper-cabling": "CONFIGURED TO YOUR REQUIREMENT — SCHEMATIC REPRESENTATION",
  "electro-mechanical": "CONNECTIVITY INTEGRATED INTO COMPLETE SYSTEMS — SCHEMATIC REPRESENTATION",
};

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
        meta="PRODUCT FAMILIES / 03"
      />

      {/* directory */}
      <section className="theme-light bg-bg text-fg" aria-label="Product family directory">
        <div className="mx-auto max-w-[84rem] px-5 pt-12 md:px-10 lg:pt-16">
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-3">
            {productFamilies.map((family) => (
              <li key={family.id}>
                <a
                  href={`#${family.id}`}
                  aria-label={`${family.name} — jump to family dossier`}
                  className="group flex h-full flex-col justify-between gap-10 bg-bg p-6 transition-colors duration-200 hover:bg-surface md:p-7"
                >
                  <span className="flex items-center justify-between">
                    <span className="label-mono !text-[0.62rem] text-fg-faint transition-colors group-hover:text-accent">
                      FAMILY {family.index}
                    </span>
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 14 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className="text-fg-faint transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-accent"
                    >
                      <path d="M0 5h12M8 1l4 4-4 4" />
                    </svg>
                  </span>
                  <span>
                    <span className="type-title block transition-colors duration-200 group-hover:text-accent">
                      {family.name}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-fg-muted">
                      {family.tagline}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {productFamilies.map((family, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={family.id}
            id={family.id}
            className={`scroll-mt-24 ${
              dark ? "bg-bg-deep text-fg" : "theme-light bg-bg text-fg"
            }`}
            aria-labelledby={`${family.id}-heading`}
          >
            <div className="mx-auto max-w-[84rem] px-5 py-16 md:px-10 lg:py-28">
              <Inview>
                <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
                  {/* content */}
                  <div className={i % 2 === 1 ? "" : "lg:order-2"}>
                    <SectionIndex n={family.index} />
                    <p className="label-mono mt-2 !tracking-[0.16em] text-accent">
                      PRODUCT FAMILY {family.index}
                    </p>
                    <h2
                      id={`${family.id}-heading`}
                      className="type-display-m mt-4"
                    >
                      {family.name}
                    </h2>
                    <p className="type-body measure mt-6 text-fg-muted">
                      {family.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                      <span className="label-mono !text-[0.6rem] text-fg-faint">
                        Applications
                      </span>
                      {family.applications.map((appId) => {
                        const ind = industries.find((x) => x.id === appId);
                        if (!ind) return null;
                        return (
                          <Link
                            key={appId}
                            href={`/industries#${ind.id}`}
                            className="link-quiet text-sm"
                          >
                            {ind.name}
                          </Link>
                        );
                      })}
                    </div>

                    <ArrowLink
                      href={`/contact?capability=${family.id}#quote-form`}
                      className="mt-9"
                    >
                      Discuss this family
                    </ArrowLink>
                  </div>

                  {/* figure */}
                  <div className={i % 2 === 1 ? "" : "lg:order-1"}>
                    <Inview delay={120} className="reveal-scale">
                      <figure className="plate reg-corners p-4 md:p-6">
                        <figcaption className="plate-head">
                          <span className="label-mono !text-[0.62rem] text-fg-faint">
                            FIG. {family.index}
                          </span>
                          <span className="label-mono !text-[0.62rem] text-fg-faint">
                            {figureCaptions[family.id]}
                          </span>
                        </figcaption>
                        {family.id === "fiber-optic" ? (
                          <Image
                            src={mtpTrunkAssembly}
                            alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                            sizes="(max-width: 1024px) 100vw, 560px"
                            className="h-auto w-full object-contain pt-4"
                          />
                        ) : (
                          <div className="flex aspect-[320/200] items-center justify-center py-10 text-fg-muted md:py-14">
                            {family.id === "copper-cabling" ? (
                              <CopperSchematic className="h-auto w-full max-w-sm" />
                            ) : (
                              <BoxSchematic className="h-auto w-full max-w-sm" />
                            )}
                          </div>
                        )}
                        <p aria-hidden="true" className="plate-note mt-4 border-t border-line pt-4">
                          ▸ {plateAnnotations[family.id]}
                        </p>
                      </figure>
                    </Inview>
                  </div>
                </div>
              </Inview>
            </div>
          </section>
        );
      })}

      {/* quality standard */}
      <section className="theme-light bg-bg text-fg" aria-labelledby="quality-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
          <div className="grid items-center gap-10 border-t border-line pt-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Inview>
              <TechnicalLabel>Quality commitment</TechnicalLabel>
              <h2 id="quality-heading" className="type-display-m mt-6 max-w-xl">
                Built to demanding performance and quality&nbsp;standards.
              </h2>
              <p className="type-body measure-tight mt-6 text-fg-muted">
                Driven by engineering excellence and a customer first mindset,
                we deliver products that meet the most demanding performance
                and quality standards — from concept to production.
              </p>
            </Inview>
            <Inview delay={150}>
              <div className="plate reg-corners p-8 md:p-10">
                <p className="label-mono !text-[0.62rem] text-fg-faint">
                  QUALITY STANDARD
                </p>
                <p className="mt-6 text-sm leading-relaxed text-fg-muted">
                  ISO certified manufacturing with strict quality standards
                  maintained throughout our processes.
                </p>
                <p className="plate-note mt-6">▸ CONCEPT → PRODUCTION</p>
              </div>
            </Inview>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
