import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import {
  getActiveSections,
  type CaseStudy,
  type MediaItem,
  type SectionId,
} from "@/lib/case-study";
import { StickyNavigation } from "./StickyNavigation";
import { SectionBlock } from "./SectionBlock";
import { MediaGallery } from "./MediaGallery";
import { MetricsGrid } from "./MetricsGrid";
import { QuoteBlock } from "./QuoteBlock";

type Props = { caseStudy: CaseStudy };

export function CaseStudyLayout({ caseStudy }: Props) {
  const sections = useMemo(() => getActiveSections(caseStudy), [caseStudy]);
  const [activeId, setActiveId] = useState<SectionId | null>(
    sections[0]?.id ?? null,
  );
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id as SectionId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    els.forEach((s) => observer.observe(s));

    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [caseStudy.slug, sections]);

  const jumpTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMediaSelect = (item: MediaItem) => {
    if (item.kind === "image") window.open(item.src, "_blank", "noopener,noreferrer");
  };

  const sectionNumber = (id: SectionId) => {
    const idx = sections.findIndex((s) => s.id === id);
    return String(idx + 1).padStart(2, "0");
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-white selection:text-black scroll-smooth">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-50">
        <motion.div className="h-full bg-white origin-left" style={{ scaleX: progress }} />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[14px] text-muted-foreground hover:text-white transition-colors tracking-tight"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to work
          </Link>
          {caseStudy.externalUrl && (
            <a
              href={caseStudy.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-white tracking-tight transition-colors"
            >
              View on Behance
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="apple-eyebrow text-muted-foreground mb-8">
              Case study
            </p>
            <h1 className="text-[36px] md:text-[64px] leading-[1.05] tracking-tight text-white font-medium">
              {caseStudy.title}
            </h1>
            {caseStudy.subtitle && (
              <p className="mt-6 text-[18px] md:text-[20px] leading-relaxed text-muted-foreground tracking-tight max-w-2xl">
                {caseStudy.subtitle}
              </p>
            )}
            <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-[13px] tracking-tight">
              {caseStudy.client && (
                <div>
                  <dt className="text-muted-foreground mb-1">Owner</dt>
                  <dd className="text-white">{caseStudy.client}</dd>
                </div>
              )}
              {caseStudy.role && (
                <div>
                  <dt className="text-muted-foreground mb-1">Role</dt>
                  <dd className="text-white">{caseStudy.role}</dd>
                </div>
              )}
              {caseStudy.year && (
                <div>
                  <dt className="text-muted-foreground mb-1">Year</dt>
                  <dd className="text-white">{caseStudy.year}</dd>
                </div>
              )}
              {caseStudy.duration && (
                <div>
                  <dt className="text-muted-foreground mb-1">Duration</dt>
                  <dd className="text-white">{caseStudy.duration}</dd>
                </div>
              )}
            </dl>
            {caseStudy.fields && caseStudy.fields.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {caseStudy.fields.map((f) => (
                  <span
                    key={f}
                    className="text-[12px] tracking-tight text-muted-foreground border border-white/10 px-3 py-1"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {(caseStudy.heroVideo || caseStudy.heroImage) && (
          <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#111] overflow-hidden">
              {caseStudy.heroVideo ? (
                <video
                  src={caseStudy.heroVideo}
                  poster={caseStudy.heroImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={caseStudy.heroImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}
      </section>

      {/* Content */}
      <div
        ref={articleRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-24 md:pb-40 flex gap-12 lg:gap-20"
      >
        <StickyNavigation
          sections={sections}
          activeId={activeId}
          progress={progress}
          onJump={jumpTo}
        />

        <article className="flex-1 min-w-0">
          {/* Behance embed */}
          {caseStudy.behanceEmbedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 md:mb-24"
            >
              <p className="apple-eyebrow text-muted-foreground mb-5">
                Behance preview
              </p>
              <div className="relative w-full aspect-[404/316] max-w-2xl bg-[#111] overflow-hidden border border-white/5">
                <iframe
                  src={caseStudy.behanceEmbedUrl}
                  title="Behance project preview"
                  loading="lazy"
                  allowFullScreen
                  allow="clipboard-write"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {caseStudy.externalUrl && (
                <a
                  href={caseStudy.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-[13px] text-muted-foreground hover:text-white transition-colors tracking-tight border-b border-white/20 hover:border-white pb-0.5"
                >
                  View full project on Behance
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          )}

          {caseStudy.overview && (
            <SectionBlock id="overview" eyebrow={sectionNumber("overview")} title="Overview">
              <p className="text-[17px] md:text-[19px] leading-relaxed text-muted-foreground tracking-tight max-w-2xl">
                {caseStudy.overview}
              </p>
            </SectionBlock>
          )}

          {caseStudy.problem && (
            <SectionBlock id="problem" eyebrow={sectionNumber("problem")} title="The problem">
              <p className="text-[17px] md:text-[19px] leading-relaxed text-muted-foreground tracking-tight max-w-2xl">
                {caseStudy.problem}
              </p>
            </SectionBlock>
          )}

          {caseStudy.research && caseStudy.research.length > 0 && (
            <SectionBlock
              id="research"
              eyebrow={sectionNumber("research")}
              title="Research"
              collapsible
            >
              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                {caseStudy.research.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="bg-background p-6 md:p-8"
                  >
                    <h3 className="text-[16px] font-medium text-white tracking-tight mb-3">
                      {r.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-muted-foreground tracking-tight">
                      {r.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SectionBlock>
          )}

          {caseStudy.process && caseStudy.process.length > 0 && (
            <SectionBlock id="process" eyebrow={sectionNumber("process")} title="Process">
              <ol className="space-y-px bg-white/5 border border-white/5">
                {caseStudy.process.map((step, i) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="bg-background p-6 md:p-8 grid grid-cols-[60px_1fr_2fr] gap-6 items-start"
                  >
                    <span className="text-[13px] text-muted-foreground tracking-tight pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[16px] md:text-[18px] font-medium text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-relaxed text-muted-foreground tracking-tight">
                      {step.body}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </SectionBlock>
          )}

          {caseStudy.explorations && caseStudy.explorations.length > 0 && (
            <SectionBlock
              id="explorations"
              eyebrow={sectionNumber("explorations")}
              title="Design explorations"
            >
              <div className="space-y-6">
                {caseStudy.explorations.map((e, i) => (
                  <motion.div
                    key={e.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group p-6 md:p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h3 className="text-[18px] md:text-[20px] font-medium text-white tracking-tight">
                        {e.title}
                      </h3>
                      <span className="text-[12px] text-muted-foreground tracking-tight">
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(caseStudy.explorations!.length).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-muted-foreground tracking-tight max-w-2xl">
                      {e.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SectionBlock>
          )}

          {(caseStudy.solution || (caseStudy.solutionMedia?.length ?? 0) > 0) && (
            <SectionBlock id="solution" eyebrow={sectionNumber("solution")} title="The solution">
              {caseStudy.solution && (
                <p className="text-[17px] md:text-[19px] leading-relaxed text-muted-foreground tracking-tight max-w-2xl mb-10">
                  {caseStudy.solution}
                </p>
              )}
              {caseStudy.solutionMedia && caseStudy.solutionMedia.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {caseStudy.solutionMedia.map((m, i) => (
                    <motion.button
                      key={`${m.src}-${i}`}
                      type="button"
                      onClick={() => handleMediaSelect(m)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.55, delay: i * 0.08 }}
                      className="group relative aspect-video bg-[#111] overflow-hidden text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                    >
                      {m.kind === "video" ? (
                        <video
                          src={m.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <img
                          src={m.src}
                          alt={m.alt ?? ""}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      )}
                      {m.caption && (
                        <div className="absolute left-3 bottom-3 text-[12px] text-white/80 tracking-tight">
                          {m.caption}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </SectionBlock>
          )}

          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <SectionBlock id="gallery" eyebrow={sectionNumber("gallery")} title="Gallery">
              <MediaGallery items={caseStudy.gallery} onSelect={handleMediaSelect} />
            </SectionBlock>
          )}

          {((caseStudy.metrics?.length ?? 0) > 0 ||
            (caseStudy.outcomes?.length ?? 0) > 0) && (
            <SectionBlock id="outcomes" eyebrow={sectionNumber("outcomes")} title="Outcomes">
              <div className="space-y-10">
                {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                  <MetricsGrid items={caseStudy.metrics} />
                )}
                {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                    {caseStudy.outcomes.map((o, i) => (
                      <motion.div
                        key={o.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="bg-background p-6 md:p-8"
                      >
                        <h3 className="text-[16px] font-medium text-white tracking-tight mb-3">
                          {o.title}
                        </h3>
                        <p className="text-[14px] leading-relaxed text-muted-foreground tracking-tight">
                          {o.body}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </SectionBlock>
          )}

          {caseStudy.testimonial && (
            <SectionBlock
              id="testimonial"
              eyebrow={sectionNumber("testimonial")}
              title="What the client said"
            >
              <QuoteBlock testimonial={caseStudy.testimonial} />
            </SectionBlock>
          )}

          {/* Footer CTA */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="apple-eyebrow text-muted-foreground mb-4">
                End of case study
              </p>
              <h3 className="text-[22px] md:text-[28px] tracking-tight text-white font-medium max-w-xl">
                Want to see more or start a project together?
              </h3>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[15px] text-white border-b border-white/40 hover:border-white pb-1 transition-colors tracking-tight"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to work
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
