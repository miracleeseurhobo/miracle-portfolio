type Role = {
  title: string;
  company: string;
  period: string;
  stack?: string;
  bullets: string[];
};

const ROLES: Role[] = [
  {
    title: "Lead Designer",
    company: "Quely (Formerly Rally)",
    period: "April 2023 — Present",
    stack: "Figma, FigJam, Google Meet, Notion",
    bullets: [
      "Reduced internal design review meeting time by 35% by shifting feedback and approvals into structured async workflows.",
      "Improved visibility and traceability of product decisions across design, product, and engineering teams.",
    ],
  },
  {
    title: "UX Designer",
    company: "Rally",
    period: "April 2023 — Pivot (Quely)",
    bullets: [
      "Spearheaded user-centered pivot strategy by uncovering unmet needs and validating new concepts, boosting product adoption and engagement with growth-focused designs.",
    ],
  },
  {
    title: "Founding Designer — Open Source",
    company: "AfriSplash",
    period: "January 2023 — April 2023",
    stack: "Figma, FigJam, Google Meet, Notion",
    bullets: [
      "Collaborated with the design team to build a scalable design system used across squads of 20+ designers, improving design consistency and delivery speed.",
      "Identified key use cases for the AfriSplash forum ecosystem, designing wireframes and interaction flows that supported community engagement and discussion.",
    ],
  },
  {
    title: "Founding Designer",
    company: "elverr",
    period: "August 2021 — December 2022",
    bullets: [
      "Designed the platform from concept to MVP — including product flows and the design system.",
      "Worked closely with stakeholders to validate ideas and translate user research into product solutions.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section className="space-y-8">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-medium text-white tracking-tight">
          Experience
        </h2>
        <span className="text-[12px] text-muted-foreground tracking-tight">
          {ROLES.length} roles
        </span>
      </div>

      <ol className="border-t border-white/[0.06]">
        {ROLES.map((r) => (
          <li
            key={r.title + r.company}
            className="border-b border-white/[0.06] py-8 grid md:grid-cols-[180px_1fr] gap-4 md:gap-10"
          >
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {r.period}
              </p>
              <p className="text-[14px] text-white/60 tracking-tight">
                {r.company}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[16px] md:text-[17px] font-medium text-white tracking-tight">
                {r.title}{" "}
                <span className="text-muted-foreground font-normal">
                  · {r.company}
                </span>
              </h3>
              <ul className="space-y-2">
                {r.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed tracking-tight pl-4 relative"
                  >
                    <span
                      className="absolute left-0 top-[0.7em] w-1 h-px bg-white/30"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
              {r.stack && (
                <p className="text-[12px] text-white/35 tracking-tight pt-1">
                  Stack: {r.stack}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
