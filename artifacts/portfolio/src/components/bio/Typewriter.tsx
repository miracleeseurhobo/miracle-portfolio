import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function Typewriter({
  text,
  speed = 18,
  startDelay = 0,
  className,
  cursor = false,
  onDone,
  as: Tag = "span",
}: Props) {
  const [shown, setShown] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    setShown(0);
    let raf = 0;
    let timer = 0;
    const start = performance.now() + startDelay;

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - start;
      const next = Math.min(text.length, Math.floor(elapsed / speed));
      setShown(next);
      if (next < text.length) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        timer = window.setTimeout(() => onDone?.(), 60);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, [text, speed, startDelay, onDone]);

  const isDone = shown >= text.length;

  return (
    <Tag className={className}>
      {text.slice(0, shown)}
      {cursor && (
        <span
          aria-hidden
          className={`inline-block w-[1px] -mb-[2px] align-baseline bg-white ml-[2px] ${
            isDone ? "animate-pulse" : ""
          }`}
          style={{ height: "1em" }}
        />
      )}
    </Tag>
  );
}
