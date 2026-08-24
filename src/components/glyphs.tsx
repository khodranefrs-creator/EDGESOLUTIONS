/* Original technical glyphs for The Connectivity Architecture.
   One line grammar throughout: 1.5px strokes, square junctions,
   a single signal-blue node where a connection lands. */

type GlyphProps = { className?: string };

export function SourceGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="6" y="17" width="14" height="14" />
      <path d="M20 24h16" />
      <path d="M36 18v12" />
      <circle cx="36" cy="24" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FiberGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M4 16h18l8 8h14" />
      <path d="M4 24h18l6 6h16" />
      <path d="M4 32h18l-4 4" opacity="0.45" />
      <circle cx="44" cy="30" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CopperGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="4" y="19" width="9" height="10" />
      <rect x="35" y="19" width="9" height="10" />
      <path d="M13 22c6 0 6 4 11 4s5-4 11-4" />
      <path d="M13 27c6 0 6-4 11-4s5 4 11 4" />
      <circle cx="39.5" cy="24" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ElectroGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="7" y="7" width="34" height="34" />
      <path d="M13 15h9M13 21h9M13 27h9" />
      <path d="M31 33V19" />
      <circle cx="31" cy="33" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ApplicationGlyph({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="3.5" />
      <path d="M24 20.5V8M26.5 26l10 10M21.5 26l-10 10M27.5 22.5 38 17" />
    </svg>
  );
}

/* ---- schematic drawings for product plates (clearly diagrams,
       never stand-in photography) -------------------------------- */

export function CopperSchematic({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 320 200" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true">
      <rect x="18" y="58" width="52" height="84" rx="1" />
      <path d="M28 74h32M28 88h32M28 102h32M28 116h32" opacity="0.5" />
      <path d="M70 78c40 0 60 10 90 10s50-10 90-10" />
      <path d="M70 100c40 0 60-8 90-8s50 8 90 8" />
      <path d="M70 122c40 0 60 6 90 6s50-6 90-6" opacity="0.55" />
      <rect x="250" y="58" width="52" height="84" rx="1" />
      <path d="M260 74h32M260 88h32M260 102h32M260 116h32" opacity="0.5" />
      <circle cx="160" cy="110" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BoxSchematic({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 320 200" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true">
      <path d="M96 42l64-22 96 26v96l-96 34-64-22z" />
      <path d="M96 42l96 26 64-22" opacity="0.6" />
      <path d="M192 68v108" opacity="0.35" />
      <rect x="118" y="86" width="46" height="12" />
      <rect x="118" y="106" width="46" height="12" opacity="0.55" />
      <path d="M164 92h56" />
      <path d="M220 92v34" opacity="0.6" />
      <circle cx="164" cy="92" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
