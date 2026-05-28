import type React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
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
        <div className="relative aspect-video w-full bg-white/[0.015] border border-dashed border-white/10 flex items-center justify-center overflow-visible">
          <style>{`
            @keyframes pfFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
            .pf-wrap { animation: pfFloat 3.2s ease-in-out infinite; }
            .pf-paper { transition: transform 0.38s cubic-bezier(0.34,1.4,0.64,1); }
            .pf-front { transition: transform 0.38s cubic-bezier(0.34,1.4,0.64,1); transform-origin: bottom center; }
            .pf-wrap:hover .pf-paper-1 { transform: translateY(-34px) rotate(-7deg); }
            .pf-wrap:hover .pf-paper-2 { transform: translateY(-26px) rotate(6deg); }
            .pf-wrap:hover .pf-paper-3 { transform: translateY(-18px) rotate(-2deg); }
            .pf-wrap:hover .pf-front { transform: perspective(700px) rotateX(-32deg); }
          `}</style>
          <div className="pf-wrap" style={{ position: "relative", width: "84px", height: "64px" }}>
            {/* Folder back */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "84px",
              height: "56px",
              background: "linear-gradient(150deg, #d97706 0%, #92400e 100%)",
              borderRadius: "4px",
            }} />
            {/* Tab */}
            <div style={{
              position: "absolute",
              bottom: "50px",
              left: 0,
              width: "32px",
              height: "12px",
              background: "#d97706",
              borderRadius: "3px 8px 0 0",
            }} />
            {/* Paper 3 (back) */}
            <div className="pf-paper pf-paper-3" style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              width: "68px",
              height: "44px",
              background: "#111",
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.04)",
            }} />
            {/* Paper 2 */}
            <div className="pf-paper pf-paper-2" style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              width: "68px",
              height: "44px",
              background: "#141414",
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.06)",
            }} />
            {/* Paper 1 (front) */}
            <div className="pf-paper pf-paper-1" style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              width: "68px",
              height: "44px",
              background: "#181818",
              borderRadius: "3px",
              border: "1px solid rgba(255,255,255,0.08)",
            }} />
            {/* Folder front flap */}
            <div className="pf-front" style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "84px",
              height: "56px",
              background: "linear-gradient(150deg, #f59e0b 0%, #d97706 100%)",
              borderRadius: "4px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }} />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="apple-headline-6 text-white/35">
            Incoming project
          </h3>
          <p className="apple-caption text-white/25">
            Work In Progress
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
        <h3 className="apple-headline-6 text-white">
          {item.title}
        </h3>
        <p className="apple-caption text-muted-foreground">
          {item.category ?? "Product Design"}
        </p>
      </div>
    </button>
  );
}
