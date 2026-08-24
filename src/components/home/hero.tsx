import Link from "next/link";
import Image from "next/image";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";

/* 01 — IDENTITY
   The opening is architecture: CLEAR / EDGE set at building scale,
   one physical signal line crossing the composition and terminating
   at the approved trunk assembly — presented as a large physical
   artifact, not a card. Night ground. The line that starts here
   resolves at contact. */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg text-fg" aria-labelledby="hero-heading">
      {/* connection line — enters left, crosses the composition,
          lands on the artifact */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-8 470 H560 C640 470 660 430 760 430 H1006"
          stroke="var(--line-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M-8 470 H560 C640 470 660 430 760 430 H1006"
          stroke="var(--signal)"
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
          className="signal-pulse"
        />
        <circle cx="1006" cy="430" r="4" fill="var(--signal)" className="signal-dot" />
      </svg>

      <div className="relative mx-auto grid min-h-[92svh] max-w-[88rem] items-center gap-14 px-5 pb-16 pt-32 md:px-10 md:pt-40 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        {/* identity */}
        <div>
          <p className="label-mono text-fg-faint rise-in" style={{ "--rise-delay": 0 } as React.CSSProperties}>
            ClearEdge Solutions · San Jose, California
          </p>

          <h1 id="hero-heading" className="mt-8 select-none">
            <span
              aria-hidden="true"
              className="display-hero block rise-in"
              style={{ "--rise-delay": 80 } as React.CSSProperties}
            >
              Clear
            </span>
            <span
              aria-hidden="true"
              className="display-hero block rise-in"
              style={{ "--rise-delay": 180 } as React.CSSProperties}
            >
              Edge<span className="text-signal">.</span>
            </span>
            <span className="sr-only">ClearEdge Solutions</span>
          </h1>

          <p
            className="type-lede mt-10 max-w-xl text-fg-muted rise-in"
            style={{ "--rise-delay": 300 } as React.CSSProperties}
          >
            Engineered connectivity between the requirement and the running
            system — high performance fiber optic and copper cabling systems
            and electro-mechanical assemblies, built around your requirements.
          </p>

          <div
            className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-5 rise-in"
            style={{ "--rise-delay": 400 } as React.CSSProperties}
          >
            <Link href="/contact#quote-form" className="btn btn-primary">
              Request a quote
            </Link>
            <Link href="/products" className="text-link">
              Explore products
              <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 5h12M8 1l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>

        {/* the artifact */}
        <figure
          className="relative rise-in lg:-mr-[calc((100vw-88rem)/2-2.5rem)] xl:-mr-10"
          style={{ "--rise-delay": 260 } as React.CSSProperties}
        >
          <div className="overflow-hidden border border-line-strong bg-surface">
            <Image
              src={mtpTrunkAssembly}
              alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="text-sm font-medium">Multi-fiber trunk assembly</span>
            <span className="label-mono !text-[0.6rem] text-fg-faint">Fiber optic · approved photography</span>
          </figcaption>
        </figure>
      </div>

      {/* ground strip */}
      <div className="relative mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 pb-9 md:px-10">
        <p className="text-sm font-medium text-fg-muted">{`Your Partner For Connectivity.`}</p>
        <p className="label-mono !text-[0.62rem] text-fg-faint" aria-hidden="true">
          37.35°N 121.95°W
        </p>
      </div>
    </section>
  );
}
