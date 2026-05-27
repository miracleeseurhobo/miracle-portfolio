import { Reveal } from "@/components/Reveal";

const ASSET = (path: string) => `${import.meta.env.BASE_URL}${path}`;

type Role = {
  company: string;
  title: string;
  period: string;
  description: string;
  logo?: string;
};

const ROLES: Role[] = [
  {
    company: "Lava source",
    title: "Independent Contractor",
    period: "2026 → Present",
    logo: ASSET("logos/icons/lavasource.svg"),
    description:
      "Led UX and visual design for a talent marketplace platform inspired by Toptal and Catalant. Designed premium network graph visualizations to communicate scale, trust, and expert connectivity. Created consultant discovery and card interfaces for company and client-facing experiences, and built cohesive visual systems across marketing pages using Figma and modern SaaS design principles.",
  },
  {
    company: "Quely (Formerly Rally)",
    title: "Lead Designer",
    period: "Apr 2023 → Present",
    logo: ASSET("logos/icons/quely.svg"),
    description:
      "Reduced internal design review meeting time by 35% by shifting feedback and approvals into structured async workflows. Improved visibility and traceability of product decisions across design, product, and engineering teams.",
  },
  {
    company: "Rally",
    title: "UX Designer",
    period: "Apr 2023 → Pivot",
    logo: ASSET("logos/icons/quely.svg"),
    description:
      "Spearheaded user-centered pivot strategy by uncovering unmet needs and validating new concepts, boosting product adoption and engagement with growth-focused designs.",
  },
  {
    company: "AfriSplash",
    title: "Founding Designer — Open Source",
    period: "Jan 2023 → Apr 2023",
    description:
      "Collaborated with the design team to build a scalable design system used across squads of 20+ designers, improving design consistency and delivery speed. Identified key use cases for the forum ecosystem, designing wireframes and interaction flows that supported community engagement and discussion.",
  },
];

export function ExperienceSection() {
  return (
    <section className="space-y-8">
      <Reveal variant="up" className="flex items-baseline justify-between">
        <h2 className="apple-headline-6 text-white">Experience</h2>
        <span className="apple-caption text-muted-foreground">
          {ROLES.length} roles
        </span>
      </Reveal>

      <ol className="border-t border-white/[0.06]">
        {ROLES.map((r, i) => (
          <Reveal
            as="li"
            key={r.company + r.title}
            variant="up"
            distance={28}
            duration={700}
            delay={i * 80}
            className="border-b border-white/[0.06] py-6 grid grid-cols-[38px_1fr] gap-3"
          >
            {/* Company logo or initial */}
            <div className="w-[38px] h-[38px] shrink-0 rounded-[6px] bg-white/[0.05] border border-white/[0.09] flex items-center justify-center mt-0.5 overflow-hidden">
              {r.logo ? (
                <img
                  src={r.logo}
                  alt={r.company}
                  className="w-[22px] h-[22px] object-contain opacity-70"
                />
              ) : (
                <span className="text-[13px] font-medium text-white/50 leading-none select-none">
                  {r.company.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-0.5">
                <span className="text-[14px] font-medium text-white leading-snug tracking-[-0.01em]">
                  {r.company}
                </span>
                <span className="text-[13px] text-muted-foreground leading-snug tracking-[-0.008em] shrink-0">
                  {r.period}
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-snug tracking-[-0.008em] mb-3">
                {r.title}
              </p>
              <p className="text-[14px] leading-[1.65] text-muted-foreground tracking-[-0.01em]">
                {r.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
