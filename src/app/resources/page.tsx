import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "ClearEdge Solutions resources — product catalog, engineering capabilities, industries served, request a quote, and company documents.",
  alternates: { canonical: "/resources" },
};

const entries = [
  {
    index: "01",
    title: "Product catalog",
    body: "The full range — fiber optic assemblies, copper cabling systems, and electro-mechanical builds — documented family by family.",
    href: "/products",
  },
  {
    index: "02",
    title: "Engineering capabilities",
    body: "The five disciplines behind every build, from design collaboration through build-to-print contract manufacturing.",
    href: "/capabilities",
  },
  {
    index: "03",
    title: "Industries served",
    body: "Where ClearEdge connections operate — data centers, semiconductor equipment, automotive, and clean energy systems.",
    href: "/industries",
  },
  {
    index: "04",
    title: "Request a quote",
    body: "Send drawings, volumes, timelines — or just the problem. The inquiry form routes directly to the engineering team.",
    href: "/contact#quote-form",
  },
  {
    index: "05",
    title: "Company profile",
    body: "Who ClearEdge is, how the company works, and the principles it engineers by.",
    href: "/about",
  },
  {
    index: "06",
    title: "Privacy policy",
    body: "How information submitted through this site is collected and used.",
    href: "/privacy",
  },
  {
    index: "07",
    title: "Terms of use",
    body: "The terms that govern use of this website.",
    href: "/terms",
  },
];

/* RESOURCES — a plain register.
   Everything the site holds worth reaching directly, set as one
   ordered list. No tiles, no thumbnails — an index of the document. */

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={
          <>
            The complete&nbsp;index.
          </>
        }
        lede="Everything on this site worth reaching directly — catalog, capabilities, applications, and documents — gathered in one register."
      />

      <section className="bg-bg text-fg" aria-label="Resource index">
        <div className="mx-auto max-w-[84rem] px-5 pb-24 pt-4 md:px-10 md:pb-36">
          <Inview>
            <ol className="border-t border-line-strong">
              {entries.map((entry) => (
                <li key={entry.index} className="border-b border-line">
                  <Link
                    href={entry.href}
                    className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-7 sm:gap-x-10 md:py-9"
                    aria-label={`${entry.title} — open`}
                  >
                    <span className="label-mono w-10 shrink-0 !text-[0.62rem] text-signal-deep">
                      {entry.index}
                    </span>
                    <span>
                      <span className="block font-display text-[clamp(1.35rem,1.1rem+1.6vw,2.2rem)] font-semibold leading-tight tracking-tight transition-colors duration-200 group-hover:text-accent">
                        {entry.title}
                      </span>
                      <span className="mt-1 block max-w-xl text-sm leading-relaxed text-fg-muted">
                        {entry.body}
                      </span>
                    </span>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className="shrink-0 self-center text-accent transition-transform duration-200 group-hover:translate-x-1.5"
                    >
                      <path d="M0 8h17M11 1l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ol>
          </Inview>
        </div>
      </section>
    </>
  );
}
