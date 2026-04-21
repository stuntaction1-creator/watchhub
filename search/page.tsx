"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { ContentCard } from "@/components/content-card";
import { CONTENT_DATA, CATEGORIES, GENRES, GENRE_IMAGES } from "@/lib/content-data";

export default function SearchPage() {
  const [query,    setQuery]    = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    let list = CONTENT_DATA;
    if (category !== "all") list = list.filter((c) => c.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.titleKo.toLowerCase().includes(q) ||
          c.genre.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [query, category]);

  const isFiltered = query.trim() !== "" || category !== "all";

  return (
    <div className="min-h-screen bg-background pb-24">

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl px-4 pt-5 pb-3 space-y-3 border-b border-border/20">
        <h1 className="text-[22px] font-black text-foreground">검색</h1>

        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="제목, 장르, 태그로 검색..."
            aria-label="콘텐츠 검색"
            className="w-full bg-surface-raised border border-border rounded-2xl pl-10 pr-10 py-[11px] text-[13px] text-foreground placeholder:text-muted-foreground/48 focus:outline-none focus:border-primary transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="검색어 지우기" className="absolute right-3.5 top-1/2 -translate-y-1/2 active:opacity-70">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="flex gap-2 -mx-4 px-4 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              aria-pressed={category === id}
              className={`flex-none rounded-full px-4 py-1.5 text-[11px] font-bold whitespace-nowrap transition-colors ${
                category === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-raised border border-border text-muted-foreground active:bg-surface-high"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 pt-4">

        {!isFiltered && (
          <>
            <div className="mb-7">
              <div className="flex items-center gap-1.5 mb-3">
                <Sparkles size={12} className="text-primary" />
                <h2 className="text-foreground text-[13px] font-bold">장르별 탐색</h2>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {GENRES.map((genre) => {
                  const imgSrc = GENRE_IMAGES[genre];
                  return (
                    <button
                      key={genre}
                      onClick={() => setQuery(genre)}
                      className="relative overflow-hidden rounded-2xl h-[66px] border border-border/26 active:opacity-80 transition-opacity flex items-center justify-center"
                      aria-label={`${genre} 장르 탐색`}
                    >
                      {imgSrc && (
                        <Image src={imgSrc} alt="" fill className="object-cover" sizes="(max-width: 390px) 160px, 200px" crossOrigin="anonymous" />
                      )}
                      <div className="absolute inset-0 bg-black/54" />
                      <span className="relative z-10 text-white text-[12.5px] font-bold drop-shadow-sm">{genre}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <h2 className="text-foreground text-[13px] font-bold mb-3">전체 콘텐츠</h2>
            <div className="grid grid-cols-3 gap-3">
              {CONTENT_DATA.map((item) => (
                <ContentCard key={item.id} item={item} size="sm" />
              ))}
            </div>
          </>
        )}

        {isFiltered && (
          <>
            <p className="text-muted-foreground text-[11.5px] mb-4">
              검색 결과 {results.length}건{query.trim() ? ` — "${query.trim()}"` : ""}
            </p>

            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Search size={46} className="text-muted-foreground/10" aria-hidden="true" />
                <p className="text-foreground text-[14px] font-semibold">검색 결과 없음</p>
                <p className="text-muted-foreground text-[12px] text-center max-w-[200px]">
                  다른 키워드나 카테고리로 시도해 보세요
                </p>
                <button
                  onClick={() => { setQuery(""); setCategory("all"); }}
                  className="mt-2 px-5 py-2.5 bg-surface-raised border border-border rounded-full text-[11.5px] font-bold text-foreground active:opacity-70"
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {results.map((item) => (
                  <ContentCard key={item.id} item={item} size="sm" />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
