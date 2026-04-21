"use client";

import Link from "next/link";
import { Film, Tv, Zap, Heart, Globe, Swords, Smile, Music2 } from "lucide-react";

const GENRES = [
  { id: "drama", label: "드라마",   icon: Tv,    color: "from-violet-600/40 to-violet-900/28" },
  { id: "movie", label: "영화",    icon: Film,   color: "from-blue-600/40 to-blue-900/28" },
  { id: "action", label: "액션",   icon: Zap,    color: "from-rose-600/40 to-rose-900/28" },
  { id: "romance", label: "로맨스", icon: Heart,  color: "from-pink-600/40 to-pink-900/28" },
  { id: "world", label: "해외드라마", icon: Globe, color: "from-teal-600/40 to-teal-900/28" },
  { id: "fantasy", label: "판타지", icon: Swords, color: "from-amber-600/40 to-amber-900/28" },
  { id: "comedy", label: "코미디", icon: Smile,  color: "from-green-600/40 to-green-900/28" },
  { id: "music",  label: "음악",   icon: Music2,  color: "from-cyan-600/40 to-cyan-900/28" },
] as const;

export function GenreGrid() {
  return (
    <section className="mb-7 px-4" aria-label="장르">
      <h2 className="text-foreground text-[13.5px] font-bold tracking-tight mb-3">장르별 보기</h2>
      <div className="grid grid-cols-4 gap-2">
        {GENRES.map(({ id, label, icon: Icon, color }) => (
          <Link
            key={id}
            href={`/browse?category=${id}`}
            className={`flex flex-col items-center justify-center gap-[6px] rounded-2xl bg-gradient-to-br ${color} border border-white/[0.07] aspect-square active:opacity-72 transition-opacity`}
          >
            <Icon size={18} className="text-white/82" />
            <span className="text-white text-[9.5px] font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
