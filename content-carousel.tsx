"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ContentItem } from "@/lib/content-data";
import { ContentCard } from "./content-card";

interface ContentCarouselProps {
  title: string;
  items: ContentItem[];
  seeAllHref?: string;
  size?: "sm" | "md" | "lg";
}

export function ContentCarousel({
  title,
  items,
  seeAllHref,
  size = "md",
}: ContentCarouselProps) {
  if (!items.length) return null;

  return (
    <section className="mb-7" aria-label={title}>
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-foreground text-[13.5px] font-bold tracking-tight">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="flex items-center gap-[2px] text-primary text-[11px] font-semibold active:opacity-70 transition-opacity"
          >
            전체보기
            <ChevronRight size={11} strokeWidth={2.5} />
          </Link>
        )}
      </div>

      <div className="flex gap-3 pl-4 overflow-x-auto no-scrollbar pb-0.5">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} size={size} />
        ))}
        <div className="flex-none w-2" aria-hidden="true" />
      </div>
    </section>
  );
}
