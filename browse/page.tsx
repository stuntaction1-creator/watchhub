"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { ContentCard } from "@/components/content-card";
import { CONTENT_DATA, CATEGORIES, type ContentCategory } from "@/lib/content-data";

function BrowseContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category") as ContentCategory | null;
  const [active, setActive] = useState<ContentCategory | "all">(paramCat ?? "all");

  const filtered =
    active === "all"
      ? CONTENT_DATA
      : CONTENT_DATA.filter((c) => c.category === active);

  const activeLabel = CATEGORIES.find((c) => c.id === active)?.label ?? "전체";

  return (
    <div className="min-h-screen bg-background pb-24">

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl px-4 pt-5 pb-3 space-y-3 border-b border-border/20">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-black text-foreground">탐색</h1>
          <span className="text-muted-foreground text-[11px]">{filtered.length}편</span>
        </div>

        <div className="flex gap-2 -mx-4 px-4 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id as ContentCategory | "all")}
              aria-pressed={active === id}
              className={`flex-none rounded-full px-4 py-1.5 text-[11px] font-bold whitespace-nowrap transition-colors ${
                active === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-raised border border-border text-muted-foreground active:bg-surface-high"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 pt-4 pb-3">
        <h2 className="text-foreground text-[13px] font-bold">
          {activeLabel}
          <span className="text-muted-foreground font-normal ml-1.5 text-[12px]">
            &mdash; {filtered.length}편 이용 가능
          </span>
        </h2>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} size="sm" />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-9 h-9 rounded-full border-2 border-primary/20 border-t-primary animate-spin" role="status" aria-label="로딩 중" />
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
