import { type ElementType, type ReactNode, type CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Variant = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number; // ms
  duration?: number; // ms
  distance?: number; // px
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
};

const FROM: Record<Variant, string> = {
  up: "translate3d(0, 28px, 0)",
  down: "translate3d(0, -28px, 0)",
  left: "translate3d(-32px, 0, 0)",
  right: "translate3d(32px, 0, 0)",
  fade: "none",
  scale: "scale(0.96)",
  blur: "translate3d(0, 12px, 0)",
};

export function Reveal({
  as,
  children,
  className,
  variant = "up",
  delay = 0,
  duration = 700,
  distance,
  once = true,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  style,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInView<HTMLElement>({
    threshold,
    rootMargin,
    once,
  });

  const fromTransform = distance
    ? variant === "up"
      ? `translate3d(0, ${distance}px, 0)`
      : variant === "down"
        ? `translate3d(0, ${-distance}px, 0)`
        : variant === "left"
          ? `translate3d(${-distance}px, 0, 0)`
          : variant === "right"
            ? `translate3d(${distance}px, 0, 0)`
            : FROM[variant]
    : FROM[variant];

  const inlineStyle: CSSProperties = {
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}ms`,
    willChange: "opacity, transform",
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : fromTransform,
    filter: variant === "blur" ? (inView ? "blur(0)" : "blur(8px)") : undefined,
    ...style,
  };

  return (
    <Tag ref={ref} className={cn(className)} style={inlineStyle}>
      {children}
    </Tag>
  );
}
