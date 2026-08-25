import Image from "next/image";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";

/* STRUCTURE BAND — physical evidence between the system map and the
   specification register. A horizontal transition crop of the one
   approved photograph at high magnification: jacket and connector
   detailing, presented without any treatment. The band sits on white
   so it continues the applications chapter's paper and ends on a
   hairline where the warm register ground begins. */

export function EdgeBand() {
  return (
    <figure data-probe="edge-band">
      <div className="band-structure">
        <Image
          src={mtpTrunkAssembly}
          alt="Structural band view of the multi-fiber trunk cable assembly — jacket and connector detailing"
          sizes="100vw"
        />
      </div>
      <figcaption className="mx-auto flex max-w-[84rem] flex-wrap items-baseline justify-between gap-x-8 gap-y-2 px-5 pb-10 pt-4 md:px-10 md:pb-12">
        <span className="label-mono text-fg-faint">
          FIG. 03 — STRUCTURE
        </span>
        <span className="label-mono text-fg-faint">
          Multi-fiber trunk cable assembly · fiber optic family
        </span>
      </figcaption>
    </figure>
  );
}
