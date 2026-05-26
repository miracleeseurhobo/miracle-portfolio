import { Download, ArrowUpRight } from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}miracle-eseurhobo-cv.pdf`;

export function ResumeBlock() {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[22px] font-semibold text-white tracking-tight">
          Resume
        </h2>
        <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          PDF
        </span>
      </div>
      <div className="border border-white/[0.08] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-1.5">
          <h3 className="font-display text-[22px] md:text-[26px] font-semibold text-white tracking-[-0.015em]">
            Miracle Eseurhobo — CV
          </h3>
          <p className="text-[15px] font-medium text-muted-foreground tracking-tight">
            Full work history, education, and tool stack.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-muted-foreground hover:text-white transition-colors tracking-tight border-b-2 border-white/20 hover:border-white pb-1"
          >
            View
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={CV_URL}
            download
            className="inline-flex items-center gap-2 text-[15px] font-bold text-black bg-white hover:bg-white/90 px-5 py-3 tracking-tight transition-colors"
          >
            <Download className="w-4 h-4" strokeWidth={2.5} />
            Download
          </a>
        </div>
      </div>
    </section>
  );
}
