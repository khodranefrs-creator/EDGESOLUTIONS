import Link from "next/link";
import Image from "next/image";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";

/* 01 — SIGNAL
   Cinematic engineering statement. Left: the typographic claim.
   Right: the approved T&S asset presented as a specimen on a
   technical plate. A thin signal conductor runs headline →
   artifact → next section; reduced-motion users receive the
   static conductor only. */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg text-fg" aria-labelledby="hero-heading">
      <div className="bp-grid absolute inset-0" aria-hidden="true" />

      {/* signal conductor — headline → artifact → next section */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 1200 760"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          className="conductor-base"
          d="M32 600 H340 A8 8 0 0 0 348 592 V256 A8 8 0 0 1 356 248 H952 L1032 328 V760"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="conductor-pulse"
          d="M32 600 H340 A8 8 0 0 0 348 592 V256 A8 8 0 0 1 356 248 H952 L1032 328 V760"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="conductor-pulse conductor-pulse-2"
          d="M32 600 H340 A8 8 0 0 0 348 592 V256 A8 8 0 0 1 356 248 H952 L1032 328 V760"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative mx-auto grid max-w-[84rem] gap-14 px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
        {/* statement */}
        <div>
          <p className="label-mono flex flex-wrap items-center gap-x-4 gap-y-2 text-fg-faint hero-rise" style={{ "--hero-delay": 0 } as React.CSSProperties}>
            <span className="text-accent">ClearEdge Solutions</span>
            <span aria-hidden="true" className="h-[1px] w-8 bg-line-strong" />
            <span>San Jose, California</span>
          </p>

          <h1
            id="hero-heading"
            className="type-hero mt-8 hero-rise"
            style={{ "--hero-delay": 90 } as React.CSSProperties}
          >
            Engineered for the connection&nbsp;between.
          </h1>

          <p
            className="type-lede measure mt-8 max-w-xl text-fg-muted hero-rise"
            style={{ "--hero-delay": 180 } as React.CSSProperties}
          >
            ClearEdge Solutions designs and manufactures high performance
            fiber optic and copper cabling systems and electro-mechanical
            assemblies — built around your requirements, not a catalogue.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 hero-rise"
            style={{ "--hero-delay": 260 } as React.CSSProperties}
          >
            <Link href="/contact#quote-form" className="btn btn-primary">
              Request a Quote
            </Link>
            <Link href="/products" className="text-link">
              Explore Products
              <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 5h12M8 1l4 4-4 4" />
              </svg>
            </Link>
          </div>

          <p
            aria-hidden="true"
            className="label-mono mt-14 hidden !text-[0.62rem] text-fg-faint sm:flex items-center gap-4 hero-rise"
            style={{ "--hero-delay": 340 } as React.CSSProperties}
          >
            <span>Fiber Optic</span>
            <span className="h-[1px] w-6 bg-line-strong" />
            <span>Copper</span>
            <span className="h-[1px] w-6 bg-line-strong" />
            <span>Electro-Mechanical</span>
          </p>
        </div>

        {/* artifact */}
        <figure className="plate reg-corners p-5 md:p-6 hero-rise" style={{ "--hero-delay": 220 } as React.CSSProperties}>
          <figcaption className="plate-head">
            <span className="label-mono !text-[0.62rem] text-fg-faint">FIG. 01</span>
            <span className="label-mono !text-[0.62rem] text-fg-faint">APPROVED ASSET</span>
          </figcaption>
          <Image
            src={mtpTrunkAssembly}
            alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
            priority
            sizes="(max-width: 1024px) 100vw, 520px"
            className="h-auto w-full object-contain pt-4"
          />
          <div className="plate-foot mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="label-mono !text-[0.68rem] !tracking-[0.16em] text-fg">
              MULTI-FIBER TRUNK ASSEMBLY
            </span>
            <span className="label-mono !text-[0.62rem] text-accent">
              CLEAREDGE / PRODUCT FAMILY&nbsp;01
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
