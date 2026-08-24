import Link from "next/link";
import { Inview } from "@/components/inview";
import { SectionRule } from "@/components/ui";
import { productFamilies, industries } from "@/lib/site";

/* 04 — PRODUCTS
   Catalog index — full-width ledger rows, not cards. */

export function ProductDirectory() {
  return (
    <section id="products" className="theme-light bg-bg text-fg" aria-labelledby="directory-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
        <Inview>
          <SectionRule n="04" label="PRODUCTS — WHAT CLEAREDGE PRODUCES" meta="PRODUCT DIRECTORY / 03 FAMILIES" />
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <h2 id="directory-heading" className="type-display-m max-w-xl">
              Three families. One standard.
            </h2>
            <Link href="/products" className="text-link">
              Full Directory
              <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 5h12M8 1l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Inview>

        <ol className="mt-14 border-t border-line-strong">
          {productFamilies.map((family, i) => (
            <li key={family.id}>
              <Inview delay={i * 80}>
                <Link
                  href={`/products#${family.id}`}
                  aria-label={`${family.name} — open family dossier`}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-6 border-b border-line px-1 py-8 transition-colors duration-200 hover:bg-surface sm:gap-x-10 md:py-10"
                >
                  <span
                    aria-hidden="true"
                    className={`type-index !text-[clamp(2rem,1.4rem+3vw,4.25rem)] transition-colors duration-200 group-hover:text-accent ${
                      i === 0 ? "" : ""
                    }`}
                  >
                    {family.index}
                  </span>
                  <span className="min-w-0 pt-1">
                    <span className="type-title block transition-colors duration-200 group-hover:text-accent md:!text-[1.55rem]">
                      {family.name}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-fg-muted">
                      {family.tagline}. Engineered around your requirements rather than a fixed catalogue.
                    </span>
                    <span className="label-mono mt-5 hidden flex-wrap items-center gap-x-4 !text-[0.6rem] text-fg-faint sm:flex">
                      <span>Applications</span>
                      {family.applications.map((appId) => {
                        const ind = industries.find((x) => x.id === appId);
                        if (!ind) return null;
                        return (
                          <span key={appId} className="flex items-center gap-4">
                            <span aria-hidden="true" className="h-[1px] w-4 bg-line-strong" />
                            <span>{ind.name}</span>
                          </span>
                        );
                      })}
                    </span>
                  </span>
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 14 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className="mt-3 shrink-0 text-fg-faint transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-accent"
                  >
                    <path d="M0 5h12M8 1l4 4-4 4" />
                  </svg>
                </Link>
              </Inview>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
