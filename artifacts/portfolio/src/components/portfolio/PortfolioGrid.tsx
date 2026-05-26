import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectPreviewModal } from "./ProjectPreviewModal";
import { Reveal } from "@/components/Reveal";
import type { PortfolioItem } from "./types";

type Props = { items: PortfolioItem[] };

export function PortfolioGrid({ items }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [openerId, setOpenerId] = useState<number | null>(null);

  // Only real (non-empty) items are navigable in the modal
  const navigableItems = items.filter((i) => !i.empty);

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
        {items.map((item, index) => (
          <Reveal
            key={item.id}
            variant="up"
            distance={36}
            duration={800}
            delay={(index % 2) * 120 + Math.floor(index / 2) * 80}
          >
            <ProjectCard
              item={item}
              onOpen={(i) => {
                setOpenerId(i.id);
                setActiveId(i.id);
              }}
            />
          </Reveal>
        ))}
      </div>
      <ProjectPreviewModal
        items={navigableItems}
        activeId={activeId}
        openerId={openerId}
        onClose={() => {
          setActiveId(null);
          window.setTimeout(() => setOpenerId(null), 500);
        }}
        onNavigate={(id) => setActiveId(id)}
      />
    </LayoutGroup>
  );
}
