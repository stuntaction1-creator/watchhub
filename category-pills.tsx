"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/content-data";

export function CategoryPills() {
  const [active, setActive] = useState<string>("all");

  return (
    <div
      className="flex gap-2 px-4 mb-5 overflow-x-auto no-scrollbar"
      role="tablist"
      aria-label="콘텐츠 카테고리"
    >
      {CATEGORIES.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <Link
            key={id}
            href={id === "all" ? "/" : `/browse?category=${id}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(id)}
            className={`flex-none rounded-full px-4 py-[7px] text-[11.5px] font-bold whitespace-nowrap transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "bg-surface-raised border border-border text-muted-foreground active:bg-surface-high"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
