"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Play, Compass, User } from "lucide-react";

const TABS = [
  { href: "/",        label: "홈",   Icon: Home    },
  { href: "/search",  label: "검색", Icon: Search  },
  { href: "/live",    label: "LIVE", Icon: Play    },
  { href: "/browse",  label: "탐색", Icon: Compass },
  { href: "/profile", label: "MY",   Icon: User    },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-2xl border-t border-border/42"
      aria-label="기본 탐색"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="flex items-stretch" role="list">
        {TABS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className="flex flex-col items-center justify-center gap-[4px] w-full h-full py-[10px] transition-colors"
              >
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.3 : 1.65}
                  className={isActive ? "text-primary" : "text-muted-foreground/54"}
                />
                <span
                  className={`text-[9px] font-bold tracking-tight leading-none ${
                    isActive ? "text-primary" : "text-muted-foreground/44"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
