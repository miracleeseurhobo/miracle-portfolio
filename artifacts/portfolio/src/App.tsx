import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiX } from "react-icons/si";
import { ChevronDown } from "lucide-react";
import NotFound from "@/pages/not-found";
import CaseStudyPage from "@/pages/case-study";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { PortfolioItem } from "@/components/portfolio/types";

const ASSET = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const chessKidsImg = ASSET("media/chess.jpg");
const lumaHeroVideo = ASSET("media/luma.mp4");
const p2pTradingVideo = ASSET("media/nike.mp4");
const bitechVideo = ASSET("media/bitech.mp4");

const queryClient = new QueryClient();

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

function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col md:flex-row selection:bg-white selection:text-black">
      <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] p-6 md:p-12 lg:p-20 md:h-screen md:sticky md:top-0 flex flex-col justify-between">
        <div className="space-y-12">
          <div>
            <h1 className="text-[22px] font-medium leading-tight text-white tracking-tight">
              Miracle Eseurhobo
            </h1>
            <p className="text-[15px] text-muted-foreground mt-1 tracking-tight">
              UX Designer & Framer Developer
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-[15px] font-medium text-white tracking-tight">
              Me in 10 seconds.
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
              I'm Miracle Eseurhobo, a UX designer and Framer developer. I help
              startups launch polished, conversion-ready products in an agile
              manner.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[15px] font-medium text-white tracking-tight">
              What's your background?
            </h2>
            <div className="space-y-4">
              <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
                I focus on simplifying complex flows, building systems that
                scale, and designing experiences that turn early users into
                advocates.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
                Currently open to new opportunities. Feel free to reach out if
                you'd like to collaborate or just say hello.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 md:mt-0">
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

      <div className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] p-6 md:p-12 lg:p-20 md:min-h-screen">
        <PortfolioGrid items={PORTFOLIO_ITEMS} />
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
