import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import type { PortfolioItem } from "./types";

type Props = {
  items: PortfolioItem[];
  activeId: number | null;
  openerId: number | null;
  onClose: () => void;
  onNavigate: (id: number) => void;
};

const SPRING = { type: "spring" as const, stiffness: 240, damping: 30, mass: 0.9 };
const EASE = [0.22, 1, 0.36, 1] as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectPreviewModal({
  items,
  activeId,
  openerId,
  onClose,
  onNavigate,
}: Props) {
  const item = activeId != null ? items.find((i) => i.id === activeId) ?? null : null;
  const isOpen = item != null;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const goPrev = useCallback(() => {
    if (!item) return;
    const idx = items.findIndex((i) => i.id === item.id);
    const next = items[(idx - 1 + items.length) % items.length];
    onNavigate(next.id);
  }, [item, items, onNavigate]);

  const goNext = useCallback(() => {
    if (!item) return;
    const idx = items.findIndex((i) => i.id === item.id);
    const next = items[(idx + 1) % items.length];
    onNavigate(next.id);
  }, [item, items, onNavigate]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Keyboard: ESC, arrows, focus trap
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        goNext();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const nodes = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((n) => n.offsetParent !== null);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !overlayRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, goPrev, goNext]);

  // Focus mgmt: save opener on open, restore on close
  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    if (restoreFocusRef.current && typeof restoreFocusRef.current.focus === "function") {
      restoreFocusRef.current.focus();
      restoreFocusRef.current = null;
    }
    return undefined;
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="preview-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Project preview: ${item.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="absolute inset-0 bg-black cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-20 px-5 md:px-8 py-5 flex items-center justify-between pointer-events-none">
            <motion.button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="pointer-events-auto w-10 h-10 rounded-full bg-white hover:bg-white/90 flex items-center justify-center text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
            >
              <X className="w-4 h-4" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.p
                key={item.id + "-title"}
                className="hidden md:block text-[13px] text-white/70 tracking-tight pointer-events-none absolute left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {item.title}
                {item.category && (
                  <span className="text-white/40"> — {item.category}</span>
                )}
              </motion.p>
            </AnimatePresence>

            <motion.div
              className="pointer-events-auto flex items-center gap-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
            >
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full bg-white hover:bg-white/90 flex items-center justify-center text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                className="w-10 h-10 rounded-full bg-white hover:bg-white/90 flex items-center justify-center text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Stage */}
          <div className="relative z-10 w-full h-full flex flex-col items-center px-4 md:px-8 pt-20">
            {/* Shared-layout shell — only animates from the opener card on open/close.
                Intra-modal nav swaps inner media with a keyed fade, no layoutId churn. */}
            <motion.div
              layoutId={openerId != null ? `media-${openerId}` : undefined}
              transition={SPRING}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative w-full flex-1 min-h-0 max-w-[1680px] bg-[#0d0d0d] rounded-t-[20px] md:rounded-t-[28px] overflow-hidden shadow-[0_60px_160px_-30px_rgba(0,0,0,0.9),0_0_120px_-30px_rgba(255,255,255,0.1)] ring-1 ring-white/5"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {item.type === "mp4" && item.src ? (
                    <video
                      key={item.src}
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : item.type === "image" && item.src ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/[0.06] flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Meta overlay — floats over the bottom of the media */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id + "-meta"}
                  className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pt-16 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
                >
                  <div className="max-w-xl">
                    <p className="apple-eyebrow text-white/40 mb-1.5">
                      {item.category ?? "Product Design"}
                    </p>
                    <h2 className="text-[16px] md:text-[18px] font-medium text-white tracking-tight leading-tight">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="mt-2 text-[13px] text-white/55 leading-relaxed tracking-tight">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="text-[11px] text-white/40 tracking-tight">
                    {item.year ?? "2025"} ·{" "}
                    {items.findIndex((i) => i.id === item.id) + 1} /{" "}
                    {items.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
