import { Inview } from "@/components/inview";

/* CONDUCTOR SYSTEM v2 — seams.
   The site is one continuous document; a seam is the junction
   where the signal crosses between two sheets. Square accent
   junction at the left content margin, one graduated hairline
   run, terminal square + destination index at the right.
   Drawn once on entry; static without JS or motion. */

export function ConductorSeam({
  to,
  theme = "dark",
}: {
  to: string;
  theme?: "dark" | "light" | "deep";
}) {
  const bg =
    theme === "light"
      ? "theme-light bg-bg text-fg"
      : theme === "deep"
        ? "bg-bg-deep text-fg"
        : "bg-bg text-fg";

  return (
    <div aria-hidden="true" className={`${bg} relative`}>
      <div className="mx-auto flex max-w-[84rem] items-center gap-4 px-5 py-3 md:gap-5 md:px-10">
        {/* junction — where the previous sheet hands off */}
        <span className="h-[7px] w-[7px] shrink-0 bg-accent" />

        {/* graduated run */}
        <Inview variant="draw" threshold={0.5} className="min-w-0 flex-1">
          <svg
            viewBox="0 0 1000 6"
            preserveAspectRatio="none"
            fill="none"
            className="block h-[7px] w-full text-line-strong"
          >
            <line
              x1="0"
              y1="3"
              x2="1000"
              y2="3"
              stroke="currentColor"
              strokeWidth="1"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            <line x1="120" y1="0" x2="120" y2="6" stroke="currentColor" strokeWidth="1" pathLength={1} vectorEffect="non-scaling-stroke" opacity="0.55" />
            <line x1="400" y1="0" x2="400" y2="6" stroke="currentColor" strokeWidth="1" pathLength={1} vectorEffect="non-scaling-stroke" opacity="0.55" />
            <line x1="680" y1="0" x2="680" y2="6" stroke="currentColor" strokeWidth="1" pathLength={1} vectorEffect="non-scaling-stroke" opacity="0.55" />
            <line x1="920" y1="0" x2="920" y2="6" stroke="currentColor" strokeWidth="1" pathLength={1} vectorEffect="non-scaling-stroke" opacity="0.55" />
          </svg>
        </Inview>

        {/* destination index */}
        <span className="label-mono shrink-0 !text-[0.56rem] whitespace-nowrap text-fg-faint">
          ▸ {to}
        </span>

        {/* terminal */}
        <span className="h-[7px] w-[7px] shrink-0 border border-line-strong" />
      </div>
    </div>
  );
}
