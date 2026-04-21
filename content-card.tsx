"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Play } from "lucide-react";
import type { ContentItem } from "@/lib/content-data";

interface ContentCardProps {
  item: ContentItem;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: { wrap: "w-[108px]", img: "h-[154px]" },
  md: { wrap: "w-[138px]", img: "h-[196px]" },
  lg: { wrap: "w-[162px]", img: "h-[232px]" },
} as const;

export function ContentCard({ item, size = "md" }: ContentCardProps) {
  const { wrap, img } = SIZE[size];

  return (
    <Link
      href={`/watch/${item.id}`}
      className={`flex-none ${wrap} group select-none`}
      aria-label={`${item.titleKo} 보기`}
    >
      {/* Poster */}
      <div
        className={`relative ${img} rounded-[14px] overflow-hidden border border-white/[0.06]`}
        style={{ backgroundColor: item.color }}
      >
        <Image
          src={item.thumbnail}
          alt={item.titleKo}
          fill
          className="object-cover transition-transform duration-300 group-active:scale-[0.97]"
          sizes="180px"
          crossOrigin="anonymous"
        />

        {/* Bottom scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/6 to-transparent pointer-events-none" />

        {/* Status badge */}
        {item.isNew ? (
          <span className="absolute top-[6px] left-[6px] bg-primary text-primary-foreground text-[7px] font-black px-[7px] py-[3.5px] rounded-[5px] tracking-[0.08em] uppercase leading-none shadow-md shadow-primary/32">
            신규
          </span>
        ) : item.isTrending ? (
          <span className="absolute top-[6px] left-[6px] bg-accent text-accent-foreground text-[7px] font-black px-[7px] py-[3.5px] rounded-[5px] tracking-[0.08em] uppercase leading-none">
            인기
          </span>
        ) : null}

        {/* Pi price chip */}
        <div className="absolute bottom-[7px] right-[7px] flex items-center gap-[2px] bg-black/85 backdrop-blur-sm border border-pi-gold/16 rounded-full px-[6px] py-[3px]">
          <span className="text-pi-gold text-[9px] font-black leading-none">π</span>
          <span className="text-white/85 text-[8px] font-bold leading-none">{item.priceInPi}</span>
        </div>

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/40">
            <Play size={11} fill="white" className="text-white ml-[1px]" />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-[7px] px-[1px] space-y-[3px]">
        <p className="text-foreground text-[11px] font-semibold leading-snug line-clamp-2 text-pretty">
          {item.titleKo}
        </p>
        <div className="flex items-center gap-[3px]">
          <Star size={7} className="text-accent fill-accent flex-none" />
          <span className="text-muted-foreground text-[9px] font-medium">{item.rating}</span>
          <span className="text-border/42 text-[8px]">&middot;</span>
          <span className="text-muted-foreground/55 text-[9px] truncate">{item.genre}</span>
        </div>
      </div>
    </Link>
  );
}
