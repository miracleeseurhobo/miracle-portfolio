import { motion } from "framer-motion";
import { SECTION_DEFS, type SectionId } from "@/lib/case-study";

type Props = {
  activeId: SectionId | null;
  progress: number;
  onJump: (id: SectionId) => void;
};

export function StickyNavigation({ activeId, progress, onJump }: Props) {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
          On this page
        </p>
        <nav aria-label="Case study sections" className="relative">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/10" aria-hidden />
          <motion.div
            className="absolute left-[5px] top-1 w-px bg-white origin-top"
            style={{ height: `calc(${progress * 100}% - 8px)` }}
            aria-hidden
          />
          <ul className="space-y-1">
            {SECTION_DEFS.map((section) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => onJump(section.id)}
                    className="group flex items-center gap-4 py-1.5 text-left w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                  >
                    <span
                      className={`block h-[3px] w-[3px] rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-white scale-150"
                          : "bg-white/30 group-hover:bg-white/60"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`text-[14px] tracking-tight transition-colors duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-muted-foreground group-hover:text-white/80"
                      }`}
                    >
                      {section.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
