"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Info, Star, TrendingUp, Flame } from "lucide-react";
import type { ContentItem } from "@/lib/content-data";

interface HeroBannerProps {
  items: ContentItem[];
}

const INTERVAL_MS = 5_600;

export function HeroBanner({ items }: HeroBannerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused,    setPaused]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActiveIdx((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(advance, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance, paused]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    setPaused(false);
  };

  const current = items[activeIdx];
  if (!current) return null;

  return (
    <section
      className="relative w-full mb-5"
      aria-label="추천 콘텐츠"
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Full-bleed 16:9 banner */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: "56vw" }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            aria-hidden={i !== activeIdx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === activeIdx ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0" style={{ backgroundColor: item.color }} />
            <Image
              src={item.banner}
              alt={i === activeIdx ? item.titleKo : ""}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
              crossOrigin="anonymous"
            />
          </div>
        ))}

        {/* Cinematic scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/12 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/52 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/48 to-transparent pointer-events-none" />

        {/* Rating badge */}
        <div className="absolute top-2.5 left-3 flex items-center gap-[3px] bg-black/62 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-[5px]">
          <Star size={8} className="text-accent fill-accent" />
          <span className="text-white text-[10px] font-bold leading-none">{current.rating}</span>
        </div>

        {/* Pi price badge */}
        <div className="absolute top-2.5 right-3 flex items-center gap-[2px] bg-black/62 backdrop-blur-md border border-pi-gold/26 rounded-full px-2.5 py-[5px]">
          <span className="text-pi-gold font-black text-[12px] leading-none">π</span>
          <span className="text-pi-gold font-bold text-[10px] leading-none">{current.priceInPi}</span>
        </div>
      </div>

      {/* Info panel */}
      <div className="relative -mt-14 px-4 z-10">
        {/* Pills row */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className="inline-flex items-center text-[7.5px] font-black uppercase tracking-[0.12em] text-primary border border-primary/28 bg-primary/10 rounded-full px-[8px] py-[4px]">
            {current.genre}
          </span>
          {current.isNew && (
            <span className="inline-flex items-center text-[7.5px] font-black uppercase tracking-[0.12em] text-accent border border-accent/26 bg-accent/10 rounded-full px-[8px] py-[4px]">
              신규
            </span>
          )}
          {current.isTrending && (
            <span className="inline-flex items-center gap-[3px] text-[7.5px] font-black uppercase tracking-[0.12em] text-rose-400 border border-rose-400/22 bg-rose-400/8 rounded-full px-[8px] py-[4px]">
              <Flame size={7} />인기
            </span>
          )}
          {current.episodes && (
            <span className="inline-flex items-center text-[7.5px] font-bold text-muted-foreground border border-border/38 bg-surface/50 rounded-full px-[8px] py-[4px]">
              {current.episodes}부작
            </span>
          )}
        </div>

        {/* Korean title */}
        <h2 className="text-[30px] font-black text-foreground leading-[1.0] tracking-[-0.01em] text-balance mb-[3px]">
          {current.titleKo}
        </h2>
        <p className="text-muted-foreground/48 text-[10px] font-medium mb-2">{current.title}</p>

        {/* Meta */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
          <span className="text-muted-foreground text-[10.5px]">{current.year}</span>
          <span className="text-border/42 text-[8px]">&middot;</span>
          <span className="text-muted-foreground text-[10.5px]">{current.duration}</span>
          {current.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-muted-foreground/42 text-[10.5px]">&middot; {tag}</span>
          ))}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-2 mb-4 pr-6">
          {current.description}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            href={`/watch/${current.id}`}
            className="flex items-center justify-center gap-[6px] bg-primary text-primary-foreground rounded-full px-5 py-[11px] text-[12.5px] font-bold flex-1 active:opacity-75 transition-opacity shadow-lg shadow-primary/22"
          >
            <Play size={11} fill="currentColor" />
            지금 보기
          </Link>
          <Link
            href={`/watch/${current.id}`}
            aria-label={`${current.titleKo} 상세정보`}
            className="w-10 h-10 flex items-center justify-center bg-surface/68 backdrop-blur-sm border border-border rounded-full flex-none active:opacity-70 transition-opacity"
          >
            <Info size={15} className="text-foreground" />
          </Link>
          <button
            aria-label={`${current.titleKo} 찜하기`}
            className="w-10 h-10 flex items-center justify-center bg-surface/68 backdrop-blur-sm border border-border rounded-full flex-none active:opacity-70 transition-opacity"
          >
            <Plus size={15} className="text-foreground" />
          </button>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-[5px]" role="tablist" aria-label="추천 슬라이드">
          {items.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={`슬라이드 ${i + 1}: ${item.titleKo}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx ? "bg-primary w-5 h-[3px]" : "bg-muted-foreground/18 w-[3px] h-[3px]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
