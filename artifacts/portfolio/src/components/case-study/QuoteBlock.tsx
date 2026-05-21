import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/case-study";

type Props = { testimonial: Testimonial };

export function QuoteBlock({ testimonial }: Props) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-8 md:p-14 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-sm"
    >
      <span
        aria-hidden
        className="absolute top-4 left-6 md:top-6 md:left-10 text-[80px] md:text-[120px] leading-none text-white/10 select-none font-serif"
      >
        “
      </span>
      <blockquote className="relative text-[20px] md:text-[28px] leading-snug tracking-tight text-white font-medium max-w-3xl">
        {testimonial.quote}
      </blockquote>
      <figcaption className="relative mt-8 flex items-center gap-3">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[13px] text-white/80"
          >
            {testimonial.author.charAt(0)}
          </span>
        )}
        <div className="text-[13px] tracking-tight">
          <div className="text-white">{testimonial.author}</div>
          <div className="text-muted-foreground">{testimonial.role}</div>
        </div>
      </figcaption>
    </motion.figure>
  );
}
