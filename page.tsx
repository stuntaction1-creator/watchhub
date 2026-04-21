"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Play } from "lucide-react";
import { HeroBanner } from "@/components/hero-banner";
import { ContentCarousel } from "@/components/content-carousel";
import { CategoryPills } from "@/components/category-pills";
import { BottomNav } from "@/components/bottom-nav";
import {
  FEATURED_CONTENT,
  TRENDING_CONTENT,
  NEW_CONTENT,
  DRAMAS,
  DOCUMENTARIES,
  ENTERTAINMENT,
  SERIES,
  CONTINUE_WATCHING,
} from "@/lib/content-data";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background pb-28">

      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 pt-5 pb-3 bg-background/95 backdrop-blur-2xl border-b border-border/16">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-primary flex items-center justify-center shadow-md shadow-primary/22">
            <span className="text-primary-foreground font-black text-[18px] leading-none select-none">W</span>
          </div>
          <div>
            <h1 className="text-foreground text-[20px] font-black tracking-[-0.01em] leading-none">
              Watch<span className="text-primary">Hub</span>
            </h1>
            <p className="text-muted-foreground/45 text-[7px] font-bold tracking-[0.2em] uppercase leading-none mt-[2px]">
              종합 영상 스트리밍
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* GCV pill */}
          <div className="flex items-center gap-[3px] bg-pi-gold/10 border border-pi-gold/18 rounded-full px-2.5 py-[5px]">
            <span className="text-pi-gold text-[12px] font-black leading-none">π</span>
            <span className="text-pi-gold text-[8px] font-bold leading-none tracking-wider uppercase">GCV</span>
          </div>
          {/* Bell */}
          <button
            aria-label="알림"
            className="relative w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center active:opacity-70 transition-opacity"
          >
            <Bell size={15} className="text-foreground" />
            <span
              aria-hidden="true"
              className="absolute top-[8px] right-[8px] w-[6px] h-[6px] bg-primary rounded-full border-2 border-background"
            />
          </button>
        </div>
      </header>

      {/* Hero */}
      <HeroBanner items={FEATURED_CONTENT} />

      {/* Category pills */}
      <CategoryPills />

      {/* Continue watching */}
      <section className="mb-7 px-4" aria-label="이어 보기">
        <h2 className="text-foreground text-[13.5px] font-bold mb-3">이어 보기</h2>
        <div className="flex gap-3 -mx-4 px-4 overflow-x-auto no-scrollbar pb-0.5">
          {CONTINUE_WATCHING.map((item) => (
            <Link
              key={item.id}
              href={`/watch/${item.id}`}
              className="flex-none w-[180px] group select-none"
              aria-label={`${item.titleKo} 이어 보기`}
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.06]" style={{ backgroundColor: item.color }}>
                <Image
                  src={item.banner}
                  alt={item.titleKo}
                  fill
                  className="object-cover group-active:scale-[0.97] transition-transform duration-300"
                  sizes="200px"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm border border-white/14 flex items-center justify-center">
                    <Play size={13} fill="white" className="text-white ml-px" />
                  </div>
                </div>
                {/* Episode label */}
                <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-sm rounded-full px-2 py-[3px]">
                  <span className="text-white text-[8px] font-bold">{item.episode}화</span>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/12">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${item.progress}%` }}
                    aria-label={`${item.progress}% 시청 완료`}
                  />
                </div>
              </div>
              <p className="mt-1.5 text-foreground text-[10.5px] font-semibold leading-tight line-clamp-1">{item.titleKo}</p>
              <p className="text-muted-foreground text-[9px] mt-[2px]">{item.progress}% 시청</p>
            </Link>
          ))}
          <div className="flex-none w-2" aria-hidden="true" />
        </div>
      </section>

      {/* Pi Web3 banner */}
      <div className="mx-4 mb-7 rounded-2xl border border-primary/12 bg-primary/5 px-4 py-3.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/16 flex items-center justify-center flex-none">
          <span className="text-pi-gold text-[20px] font-black leading-none select-none">π</span>
        </div>
        <div className="min-w-0">
          <p className="text-foreground text-[12px] font-bold leading-tight">Pi Network Web3 엔터테인먼트</p>
          <p className="text-muted-foreground text-[10px] mt-[3px] leading-snug">
            GCV 기반 Pi 소액결제 — 구독료 없음, 법정화폐 불필요.
          </p>
        </div>
      </div>

      {/* Content rows */}
      <ContentCarousel title="지금 인기"        items={TRENDING_CONTENT} seeAllHref="/browse"                       size="lg" />
      <ContentCarousel title="신규 공개"         items={NEW_CONTENT}      seeAllHref="/browse"                       size="md" />
      <ContentCarousel title="드라마"            items={DRAMAS}           seeAllHref="/browse?category=drama"        size="md" />
      <ContentCarousel title="다큐멘터리"        items={DOCUMENTARIES}    seeAllHref="/browse?category=documentary"  size="md" />
      <ContentCarousel title="예능 · 버라이어티" items={ENTERTAINMENT}    seeAllHref="/browse?category=entertainment" size="md" />
      <ContentCarousel title="시리즈"            items={SERIES}           seeAllHref="/browse?category=series"       size="md" />

      {/* Footer */}
      <div className="mx-4 mt-4 mb-2 rounded-2xl bg-surface border border-border px-5 py-5 text-center">
        <p className="text-foreground text-[12.5px] font-bold mb-1.5">
          Watch<span className="text-primary">Hub</span> &times; Pi Network
        </p>
        <p className="text-muted-foreground text-[10.5px] leading-relaxed">
          모든 가격은 GCV(글로벌 합의 가치)를 따릅니다.
          <br />
          구독료 없음. 법정화폐 없음. 진정한 Web3 엔터테인먼트.
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
