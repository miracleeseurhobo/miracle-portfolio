import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiX } from "react-icons/si";
import { Play, ChevronDown } from "lucide-react";
import Lottie from "lottie-react";
import NotFound from "@/pages/not-found";
import agendaListImg from "@assets/image_1778950180883.png";
import lumaHeroVideo from "@assets/Luma.ai_(1)_1779033745783.mp4";
import chessKidsImg from "@assets/image_1778951451354.png";
import bitechImg from "@assets/image_1779061779303.png";
import p2pTradingVideo from "@assets/Frame-48095820-Cinematic_(2)_1779060666396.mp4";

const queryClient = new QueryClient();

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Dashboard - Chess Kids Game",
    type: "image",
    src: chessKidsImg,
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
    type: "image",
    src: bitechImg,
    category: "Mobile App",
  },
  {
    id: 5,
    title: "Light Mode Designs - Showreel",
    type: "video",
  },
  {
    id: 6,
    title: "Light Mode Designs - Showreel",
    type: "video",
  },
  {
    id: 7,
    title: "Light Mode Designs - Showreel",
    type: "video",
  },
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
      {/* Left Column - Fixed/Sticky */}
      <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] p-6 md:p-12 lg:p-20 md:h-screen md:sticky md:top-0 flex flex-col justify-between">
        
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-[22px] font-medium leading-tight text-white tracking-tight">Miracle Eseurhobo</h1>
            <p className="text-[15px] text-muted-foreground mt-1 tracking-tight">UX Designer & Framer Developer</p>
          </div>

          {/* Intro section */}
          <section className="space-y-3">
            <h2 className="text-[15px] font-medium text-white tracking-tight">Me in 10 seconds.</h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
              I'm Miracle Eseurhobo, a UX designer and Framer developer. I help startups launch polished, conversion-ready products in an agile manner.
            </p>
          </section>

          {/* Background section */}
          <section className="space-y-3">
            <h2 className="text-[15px] font-medium text-white tracking-tight">What's your background?</h2>
            <div className="space-y-4">
              <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
                I focus on simplifying complex flows, building systems that scale, and designing experiences that turn early users into advocates.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed tracking-tight">
                Currently open to new opportunities. Feel free to reach out if you'd like to collaborate or just say hello.
              </p>
            </div>
          </section>
        </div>

        {/* Footer / Contact */}
        <div className="mt-16 md:mt-0">
          <h2 className="text-[15px] font-medium text-white mb-4 tracking-tight">Contact</h2>
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

      {/* Right Column - Scrollable Grid */}
      <div className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] p-6 md:p-12 lg:p-20 md:min-h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
          {PORTFOLIO_ITEMS.map((item) => (
            <div key={item.id} className="group cursor-pointer flex flex-col gap-4">
              {/* Media Container */}
              <div className="relative aspect-video w-full bg-[#111] overflow-hidden">
                {item.type === "video" ? (
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-90">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                      <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                ) : item.type === "mp4" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              
              {/* Info */}
              <div className="space-y-1">
                <h3 className="text-[15px] font-medium text-white tracking-tight">{item.title}</h3>
                <p className="text-[14px] text-muted-foreground tracking-tight">{item.category ?? "Product Design"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator for mobile */}
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
