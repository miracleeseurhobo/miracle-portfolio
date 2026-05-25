import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectPreviewModal } from "./ProjectPreviewModal";
import type { PortfolioItem } from "./types";

type Props = { items: PortfolioItem[] };

export function PortfolioGrid({ items }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [openerId, setOpenerId] = useState<number | null>(null);

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
        {items.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
            onOpen={(i) => {
              setOpenerId(i.id);
              setActiveId(i.id);
            }}
          />
        ))}
      </div>
      <ProjectPreviewModal
        items={items}
        activeId={activeId}
        openerId={openerId}
        onClose={() => {
          setActiveId(null);
          // keep openerId until exit completes so layout animation has a target
          window.setTimeout(() => setOpenerId(null), 500);
        }}
        onNavigate={(id) => setActiveId(id)}
      />
    </LayoutGroup>
  );
}
