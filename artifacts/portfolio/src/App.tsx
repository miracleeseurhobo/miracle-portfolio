import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiX } from "react-icons/si";
import { ChevronDown } from "lucide-react";
import NotFound from "@/pages/not-found";
import CaseStudyPage from "@/pages/case-study";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { LogosStrip } from "@/components/portfolio/LogosStrip";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ResumeBlock } from "@/components/portfolio/ResumeBlock";
import type { PortfolioItem } from "@/components/portfolio/types";

const ASSET = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const chessKidsImg = ASSET("media/chess.jpg");
const lumaHeroVideo = ASSET("media/luma.mp4");
const p2pTradingVideo = ASSET("media/nike.mp4");
const bitechVideo = ASSET("media/bitech.mp4");

const queryClient = new QueryClient();

const STATS = [
  { value: "4+", label: "Years solving design problems" },
  { value: "25+", label: "Brands supported" },
  { value: "20+", label: "Projects delivered" },
  { value: "97%", label: "Client satisfaction rate" },
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Dashboard - Chess Kids Game",
    type: "image",
    src: chessKidsImg,
    category: "Product Design",
  },
  {
    id: 2,
    title: "Hero Design - Luma AI",
    type: "mp4",
    src: lumaHeroVideo,
    category: "Website design",
  },
  {
    id: 3,
    title: "Nike App Re-imagined",
    type: "mp4",
    src: p2pTradingVideo,
    category: "Mobile App",
  },
  {
    id: 4,
    title: "P2P Trading Platform - Bitech",
    type: "mp4",
    src: bitechVideo,
    category: "Mobile App",
  },
  { id: 5, title: "New project", type: "image", empty: true },
  { id: 6, title: "New project", type: "image", empty: true },
  { id: 7, title: "New project", type: "image", empty: true },
  { id: 8, title: "New project", type: "image", empty: true },
  { id: 9, title: "New project", type: "image", empty: true },
  { id: 10, title: "New project", type: "image", empty: true },
  { id: 11, title: "New project", type: "image", empty: true },
  { id: 12, title: "New project", type: "image", empty: true },
];

function LeftColumn() {
  return (
    <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] p-6 md:p-12 lg:p-20 md:h-screen md:sticky md:top-0 md:overflow-y-auto flex flex-col gap-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Status pill */}
      <div className="inline-flex items-center gap-2 self-start text-[12px] text-white/70 tracking-tight">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Available for product & growth-focused design roles
      </div>

      {/* Header */}
      <div>
        <h1 className="text-[22px] font-medium leading-tight text-white tracking-tight">
          Miracle Eseurhobo
        </h1>
        <p className="text-[15px] text-muted-foreground mt-1 tracking-tight">
          UX Designer & Framer Developer
        </p>
      </div>

      {/* About */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-medium text-white tracking-tight">
          About me.
        </h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
          A product and visual designer who's worked on both sides of the
          brief. Fintech products, entertainment brands, pharma campaigns,
          SaaS platforms. The range was never accidental. I show up best when
          the problem is half-defined and the stakes are real.
        </p>
      </section>

      {/* Stats */}
      <section className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          By the numbers
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 pt-1">
          {STATS.map((s) => (
            <div key={s.label} className="space-y-1">
              <dt className="text-[22px] text-white font-medium tracking-tight tabular-nums">
                {s.value}
              </dt>
              <dd className="text-[13px] text-muted-foreground leading-snug tracking-tight">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <div className="mt-auto pt-4">
        <h2 className="text-[15px] font-medium text-white mb-4 tracking-tight">
          Contact
        </h2>
        <div className="flex items-center gap-6">
          <a
            href="https://x.com/Rizdsgns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors duration-200"
            aria-label="X (Twitter)"
          >
            <SiX className="w-4 h-4" />
          </a>
          <a
            href="mailto:miracleeseurhobo@gmail.com"
            className="text-[15px] text-muted-foreground hover:text-white transition-colors duration-200 tracking-tight"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col md:flex-row selection:bg-white selection:text-black">
      <LeftColumn />

      <div className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] p-6 md:p-12 lg:p-20 md:min-h-screen space-y-20 md:space-y-28">
        <PortfolioGrid items={PORTFOLIO_ITEMS} />
        <LogosStrip />
        <ExperienceSection />
        <ResumeBlock />
      </div>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ChevronDown className="w-5 h-5 opacity-50" />
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/case-study/:slug" component={CaseStudyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
