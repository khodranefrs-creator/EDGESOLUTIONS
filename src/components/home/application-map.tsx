import Link from "next/link";
import { Inview } from "@/components/inview";
import { SectionRule } from "@/components/ui";
import { industries, familiesForIndustry, productFamilies } from "@/lib/site";

/* 05 — APPLICATION
   An application map: each industry is a destination, and the
   verified product-family relations are drawn as ledger lines. */

export function ApplicationMap() {
  return (
    <section className="bg-bg text-fg" aria-labelledby="application-map-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
        <Inview>
          <SectionRule n="05" label="APPLICATION — WHERE CAPABILITY MATTERS" meta="INDUSTRY → PRODUCT FAMILY" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 id="application-map-heading" className="type-display-m max-w-xl">
              Capabilities resolve into real&nbsp;environments.
            </h2>
            <p className="type-body measure max-w-md text-fg-muted lg:justify-self-end">
              Four technology-driven industries, each mapped to the product
              families that verifiably serve it.
            </p>
          </div>
        </Inview>

        <div className="mt-14 border-t border-line-strong">
          {industries.map((industry, i) => {
            const related = familiesForIndustry(industry.id);
            return (
              <Inview key={industry.id} delay={i * 60}>
                <article
                  id={industry.id}
                  aria-labelledby={`${industry.id}-h`}
                  className="group grid scroll-mt-28 gap-x-14 gap-y-6 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:py-11"
                >
                  {/* industry */}
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="label-mono !text-[0.62rem] text-accent">{industry.index}</span>
                      <h3
                        id={`${industry.id}-h`}
                        className="type-title !text-[1.35rem] transition-colors duration-200 group-hover:text-accent"
                      >
                        <Link href={`/industries#${industry.id}`}>{industry.name}</Link>
                      </h3>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
                      {industry.line}
                    </p>
                  </div>

                  {/* ledger of connected families */}
                  <ul className="self-center">
                    {related.map((family) => (
                      <li key={family.id} className="border-t border-line first:border-t-0">
                        <Link
                          href={`/products#${family.id}`}
                          className="flex items-baseline gap-4 py-2.5 text-sm text-fg-muted transition-colors hover:text-accent"
                        >
                          <span aria-hidden="true" className="label-mono !text-[0.6rem] text-fg-faint">↳</span>
                          <span>{family.name}</span>
                          <span aria-hidden="true" className="mx-1 min-w-6 flex-1 border-b border-dotted border-line-strong" />
                          <span className="label-mono !text-[0.58rem] text-fg-faint">
                            FAMILY {productFamilies.find((f) => f.id === family.id)?.index}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </Inview>
            );
          })}
        </div>

        <Inview delay={120}>
          <p className="mt-8 text-sm text-fg-muted">
            Every family is backed by the same engineering and build-to-print
            manufacturing discipline.{" "}
            <Link href="/capabilities" className="link-quiet">
              Review the disciplines
            </Link>
          </p>
        </Inview>
      </div>
    </section>
  );
}
