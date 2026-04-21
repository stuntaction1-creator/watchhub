"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CHANNELS } from "@/lib/content-data";

export function ChannelRow() {
  return (
    <section className="mb-7" aria-label="방송국">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-foreground text-[13.5px] font-bold tracking-tight">방송국</h2>
        <Link
          href="/channels"
          className="flex items-center gap-[2px] text-primary text-[11px] font-semibold active:opacity-70 transition-opacity"
        >
          전체보기
          <ChevronRight size={11} strokeWidth={2.5} />
        </Link>
      </div>

      <div className="flex gap-3 pl-4 overflow-x-auto no-scrollbar pb-0.5">
        {CHANNELS.map((ch) => (
          <Link
            key={ch.id}
            href={`/channel/${ch.id}`}
            className="flex-none flex flex-col items-center gap-2 active:opacity-70 transition-opacity"
            aria-label={`${ch.name} 채널`}
          >
            {/* Logo circle */}
            <div
              className="w-[54px] h-[54px] rounded-[18px] overflow-hidden border border-border/48 flex items-center justify-center"
              style={{ backgroundColor: ch.color }}
            >
              <Image
                src={ch.logo}
                alt={ch.name}
                width={54}
                height={54}
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <span className="text-muted-foreground text-[9.5px] font-semibold">{ch.name}</span>
          </Link>
        ))}
        <div className="flex-none w-2" aria-hidden="true" />
      </div>
    </section>
  );
}
