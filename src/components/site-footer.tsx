import Link from "next/link";
import Image from "next/image";
import { company, navItems, productFamilies, capabilities, industries } from "@/lib/site";
import mainlogo from "@/assets/mainlogo.png";

/* Technical colophon — the final sheet of the document. */

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark border-t border-line/50 bg-bg-deep text-fg">
      <div className="mx-auto max-w-[84rem] px-5 pb-12 pt-16 md:px-10 md:pt-20">
        {/* identity */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-20">
          <div>
            <Link href="/" aria-label="ClearEdge Solutions — home" className="inline-flex">
              <span className="nameplate">
                <Image
                  src={mainlogo}
                  alt="ClearEdge Solutions"
                  sizes="130px"
                  className="h-11 w-auto"
                />
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fg-muted">
              Designer and manufacturer of high performance fiber optic and
              copper cabling systems, and electro-mechanical assemblies.
            </p>
            <p className="label-mono mt-6 !text-[0.62rem] text-fg-faint">
              {company.slogan}
            </p>
          </div>

          {/* directory columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            <nav aria-label="Footer index">
              <h2 className="label-mono !text-[0.62rem] text-fg-faint">Index</h2>
              <ul className="mt-4 space-y-2.5">
                {[{ href: "/", label: "Home" }, ...navItems].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer product families">
              <h2 className="label-mono !text-[0.62rem] text-fg-faint">Families</h2>
              <ul className="mt-4 space-y-2.5">
                {productFamilies.map((f) => (
                  <li key={f.id}>
                    <Link
                      href={`/products#${f.id}`}
                      className="text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {f.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer disciplines">
              <h2 className="label-mono !text-[0.62rem] text-fg-faint">Disciplines</h2>
              <ul className="mt-4 space-y-2.5">
                {capabilities.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/capabilities#${c.id}`}
                      className="text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer applications">
              <h2 className="label-mono !text-[0.62rem] text-fg-faint">Applications</h2>
              <ul className="mt-4 space-y-2.5">
                {industries.map((ind) => (
                  <li key={ind.id}>
                    <Link
                      href={`/industries#${ind.id}`}
                      className="text-sm text-fg-muted transition-colors hover:text-accent"
                    >
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* direct lines */}
        <div className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <address className="flex flex-col gap-2 text-sm not-italic text-fg-muted sm:flex-row sm:flex-wrap sm:gap-x-10">
            <span>
              {company.address.street}, {company.address.city}, {company.address.state}{" "}
              {company.address.zip}, {company.address.country}
            </span>
            <a href={`tel:${company.phoneHref}`} className="font-medium text-fg transition-colors hover:text-accent">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="font-medium text-fg transition-colors hover:text-accent">
              {company.email}
            </a>
          </address>
          <Link href="/contact#quote-form" className="btn btn-primary w-fit !py-3 !text-[0.7rem]">
            Request a Quote
          </Link>
        </div>
      </div>

      {/* legal strip */}
      <div className="hairline-t">
        <div className="mx-auto flex max-w-[84rem] flex-col gap-3 px-5 py-6 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p className="flex items-center gap-6">
            <span className="label-mono hidden !text-[0.6rem] md:inline" aria-hidden="true">
              37.35° N — 121.95° W · SAN JOSE
            </span>
            <span className="flex gap-6">
              <Link href="/privacy" className="transition-colors hover:text-fg-muted">Privacy Policy</Link>
              <Link href="/terms" className="transition-colors hover:text-fg-muted">Terms</Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
