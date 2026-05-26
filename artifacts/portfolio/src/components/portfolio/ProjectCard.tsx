import { motion } from "framer-motion";
import { ImageIcon, Play } from "lucide-react";
import type { PortfolioItem } from "./types";

type Props = {
  item: PortfolioItem;
  onOpen: (item: PortfolioItem) => void;
};

export function ProjectCard({ item, onOpen }: Props) {
  if (item.empty) {
    return (
      <div
        className="flex flex-col gap-4 cursor-default select-none"
        aria-label="Empty project slot"
      >
        <div className="relative aspect-video w-full bg-white/[0.015] border border-dashed border-white/10 overflow-hidden flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-white/25">
            <ImageIcon className="w-6 h-6" strokeWidth={1.25} />
            <span className="text-[11px] uppercase tracking-[0.18em]">
              Coming soon
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-[15px] font-medium text-white/30 tracking-tight">
            Untitled project
          </h3>
          <p className="text-[14px] text-white/20 tracking-tight">
            Placeholder
          </p>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group text-left flex flex-col gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
      aria-label={`Open preview: ${item.title}`}
    >
      <motion.div
        layoutId={`media-${item.id}`}
        className="relative aspect-video w-full bg-[#111] overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.15)]"
      >
        {item.type === "video" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:scale-110">
              <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        ) : item.type === "mp4" ? (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        )}
      </motion.div>

      <div className="space-y-1">
        <h3 className="text-[15px] font-medium text-white tracking-tight">
          {item.title}
        </h3>
        <p className="text-[14px] text-muted-foreground tracking-tight">
          {item.category ?? "Product Design"}
        </p>
      </div>
    </button>
  );
}
