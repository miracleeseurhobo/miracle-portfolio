type Role = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

const ROLES: Role[] = [
  {
    title: "Product Designer II",
    company: "Precize",
    period: "October 2025 — Present",
    bullets: [
      "Designed end-to-end product flows for an investment platform — screener, discovery, buying journey, and investor dashboards.",
      "Simplified complex financial workflows into clear, step-by-step interfaces for first-time buyers in private equity.",
      "Built and maintained a design system and component library that standardised the product's visual language across surfaces.",
      "Created internal tools for lead management, improving how the operations team qualifies and tracks investor interest.",
    ],
  },
  {
    title: "Associate Art Director",
    company: "The Small Big Idea",
    period: "March 2022 — September 2025",
    bullets: [
      "Led brand and communication design across entertainment, crypto, insurance, and pharma campaigns, identity systems, and marketing collateral.",
      "Transitioned into product design mid-tenure, shipping 10+ responsive websites across SaaS, healthcare, D2C, and entertainment.",
      "Managed a 4-person design team — handling reviews, execution quality, and stakeholder alignment.",
      "Integrated AI tools into the design workflow, cutting delivery timelines by 30% without compromising output quality.",
    ],
  },
  {
    title: "Designer",
    company: "Vibrant Experiences",
    period: "February 2021 — January 2022",
    bullets: [
      "Owned visual design across web, print, and pitch — landing pages, UI screens, and business development decks.",
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
          {ROLES.length} roles · 4+ yrs
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
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
