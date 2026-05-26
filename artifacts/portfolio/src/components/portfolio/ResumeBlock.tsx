import { Download, ArrowUpRight } from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}miracle-eseurhobo-cv.pdf`;

export function ResumeBlock() {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-medium text-white tracking-tight">
          Resume
        </h2>
        <span className="text-[12px] text-muted-foreground tracking-tight">
          PDF
        </span>
      </div>
      <div className="border border-white/[0.06] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-1">
          <h3 className="text-[17px] md:text-[19px] font-medium text-white tracking-tight">
            Miracle Eseurhobo — CV
          </h3>
          <p className="text-[14px] text-muted-foreground tracking-tight">
            Full work history, education, and tool stack.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] text-muted-foreground hover:text-white transition-colors tracking-tight border-b border-white/20 hover:border-white pb-0.5"
          >
            View
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={CV_URL}
            download
            className="inline-flex items-center gap-2 text-[14px] text-black bg-white hover:bg-white/90 px-4 py-2 tracking-tight transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>
    </section>
  );
}
