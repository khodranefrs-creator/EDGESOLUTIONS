export const company = {
  name: "ClearEdge Solutions, Inc.",
  shortName: "ClearEdge",
  slogan: "Your Partner For Connectivity",
  url: "https://www.clearedgesolutions.com",
  address: {
    street: "1020 Rock Ave",
    city: "San Jose",
    state: "CA",
    zip: "95131",
    country: "United States",
  },
  phone: "(408) 649-3435",
  phoneHref: "+14086493435",
  email: "info@ClearEdgeSolutions.com",
} as const;

/* Primary navigation order per the Connectivity Architecture IA.
   Products carries the mega-directory trigger in the desktop header. */
export const navItems = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Product families — verified outputs of the three manufacturing      */
/* disciplines. ids match capability ids so /contact?capability=       */
/* deep links stay valid.                                              */
/* ------------------------------------------------------------------ */

export type ProductFamily = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  applications: string[];
};

export const productFamilies: ProductFamily[] = [
  {
    id: "fiber-optic",
    index: "01",
    name: "Fiber Optic Cable Assemblies",
    shortName: "Fiber Optic",
    tagline: "High-performance optical pathways",
    description:
      "High performance fiber optic cabling systems, engineered to meet exact performance requirements for technology-driven applications — from single assemblies to complete engineered runs.",
    applications: ["data-centers", "semiconductor-equipment"],
  },
  {
    id: "copper-cabling",
    index: "02",
    name: "Copper Cable Assemblies",
    shortName: "Copper",
    tagline: "Reliable copper infrastructure",
    description:
      "Copper cabling systems designed and manufactured for reliability — built around each customer’s configuration and design requirements rather than a fixed catalogue.",
    applications: ["data-centers", "automotive"],
  },
  {
    id: "electro-mechanical",
    index: "03",
    name: "Electro-Mechanical Box Builds",
    shortName: "Electro-Mechanical",
    tagline: "Integrated box-build capability",
    description:
      "Electro-mechanical box build assemblies that integrate connectivity into complete systems — integrated, assembled, and finished to the standards critical applications demand.",
    applications: ["semiconductor-equipment", "clean-energy"],
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities — the five connected disciplines                       */
/* ------------------------------------------------------------------ */

export type Capability = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  familyIds?: string[];
};

export const capabilities: Capability[] = [
  {
    id: "fiber-optic",
    index: "01",
    name: "Fiber Optic",
    tagline: "High-performance optical pathways",
    description:
      "High performance fiber optic cabling systems, engineered to meet exact performance requirements for technology-driven applications.",
    familyIds: ["fiber-optic"],
  },
  {
    id: "copper-cabling",
    index: "02",
    name: "Copper Cabling",
    tagline: "Reliable copper infrastructure",
    description:
      "Copper cabling systems designed and manufactured for reliability, built around each customer’s configuration and design requirements.",
    familyIds: ["copper-cabling"],
  },
  {
    id: "electro-mechanical",
    index: "03",
    name: "Electro-Mechanical Assemblies",
    tagline: "Integrated box-build capability",
    description:
      "Electro-mechanical box build assemblies — integrated, assembled, and finished to the standards your most critical applications demand.",
    familyIds: ["electro-mechanical"],
  },
  {
    id: "engineering",
    index: "04",
    name: "Engineering",
    tagline: "A collaboration, not a handoff",
    description:
      "Our engineering and manufacturing teams collaborate directly with your team — from design through documentation to manufacturing — for cabling needs of any complexity.",
    familyIds: ["fiber-optic", "copper-cabling", "electro-mechanical"],
  },
  {
    id: "contract-manufacturing",
    index: "05",
    name: "Contract Manufacturing",
    tagline: "Build-to-print production",
    description:
      "A complete build-to-print manufacturing partner for low-to-high volume cabling needs. ISO certified, with strict quality standards maintained throughout our manufacturing processes.",
    familyIds: ["fiber-optic", "copper-cabling", "electro-mechanical"],
  },
];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export type Industry = {
  id: string;
  index: string;
  name: string;
  line: string;
};

export const industries: Industry[] = [
  {
    id: "data-centers",
    index: "01",
    name: "Data Centers",
    line: "Reliable, high-performance connectivity for the environments where uptime is everything.",
  },
  {
    id: "semiconductor-equipment",
    index: "02",
    name: "Semiconductor Equipment",
    line: "Precision assemblies built for equipment where accuracy and repeatability are critical.",
  },
  {
    id: "automotive",
    index: "03",
    name: "Automotive",
    line: "Connectivity and assembly solutions engineered around demanding automotive applications.",
  },
  {
    id: "clean-energy",
    index: "04",
    name: "Clean Energy",
    line: "Dependable connectivity that supports the systems powering a cleaner grid.",
  },
];

/* Derived relation: which product families verifiably serve an industry */
export const familiesForIndustry = (industryId: string) =>
  productFamilies.filter((f) => f.applications.includes(industryId));

/* ------------------------------------------------------------------ */
/* Differentiators — supplied positioning                              */
/* ------------------------------------------------------------------ */

export const differentiators = [
  { term: "Precision Engineering", note: "Exactness as a default, not an option" },
  { term: "Customer-Focused Design", note: "Built around your requirements" },
  { term: "Complex Customized Builds", note: "Efficiency and precision at high complexity" },
  { term: "Diverse Configurations", note: "Managed without compromise" },
  { term: "Smaller Production Volumes", note: "Where others see overhead, we see detail" },
  { term: "Agility", note: "Responsive to change" },
  { term: "Technical Excellence", note: "Engineering depth across every build" },
  { term: "Reliability", note: "Trusted quality, consistently delivered" },
  { term: "Responsive Service", note: "A partner that answers" },
  { term: "Scalability", note: "Solutions that grow with your needs" },
] as const;

/* ------------------------------------------------------------------ */
/* Engineering-to-production sequence                                  */
/* ------------------------------------------------------------------ */

export type FlowStep = {
  id: string;
  step: string;
  name: string;
  line: string;
};

export const flowSteps: FlowStep[] = [
  {
    id: "design",
    step: "01",
    name: "Design",
    line: "We collaborate with your team from the first requirement forward.",
  },
  {
    id: "documentation",
    step: "02",
    name: "Documentation",
    line: "Clear, controlled documentation defines exactly what gets built.",
  },
  {
    id: "engineering",
    step: "03",
    name: "Engineering",
    line: "Engineering and manufacturing work as one discipline.",
  },
  {
    id: "assembly",
    step: "04",
    name: "Assembly",
    line: "Complex customized builds handled with efficiency and precision.",
  },
  {
    id: "manufacturing",
    step: "05",
    name: "Manufacturing",
    line: "Build-to-print production — low to high volume, quality throughout.",
  },
];
