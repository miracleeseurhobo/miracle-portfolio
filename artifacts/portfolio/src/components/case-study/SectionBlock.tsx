import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { SectionId } from "@/lib/case-study";

type Props = {
  id: SectionId;
  eyebrow: string;
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
};

export function SectionBlock({
  id,
  eyebrow,
  title,
  children,
  collapsible = false,
  defaultOpen = true,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 py-16 md:py-24 border-t border-white/5 first:border-t-0 first:pt-0"
    >
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            {eyebrow}
          </p>
          <h2 className="text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-white font-medium max-w-2xl">
            {title}
          </h2>
        </div>
        {collapsible && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${id}-content`}
            className="shrink-0 mt-2 inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-white transition-colors"
          >
            {open ? "Collapse" : "Expand"}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      <motion.div
        id={`${id}-content`}
        initial={false}
        animate={{
          height: collapsible && !open ? 0 : "auto",
          opacity: collapsible && !open ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
