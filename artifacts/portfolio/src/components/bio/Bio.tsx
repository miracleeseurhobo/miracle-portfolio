import { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";

type Block = {
  heading: string;
  paragraphs: string[];
};

const BLOCKS: Block[] = [
  {
    heading: "Me in 10 seconds.",
    paragraphs: [
      "I'm Miracle Eseurhobo, a UX designer and Framer developer. I help startups launch polished, conversion-ready products in an agile manner.",
    ],
  },
  {
    heading: "What's your background?",
    paragraphs: [
      "I focus on simplifying complex flows, building systems that scale, and designing experiences that turn early users into advocates.",
      "Currently open to new opportunities. Feel free to reach out if you'd like to collaborate or just say hello.",
    ],
  },
];

const FADE = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

export function Bio() {
  // step 0..N — increments as each piece finishes typing
  const [step, setStep] = useState(0);
  const advance = () => setStep((s) => s + 1);

  let cursor = 0;
  const ids: { type: "heading" | "para"; blockIdx: number; paraIdx?: number; step: number }[] =
    [];
  BLOCKS.forEach((b, bi) => {
    ids.push({ type: "heading", blockIdx: bi, step: cursor++ });
    b.paragraphs.forEach((_, pi) => {
      ids.push({ type: "para", blockIdx: bi, paraIdx: pi, step: cursor++ });
    });
  });
  const totalSteps = cursor;

  return (
    <div className="space-y-12">
      {BLOCKS.map((block, bi) => {
        const headingId = ids.find(
          (i) => i.type === "heading" && i.blockIdx === bi,
        )!;
        const isHeadingActive = step === headingId.step;
        const isHeadingShown = step >= headingId.step;
        const isLastTyping = step === headingId.step;

        return (
          <motion.section
            key={bi}
            className="space-y-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: isHeadingShown ? 1 : 0,
              y: isHeadingShown ? 0 : 6,
            }}
            transition={FADE}
          >
            {isHeadingShown && (
              <Typewriter
                as="h2"
                text={block.heading}
                speed={28}
                cursor={isLastTyping && step < totalSteps}
                className="text-[15px] font-medium text-white tracking-tight"
                onDone={isHeadingActive ? advance : undefined}
              />
            )}

            <div className="space-y-4">
              {block.paragraphs.map((p, pi) => {
                const meta = ids.find(
                  (i) => i.type === "para" && i.blockIdx === bi && i.paraIdx === pi,
                )!;
                const isShown = step >= meta.step;
                const isActive = step === meta.step;
                if (!isShown) return null;
                return (
                  <Typewriter
                    key={pi}
                    as="p"
                    text={p}
                    speed={14}
                    cursor={isActive && step < totalSteps}
                    className="text-[15px] text-muted-foreground leading-relaxed tracking-tight"
                    onDone={isActive ? advance : undefined}
                  />
                );
              })}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
