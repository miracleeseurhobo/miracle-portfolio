import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiX } from "react-icons/si";
import { ChevronDown } from "lucide-react";
import NotFound from "@/pages/not-found";
import CaseStudyPage from "@/pages/case-study";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { PortfolioItem } from "@/components/portfolio/types";
import { Bio } from "@/components/bio/Bio";

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
  { id: 5, title: "Light Mode Designs - Showreel", type: "video" },
  { id: 6, title: "Light Mode Designs - Showreel", type: "video" },
  { id: 7, title: "Light Mode Designs - Showreel", type: "video" },
  {
    id: 8,
    title: "Webchat UI",
    type: "image",
    src: "https://muratalpay.me/images/Webchat.webp",
  },
  {
    id: 9,
    title: "App Activity Dark",
    type: "image",
    src: "https://muratalpay.me/images/App%20activity%20dark.webp",
  },
  {
    id: 10,
    title: "App Activity Light",
    type: "image",
    src: "https://muratalpay.me/images/App%20activity.webp",
  },
  {
    id: 11,
    title: "Appearance Settings",
    type: "image",
    src: "https://muratalpay.me/images/Appearacne.webp",
  },
  {
    id: 12,
    title: "Rich Text Editor Dark",
    type: "image",
    src: "https://muratalpay.me/images/Bold%20dark.webp",
  },
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

          <Bio />
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
