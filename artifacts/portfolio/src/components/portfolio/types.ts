export type PortfolioItem = {
  id: number;
  title: string;
  type: "image" | "mp4" | "video";
  src?: string;
  category?: string;
  description?: string;
  year?: string;
  empty?: boolean;
};
