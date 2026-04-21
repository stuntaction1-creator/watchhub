"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Star } from "lucide-react";
import type { ContentItem } from "@/lib/content-data";

interface TopChartsProps {
  items: ContentItem[];
}

export function TopCharts({ items }: TopChartsProps) {
  const top10 = items.slice(0, 10);

  return (
    <section className="mb-7 px-4" aria-label="TOP 10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-accent" />
          <h2 className="text-foreground text-[13.5px] font-bold tracking-tight">오늘의 TOP 10</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {top10.map((item, i) => (
          <Link
            key={item.id}
            href={`/watch/${item.id}`}
            className="flex items-center gap-3 bg-surface-raised border border-border rounded-2xl px-3 py-2.5 active:opacity-70 transition-opacity group"
          >
            {/* Rank number */}
            <span
              className={`font-black text-[17px] leading-none flex-none w-6 text-center ${
                i === 0
                  ? "text-accent"
                  : i === 1
                  ? "text-muted-foreground"
                  : i === 2
                  ? "text-amber-700"
                  : "text-border"
              }`}
            >
              {i + 1}
            </span>

            {/* Thumbnail */}
            <div
              className="relative w-9 h-[52px] rounded-[8px] overflow-hidden flex-none"
              style={{ backgroundColor: item.color }}
            >
              <Image
                src={item.thumbnail}
                alt={item.titleKo}
                fill
                className="object-cover"
                sizes="38px"
                crossOrigin="anonymous"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-foreground text-[11px] font-semibold leading-snug line-clamp-2 text-pretty mb-1">
                {item.titleKo}
              </p>
              <div className="flex items-center gap-1">
                <Star size={7} className="text-accent fill-accent flex-none" />
                <span className="text-muted-foreground text-[9px]">{item.rating}</span>
                <span className="text-border/42 text-[8px]">&middot;</span>
                <span className="text-muted-foreground/55 text-[9px] truncate">{item.genre}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
