export type MediaItem = {
  kind: "image" | "video";
  src: string;
  caption?: string;
  alt?: string;
};

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type ResearchInsight = {
  title: string;
  body: string;
};

export type Exploration = {
  title: string;
  body: string;
  media?: MediaItem;
};

export type Outcome = {
  title: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  client?: string;
  role?: string;
  year?: string;
  duration?: string;
  fields?: string[];
  externalUrl?: string;
  heroImage?: string;
  heroVideo?: string;
  behanceEmbedUrl?: string;
  overview?: string;
  problem?: string;
  process?: ProcessStep[];
  research?: ResearchInsight[];
  explorations?: Exploration[];
  solution?: string;
  solutionMedia?: MediaItem[];
  outcomes?: Outcome[];
  metrics?: Metric[];
  testimonial?: Testimonial;
  gallery?: MediaItem[];
};

export const ALL_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "process", label: "Process" },
  { id: "explorations", label: "Explorations" },
  { id: "solution", label: "Solution" },
  { id: "gallery", label: "Gallery" },
  { id: "outcomes", label: "Outcomes" },
  { id: "testimonial", label: "Testimonial" },
] as const;

export type SectionId = (typeof ALL_SECTIONS)[number]["id"];

export function getActiveSections(c: CaseStudy) {
  return ALL_SECTIONS.filter((s) => {
    switch (s.id) {
      case "overview":
        return Boolean(c.overview);
      case "problem":
        return Boolean(c.problem);
      case "research":
        return Boolean(c.research?.length);
      case "process":
        return Boolean(c.process?.length);
      case "explorations":
        return Boolean(c.explorations?.length);
      case "solution":
        return Boolean(c.solution || c.solutionMedia?.length);
      case "gallery":
        return Boolean(c.gallery?.length);
      case "outcomes":
        return Boolean(c.outcomes?.length || c.metrics?.length);
      case "testimonial":
        return Boolean(c.testimonial);
      default:
        return false;
    }
  });
}

export const BEHANCE_CASE_STUDY: CaseStudy = {
  slug: "ui-facelift-ux-enhancement",
  title: "Case Study — UI Facelift and UX Enhancement",
  client: "Miracle Eseurhobo",
  role: "Product Designer",
  year: "2025",
  fields: ["Product Design", "Web Design", "Website", "Figma", "Mobile App"],
  externalUrl:
    "https://www.behance.net/gallery/229327427/Case-Study-UI-Facelift-and-UX-Enhancement",
  behanceEmbedUrl: "https://www.behance.net/embed/project/229327427?ilo0=1",
  gallery: [
    {
      kind: "image",
      src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/6ade91229327427.6862eb2347e4a.png",
      alt: "UI facelift case study cover",
    },
    {
      kind: "image",
      src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/99e7fd229327427.6862ec26d7b62.png",
      alt: "UI facelift case study detail",
    },
  ],
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  default: BEHANCE_CASE_STUDY,
};

export function getCaseStudy(_slug: string | undefined): CaseStudy {
  return BEHANCE_CASE_STUDY;
}
