import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { ArrowLink, TechnicalLabel } from "@/components/ui";
import { ConductorSeam } from "@/components/conductor";
import { CTASection } from "@/components/cta-section";
import { productFamilies, industries } from "@/lib/site";
import { CopperSchematic, BoxSchematic, TrunkDropGlyph } from "@/components/glyphs";
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

/* Sheet 02 extra — verified build-to-print specification strip */
function SpecStrip() {
  const specs = [
    { k: "Configuration", v: "Built to your print" },
    { k: "Production", v: "Low to high volume" },
    { k: "Quality", v: "ISO certified processes" },
  ];
  return (
    <div className="mt-12 border-t border-line">
      <p className="type-caption mt-8">Build specification</p>
      <dl className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-3">
        {specs.map((s) => (
          <div key={s.k} className="bg-bg p-5 md:p-6">
            <dt className="label-mono !text-[0.58rem] text-fg-faint">{s.k}</dt>
            <dd className="mt-2 text-sm font-medium">{s.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* Sheet 03 extra — the integration discipline as a checklist */
function IntegrationList() {
  const entries = [
    { n: "01", t: "Integrated", d: "Connectivity built into complete systems." },
    { n: "02", t: "Assembled", d: "Complex customized builds handled with efficiency and precision." },
    { n: "03", t: "Finished", d: "Completed to the standards critical applications demand." },
  ];
  return (
    <div className="mt-12 border-t border-line">
      <p className="type-caption mt-8">Integration sequence</p>
      <ul className="mt-4 border-t border-line-strong">
        {entries.map((e) => (
          <li key={e.n} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line py-4">
            <span className="label-mono shrink-0 !text-[0.6rem] text-accent">{e.n}</span>
            <span className="w-28 shrink-0 text-sm font-medium">{e.t}</span>
            <span className="text-sm text-fg-muted">{e.d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Sheet 01 extra — trunk-and-drop topology drawing */
function TrunkFigure() {
  return (
    <figure className="mt-12 border-t border-line pt-8">
      <figcaption className="type-caption mb-4">
        Trunk-and-drop topology — schematic representation
      </figcaption>
      <Inview variant="draw" className="text-fg-muted">
        <TrunkDropGlyph className="h-auto w-full" />
      </Inview>
    </figure>
  );
}

const sheetExtras: Record<string, () => React.JSX.Element> = {
  "fiber-optic": TrunkFigure,
  "copper-cabling": SpecStrip,
  "electro-mechanical": IntegrationList,
};

export default function ProductsPage() {
  /* Each family renders as a dossier sheet; conductor seams between
     sheets keep the document continuous. */
  const content = productFamilies.flatMap((family, i) => {
    const dark = i % 2 === 1;
    const Extra = sheetExtras[family.id];
    const next = productFamilies[i + 1];

    const sheet = (
      <section
        key={family.id}
        id={family.id}
        className={`scroll-mt-24 ${
          dark ? "bg-bg-deep text-fg" : "theme-light bg-bg text-fg"
        }`}
        aria-labelledby={`${family.id}-heading`}
      >
        <div className="mx-auto max-w-[84rem] px-5 py-16 md:px-10 lg:py-28">
          {/* sheet header band */}
          <Inview>
            <header className="border-b border-line-strong pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <p className="label-mono !text-[0.62rem] !tracking-[0.3em] text-accent">
                  SHEET {family.index} / 03
                </p>
                <p className="label-mono hidden !text-[0.56rem] text-fg-faint sm:block" aria-hidden="true">
                  REV — · SCALE NTS · CLEAREDGE PRODUCT DOSSIER
                </p>
              </div>
              <h2 id={`${family.id}-heading`} className="type-display-m mt-4">
                {family.name}
              </h2>
            </header>
          </Inview>

          <Inview delay={80}>
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              {/* content */}
              <div className={i % 2 === 1 ? "" : "lg:order-2"}>
                <p className="type-body measure text-fg-muted">
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

          {/* per-sheet technical appendix */}
          <Extra />

          {/* sheet footer */}
          <footer className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line pt-5">
            <p className="label-mono !text-[0.56rem] text-fg-faint">
              {family.shortName} — Sheet {family.index}
            </p>
            <p className="label-mono !text-[0.56rem] text-fg-faint" aria-hidden="true">
              {next ? `Continue to sheet ${next.index} ▾` : "End of dossier"}
            </p>
          </footer>
        </div>
      </section>
    );

    if (!next) return [sheet];

    return [
      sheet,
      <ConductorSeam
        key={`${family.id}-seam`}
        to={`Sheet ${next.index} · ${next.shortName}`}
        theme={dark ? "dark" : "light"}
      />,
    ];
  });

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
        meta="PRODUCT DOSSIER / 03 SHEETS"
      />

      {/* sheet index */}
      <section className="theme-light bg-bg text-fg" aria-label="Dossier sheet index">
        <div className="mx-auto max-w-[84rem] px-5 pt-12 md:px-10 lg:pt-16">
          <p className="type-caption mb-6 flex items-center gap-4">
            <span>Index</span>
            <span aria-hidden="true" className="h-[1px] w-10 bg-line-strong" />
            <span>03 sheets</span>
          </p>
          <ol className="border-t border-line-strong">
            {productFamilies.map((family) => (
              <li key={family.id} className="border-b border-line">
                <a
                  href={`#${family.id}`}
                  aria-label={`${family.name} — jump to sheet ${family.index}`}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-5 sm:grid-cols-[7rem_1fr_auto]"
                >
                  <span className="label-mono !text-[0.62rem] text-accent">
                    Sheet {family.index}
                  </span>
                  <span className="flex min-w-0 items-baseline gap-4">
                    <span className="type-title !text-[1.15rem] transition-colors duration-200 group-hover:text-accent">
                      {family.name}
                    </span>
                    <span aria-hidden="true" className="mx-1 hidden min-w-10 flex-1 self-center border-b border-dotted border-line-strong sm:block" />
                  </span>
                  <span className="label-mono hidden !text-[0.58rem] text-fg-faint sm:block">
                    {family.applications.length} linked industries
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {content}

      {/* quality standard — appendix */}
      <section className="theme-light bg-bg text-fg" aria-labelledby="quality-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
          <div className="grid items-center gap-10 border-t border-line pt-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Inview>
              <TechnicalLabel>Appendix A — quality commitment</TechnicalLabel>
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
