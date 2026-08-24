import Link from "next/link";
import Image from "next/image";
import { Inview } from "@/components/inview";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";

/* 01 — IDENTITY
   White paper. The wordmark dominates; a single drawn signal line
   travels from the typography to the product specimen — engineering
   → connection → product. The approved assembly is presented as a
   documented specimen on an engineering plate, not as merchandise. */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg text-fg" aria-labelledby="hero-heading">
      {/* the connection line — drawn once on arrival */}
      <Inview
        variant="draw"
        className="pointer-events-none absolute inset-0 hidden text-fg-faint lg:block"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          fill="none"
          className="block h-full w-full"
        >
          <path
            d="M540 336 H660 C700 336 706 372 752 372 H866"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
          <circle cx="872" cy="372" r="3.5" fill="#0092fc" stroke="none" pathLength={1} className="signal-dot" />
        </svg>
      </Inview>

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-16 px-5 pb-14 pt-32 md:px-10 md:pt-44 lg:min-h-[88svh] lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        {/* identity */}
        <div>
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
              className="display-hero block rise-in"
              style={{ "--rise-delay": 190 } as React.CSSProperties}
            >
              Edge<span className="text-signal">.</span>
            </span>
            <span className="sr-only">ClearEdge Solutions</span>
          </h1>

          <p
            className="type-lede measure mt-10 max-w-xl text-fg-muted rise-in"
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

        {/* the specimen plate */}
        <figure
          className="relative rise-in"
          style={{ "--rise-delay": 300 } as React.CSSProperties}
        >
          <div className="plate reg-corners tech-grid bg-white px-7 py-7 text-fg-muted sm:px-10 sm:py-9">
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="label-mono !text-[0.62rem] text-fg-faint">FIG. 01</span>
              <span className="label-mono hidden !text-[0.56rem] text-fg-faint sm:block">
                REPRESENTATIVE ASSEMBLY
              </span>
            </figcaption>
            <div className="relative mt-7 flex items-center justify-center pb-4 pt-2">
              <Image
                src={mtpTrunkAssembly}
                alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="h-auto max-h-[380px] w-full object-contain lg:max-h-[420px]"
              />
              {/* connector endpoint on the plate edge */}
              <span
                aria-hidden="true"
                className="absolute left-[-35px] top-1/2 hidden h-[7px] w-[7px] -translate-y-1/2 bg-signal lg:block"
              />
            </div>
            <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-fg">
              Multi-fiber trunk cable assembly
              <span className="label-mono ml-3 !text-[0.58rem] font-medium text-fg-faint">
                FIBER OPTIC FAMILY
              </span>
            </p>
          </div>
        </figure>
      </div>

      {/* quiet technical metadata strip */}
      <div className="relative mx-auto flex max-w-[88rem] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 pb-8 md:px-10">
        <p className="label-mono !text-[0.6rem] text-fg-faint">San Jose, California, USA</p>
        <p className="label-mono hidden !text-[0.58rem] text-fg-faint sm:block" aria-hidden="true">
          37.35°N — 121.95°W
        </p>
      </div>
    </section>
  );
}
