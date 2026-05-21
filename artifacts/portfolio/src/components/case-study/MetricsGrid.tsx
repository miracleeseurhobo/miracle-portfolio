import { motion } from "framer-motion";
import type { Metric } from "@/lib/case-study";

type Props = { items: Metric[] };

export function MetricsGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
      {items.map((m, i) => (
        <motion.div
          key={`${m.label}-${i}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="bg-background p-6 md:p-8 flex flex-col gap-2"
        >
          <div className="text-[32px] md:text-[44px] leading-none tracking-tight text-white font-medium">
            {m.value}
          </div>
          <div className="text-[13px] text-muted-foreground tracking-tight">
            {m.label}
          </div>
          {m.note && (
            <div className="text-[12px] text-muted-foreground/70 tracking-tight">
              {m.note}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
