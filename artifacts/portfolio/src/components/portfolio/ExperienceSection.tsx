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

import { Reveal } from "@/components/Reveal";

export function ExperienceSection() {
  return (
    <section className="space-y-8">
      <Reveal variant="up" className="flex items-baseline justify-between">
        <h2 className="apple-headline-6 text-white">
          Experience
        </h2>
        <span className="apple-caption text-muted-foreground">
          {ROLES.length} roles
        </span>
      </Reveal>

      <ol className="border-t border-white/[0.06]">
        {ROLES.map((r, i) => (
          <Reveal
            as="li"
            key={r.title + r.company}
            variant="up"
            distance={32}
            duration={750}
            delay={i * 90}
            className="border-b border-white/[0.06] py-8 grid md:grid-cols-[180px_1fr] gap-4 md:gap-10"
          >
            <div className="space-y-1">
              <p className="apple-eyebrow text-muted-foreground">
                {r.period}
              </p>
              <p className="apple-caption text-white/70">
                {r.company}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="apple-headline-5 text-white">
                {r.title}{" "}
                <span className="text-muted-foreground font-normal">
                  · {r.company}
                </span>
              </h3>
              <ul className="space-y-2">
                {r.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="apple-body text-muted-foreground pl-4 relative"
                  >
                    <span
                      className="absolute left-0 top-[0.7em] w-1.5 h-px bg-white/40"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
              {r.stack && (
                <p className="apple-eyebrow text-white/45 pt-1">
                  Stack: <span className="apple-caption text-white/55 normal-case">{r.stack}</span>
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
