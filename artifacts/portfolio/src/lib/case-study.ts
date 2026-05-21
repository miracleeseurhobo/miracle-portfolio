export type MediaItem = {
  kind: "image" | "video";
  src: string;
  caption?: string;
  alt?: string;
};

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type ResearchInsight = {
  title: string;
  body: string;
};

export type Exploration = {
  title: string;
  body: string;
  media?: MediaItem;
};

export type Outcome = {
  title: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  client?: string;
  role?: string;
  year?: string;
  duration?: string;
  heroImage: string;
  heroVideo?: string;
  behanceEmbedUrl?: string;
  overview: string;
  problem: string;
  process: ProcessStep[];
  research: ResearchInsight[];
  explorations: Exploration[];
  solution: string;
  solutionMedia?: MediaItem[];
  outcomes: Outcome[];
  metrics: Metric[];
  testimonial?: Testimonial;
  gallery: MediaItem[];
};

export const SECTION_DEFS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "process", label: "Process" },
  { id: "explorations", label: "Explorations" },
  { id: "solution", label: "Solution" },
  { id: "gallery", label: "Gallery" },
  { id: "outcomes", label: "Outcomes" },
  { id: "testimonial", label: "Testimonial" },
] as const;

export type SectionId = (typeof SECTION_DEFS)[number]["id"];

export const SAMPLE_CASE_STUDY: CaseStudy = {
  slug: "bitech-p2p",
  title: "Bitech — Reimagining P2P Crypto Trading",
  subtitle:
    "Designing a calm, trustworthy peer-to-peer trading experience for a growing African crypto exchange.",
  client: "Bitech",
  role: "Lead Product Designer",
  year: "2025",
  duration: "12 weeks",
  heroImage: "/media/chess.jpg",
  heroVideo: "/media/bitech.mp4",
  behanceEmbedUrl: "https://www.behance.net/embed/project/229327427?ilo0=1",
  overview:
    "Bitech is a peer-to-peer crypto and giftcard exchange serving 200k+ users across West Africa. The team wanted to lift conversion on the trading flow without sacrificing the trust that long-term users had built with the brand. I led the end-to-end redesign of the home, wallet, and P2P trading surfaces.",
  problem:
    "New users dropped off in the first session at 64%. Returning users opened support tickets every time a new asset shipped because navigation kept shifting. The product had grown faster than its information architecture, and the trading flow buried the most important actions behind two extra taps.",
  process: [
    {
      title: "Discovery",
      body: "Two weeks of stakeholder interviews, support ticket triage, and shadowing the trading desk to understand where users actually got stuck.",
    },
    {
      title: "Definition",
      body: "Synthesized findings into three user journeys and a single north-star metric: time-to-first-trade for new users.",
    },
    {
      title: "Design",
      body: "Six rounds of paper, low-fidelity, and high-fidelity iteration with the engineering team in the room from week one.",
    },
    {
      title: "Validation",
      body: "Unmoderated tests with 24 users and a 2-week phased rollout to 10% of traffic before going to full release.",
    },
  ],
  research: [
    {
      title: "Trust is the product",
      body: "Users would tolerate slower load times before they'd tolerate a UI that felt unfamiliar. Every change had to earn its place against the cost of relearning.",
    },
    {
      title: "Speed = wallet visibility",
      body: "Power users checked their wallet balance an average of 9 times per session. We made it the first thing on the home screen instead of a tab away.",
    },
    {
      title: "Empty states do real work",
      body: "First-time users learned the product through empty states more than through onboarding. We rewrote them as small lessons instead of decorative blanks.",
    },
  ],
  explorations: [
    {
      title: "Single-pane trade view",
      body: "Collapsed buy/sell, order book, and chat into one stacked layout so users never lose context while negotiating.",
    },
    {
      title: "Quick actions on home",
      body: "Sell Crypto and Sell Giftcards became the two anchor cards above the fold, cutting taps-to-action from 4 to 1.",
    },
    {
      title: "Adaptive referral surface",
      body: "Referrals shifted from a static banner to a contextual card that reacts to a user's wallet balance and trading history.",
    },
  ],
  solution:
    "A calmer, more confident product. The home screen leads with what users came to do, the wallet is always visible, and the P2P trading flow now lives behind a single, predictable button. Visual language tightened around a neutral palette with one warm accent reserved for value and money in motion.",
  solutionMedia: [
    {
      kind: "video",
      src: "/media/bitech.mp4",
      caption: "Home and trading flow",
      alt: "Bitech app home and trading flow",
    },
    {
      kind: "image",
      src: "/media/chess.jpg",
      caption: "Empty state direction",
      alt: "Design exploration of empty states",
    },
  ],
  outcomes: [
    {
      title: "Faster onboarding",
      body: "Time-to-first-trade dropped from 6m 12s to 2m 41s for new users.",
    },
    {
      title: "Fewer tickets",
      body: "Navigation-related support tickets fell 50% within the first three months after launch.",
    },
    {
      title: "Healthier retention",
      body: "Week-4 retention for new accounts lifted from 18% to 27%.",
    },
  ],
  metrics: [
    { value: "19%", label: "Increase in DAU and MAU" },
    { value: "50%", label: "Drop in nav-related support tickets", note: "first 3 months" },
    { value: "₦150M", label: "Expected transaction volume", note: "monthly" },
    { value: "−57%", label: "Time-to-first-trade for new users" },
  ],
  testimonial: {
    quote:
      "Miracle led the redesign with the calm of someone who's done this many times. The product feels like ours, just sharper — and the metrics moved within weeks of launch.",
    author: "Geo Adeyemi",
    role: "Head of Product, Bitech",
  },
  gallery: [
    { kind: "video", src: "/media/bitech.mp4", caption: "Trading flow", alt: "Trading flow video" },
    { kind: "video", src: "/media/nike.mp4", caption: "Motion study", alt: "Motion study video" },
    { kind: "video", src: "/media/luma.mp4", caption: "Hero motion", alt: "Hero motion video" },
    { kind: "image", src: "/media/chess.jpg", caption: "Dashboard exploration", alt: "Dashboard" },
  ],
};
