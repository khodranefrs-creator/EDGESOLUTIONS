/* Original abstract visualizations for The Connection Infrastructure.
   These are deliberately NOT product depictions — they are spatial
   compositions expressing how each family behaves as infrastructure.
   No specifications, no measurements, nothing unverifiable. */

type GlyphProps = { className?: string };

/* Copper: dense structured geometry — conductors laying across each
   other in an ordered bundle, one strand carrying the signal. */
export function CopperComposition({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 640 480" fill="none" className={className} aria-hidden="true" shapeRendering="geometricPrecision">
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.5">
        <path d="M40 120C160 120 180 168 320 168s160-48 280-48" />
        <path d="M40 176c120 0 140 44 280 44s160-44 280-44" />
        <path d="M40 232h240c56 0 64 36 128 36h192" />
        <path d="M40 288c96 0 112-40 208-40h112c72 0 88 52 240 52" />
        <path d="M40 344c120 0 148 40 268 40s132-24 292-24" opacity="0.7" />
      </g>
      {/* insulation sheaths entering from the left */}
      <g stroke="currentColor" strokeWidth="1.25">
        <rect x="24" y="104" width="34" height="30" />
        <rect x="24" y="158" width="34" height="30" />
        <rect x="24" y="216" width="34" height="30" />
        <rect x="24" y="272" width="34" height="30" />
        <rect x="24" y="330" width="34" height="30" />
      </g>
      {/* termination block on the right */}
      <rect x="584" y="96" width="34" height="290" stroke="currentColor" strokeWidth="1.25" />
      <path d="M600 118v246M592 130v222" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* the signal strand */}
      <path
        d="M40 232h240c56 0 64 36 128 36h192"
        stroke="#0092fc"
        strokeWidth="1.75"
      />
      <circle cx="601" cy="268" r="4" fill="#0092fc" />
    </svg>
  );
}

/* Electro-mechanical: box / assembly / modular geometry — a chassis,
   plug-in modules on rails, ports, and an internal harness. */
export function BoxComposition({ className = "" }: GlyphProps) {
  return (
    <svg viewBox="0 0 640 480" fill="none" className={className} aria-hidden="true" shapeRendering="geometricPrecision">
      {/* chassis */}
      <rect x="92" y="72" width="456" height="336" stroke="currentColor" strokeWidth="1.5" />
      {/* module rails */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.45">
        <path d="M116 136h408M116 224h408M116 312h408" />
      </g>
      {/* plug-in modules at different depths of insertion */}
      <rect x="140" y="98" width="150" height="38" stroke="currentColor" strokeWidth="1.25" />
      <rect x="310" y="186" width="190" height="38" stroke="currentColor" strokeWidth="1.25" />
      <rect x="140" y="274" width="106" height="38" stroke="currentColor" strokeWidth="1.25" />
      <rect x="398" y="274" width="102" height="38" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
      {/* connector ports along the face */}
      <g stroke="currentColor" strokeWidth="1.25">
        <rect x="140" y="352" width="26" height="20" />
        <rect x="178" y="352" width="26" height="20" />
        <rect x="216" y="352" width="26" height="20" />
      </g>
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.55">
        <rect x="430" y="352" width="70" height="20" />
      </g>
      {/* internal harness between modules and ports */}
      <path
        d="M215 117c60 0 40 88 95 88M500 205c-40 40-90 10-140 50s-80 78-124 92"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="3 5"
      />
      {/* the live connection */}
      <rect x="310" y="186" width="190" height="38" stroke="#0092fc" strokeWidth="1.75" fill="none" />
      <circle cx="405" cy="205" r="4" fill="#0092fc" />
    </svg>
  );
}
