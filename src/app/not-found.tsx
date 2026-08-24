import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-bg-deep text-fg">
      <div className="mx-auto flex min-h-[80svh] max-w-4xl flex-col items-start justify-center px-5 py-32 md:px-10">
        <p className="label-mono text-accent">Error 404</p>
        <h1 className="display-l mt-7">This pathway doesn&rsquo;t&nbsp;connect.</h1>
        <svg viewBox="0 0 320 20" fill="none" aria-hidden="true" className="mt-10 block h-5 w-full max-w-md text-fg-faint">
          <line x1="0" y1="10" x2="140" y2="10" stroke="currentColor" strokeWidth="1" />
          <rect x="150" y="4" width="12" height="12" stroke="#0092fc" strokeWidth="1.25" />
          <line x1="172" y1="10" x2="320" y2="10" stroke="currentColor" strokeWidth="1" />
        </svg>
        <p className="type-body measure mt-9 max-w-md text-fg-muted">
          The page you&rsquo;re looking for was moved, removed, or never
          existed. Let&rsquo;s route you back to solid ground.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
