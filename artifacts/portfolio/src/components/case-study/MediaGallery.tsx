import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { MediaItem } from "@/lib/case-study";

type Props = {
  items: MediaItem[];
  onSelect?: (item: MediaItem, index: number) => void;
};

export function MediaGallery({ items, onSelect }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative -mx-6 md:mx-0">
      <div className="hidden md:flex absolute right-0 -top-14 gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll gallery left"
          className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll gallery right"
          className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-6 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <motion.button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => onSelect?.(item, i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative shrink-0 w-[78%] md:w-[520px] aspect-video bg-[#111] overflow-hidden snap-start text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            {item.kind === "video" ? (
              <>
                <video
                  src={item.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-0 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </>
            ) : (
              <img
                src={item.src}
                alt={item.alt ?? item.caption ?? ""}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            )}
            {item.caption && (
              <div className="absolute left-3 bottom-3 right-3 text-[12px] text-white/80 tracking-tight">
                {item.caption}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
