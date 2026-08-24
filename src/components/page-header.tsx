import { Inview } from "@/components/inview";
import type { ReactNode } from "react";

/* Interior pages open with a quiet editorial statement —
   one annotation, one large sentence-case title, room to breathe. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-bg text-fg">
      <div className="relative mx-auto max-w-[84rem] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <Inview>
          <div className="flex items-center justify-between gap-6">
            <p className="label-mono text-fg-faint">{eyebrow}</p>
            {meta ? (
              <span
                className="label-mono hidden !text-[0.62rem] text-fg-faint sm:block"
                aria-hidden="true"
              >
                {meta}
              </span>
            ) : null}
          </div>
          <h1 className="display-l mt-7 max-w-4xl">{title}</h1>
          {lede ? <p className="type-lede measure mt-8 text-fg-muted">{lede}</p> : null}
        </Inview>
      </div>
    </section>
  );
}
