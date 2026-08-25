import Link from "next/link";
import Image from "next/image";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";

/* 01 — IDENTITY
   The wordmark is the brand signature: "Clear / Edge" terminated by
   the brand mark (blue square). Its baseline is the drawing's datum
   line — the signal trace runs from the square along the baseline,
   crosses the column gap and lands on the specimen plate, whose top
   border is mounted at exactly that height. Headline → trace → node
   → specimen: one controlled path, zero decoration. */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg text-fg" aria-labelledby="hero-heading">
      <div className="relative mx-auto grid max-w-[88rem] items-start gap-x-10 gap-y-14 px-5 pb-16 pt-32 md:px-10 md:pt-44 lg:min-h-[88svh] lg:grid-cols-[1.02fr_0.98fr] lg:gap-y-0 lg:pb-20">
        {/* identity */}
        <div className="relative">
          <p className="label-mono text-fg-faint rise-in" style={{ "--rise-delay": 0 } as React.CSSProperties}>
            Engineered connections. Real-world impact.
          </p>

          <h1 id="hero-heading" className="mt-9 select-none">
            <span
              aria-hidden="true"
              className="display-hero block rise-in"
              style={{ "--rise-delay": 90 } as React.CSSProperties}
            >
              Clear
            </span>
            <span
              aria-hidden="true"
              className="display-hero rise-in block lg:flex lg:items-baseline"
              style={{ "--rise-delay": 190 } as React.CSSProperties}
            >
              <span>Edge</span>
              <span data-probe="brand-square" className="mark-brand" aria-hidden="true" />
              {/* the signal trace — runs along the baseline to the plate */}
              <span
                aria-hidden="true"
                className="hero-trace ml-[0.09em] hidden h-px flex-grow bg-fg-faint/70 lg:block"
              />
              <span
                aria-hidden="true"
                className="hero-trace hero-trace-bridge relative -mr-[41px] hidden w-[41px] flex-none bg-fg-faint/70 lg:block"
              >
                <span
                  aria-hidden="true"
                  className="hero-node node-signal absolute right-[-3px] top-1/2 -translate-y-1/2"
                />
              </span>
              <span className="sr-only">ClearEdge Solutions</span>
            </span>
          </h1>

          <p
            className="type-lede measure mt-12 max-w-xl text-fg-muted rise-in"
            style={{ "--rise-delay": 320 } as React.CSSProperties}
          >
            Engineered connectivity between the requirement and the running
            system — high performance fiber optic and copper cabling systems
            and electro-mechanical assemblies, built around your requirements.
          </p>

          <div
            className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-5 rise-in"
            style={{ "--rise-delay": 430 } as React.CSSProperties}
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
        </div>

        {/* the specimen plate — mounted on the wordmark baseline */}
        <figure
          data-probe="plate"
          className="plate-drop relative rise-in"
          style={{ "--rise-delay": 300 } as React.CSSProperties}
        >
          <div className="plate reg-corners tech-grid bg-white px-7 py-7 text-fg-muted sm:px-10 sm:py-9">
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="label-mono text-fg-faint">FIG. 01</span>
              <span className="label-mono hidden text-fg-faint sm:block">
                REPRESENTATIVE ASSEMBLY
              </span>
            </figcaption>
            <div className="relative mt-7 flex items-center justify-center pb-4 pt-2">
              <Image
                src={mtpTrunkAssembly}
                alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="h-auto max-h-[380px] w-full object-contain lg:max-h-[420px]"
              />
            </div>
            <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-fg">
              Multi-fiber trunk cable assembly
              <span className="label-mono ml-3 font-medium text-fg-faint">
                FIBER OPTIC FAMILY
              </span>
            </p>
          </div>
        </figure>
      </div>

      {/* quiet technical metadata strip */}
      <div className="relative mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 pb-8 md:px-10">
        <p className="label-mono text-fg-faint">San Jose, California, USA</p>
        <p className="label-mono hidden text-fg-faint sm:block" aria-hidden="true">
          37.35°N — 121.95°W
        </p>
      </div>
    </section>
  );
}
