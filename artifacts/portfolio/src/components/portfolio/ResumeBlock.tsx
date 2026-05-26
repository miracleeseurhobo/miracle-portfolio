import { Download, ArrowUpRight } from "lucide-react";

const CV_URL = `${import.meta.env.BASE_URL}miracle-eseurhobo-cv.pdf`;

export function ResumeBlock() {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="apple-headline-6 text-white">
          Resume
        </h2>
        <span className="apple-eyebrow text-muted-foreground">
          PDF
        </span>
      </div>
      <div className="border border-white/[0.08] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-1.5">
          <h3 className="apple-headline-5 text-white">
            Miracle Eseurhobo — CV
          </h3>
          <p className="apple-body text-muted-foreground">
            Full work history, education, and tool stack.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 apple-body text-muted-foreground hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
          >
            View
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={CV_URL}
            download
            className="inline-flex items-center gap-2 apple-body font-semibold text-black bg-white hover:bg-white/90 rounded-full px-5 py-2.5 transition-colors"
          >
            <Download className="w-4 h-4" strokeWidth={2.25} />
            Download
          </a>
        </div>
      </div>
    </section>
  );
}
