"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

export function TopAppBar() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 bg-background/88 backdrop-blur-2xl border-b border-border/28"
      style={{
        paddingTop: "max(env(safe-area-inset-top, 0px), 8px)",
        paddingBottom: "10px",
        minHeight: "52px",
      }}
    >
      {/* Brand */}
      <Link href="/" className="flex items-baseline gap-0.5" aria-label="WatchHub 홈">
        <span className="text-[20px] font-black tracking-[-0.02em] leading-none text-foreground">
          Watch
        </span>
        <span className="text-[20px] font-black tracking-[-0.02em] leading-none text-primary">
          Hub
        </span>
        <span className="text-pi-gold font-black text-[11px] ml-[2px] leading-none">π</span>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <Link
          href="/search"
          aria-label="검색"
          className="w-9 h-9 flex items-center justify-center rounded-full active:bg-surface-raised transition-colors"
        >
          <Search size={18} className="text-foreground" />
        </Link>

        <button
          aria-label="알림"
          className="relative w-9 h-9 flex items-center justify-center rounded-full active:bg-surface-raised transition-colors"
        >
          <Bell size={18} className="text-foreground" />
          <span className="absolute top-[8px] right-[8px] w-[6px] h-[6px] bg-accent rounded-full border-[1.5px] border-background" />
        </button>

        <Link
          href="/profile"
          aria-label="내 프로필"
          className="w-9 h-9 rounded-full bg-primary/16 border border-primary/28 flex items-center justify-center ml-1 active:opacity-70 transition-opacity"
        >
          <span className="text-primary font-black text-[12px]">P</span>
        </Link>
      </div>
    </header>
  );
}
