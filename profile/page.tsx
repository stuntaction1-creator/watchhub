"use client";

import { usePiAuth } from "@/contexts/pi-auth-context";
import { BottomNav } from "@/components/bottom-nav";
import {
  UserCircle2,
  Wallet,
  Film,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Bookmark,
  Globe,
  Info,
  Settings,
  Bell,
  BadgeCheck,
  Zap,
  PlayCircle,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const MENU = [
  {
    section: "라이브러리",
    rows: [
      { Icon: Film,       label: "내 보관함",  sub: "구매 및 소유한 콘텐츠"  },
      { Icon: Bookmark,   label: "찜 목록",    sub: "나중에 볼 항목"          },
      { Icon: PlayCircle, label: "시청 기록",  sub: "최근 재생 콘텐츠"        },
      { Icon: Clock,      label: "이어 보기",  sub: "중단한 콘텐츠 계속 보기" },
    ],
  },
  {
    section: "계정",
    rows: [
      { Icon: Wallet,      label: "Pi 지갑",        sub: "Pi 잔액 관리"         },
      { Icon: ShieldCheck, label: "개인정보 · 보안", sub: "계정 및 데이터 설정"  },
      { Icon: Bell,        label: "알림",            sub: "알림 및 업데이트"     },
      { Icon: Settings,    label: "환경설정",        sub: "화면 및 재생 설정"    },
      { Icon: Globe,       label: "언어 · 지역",     sub: "한국어 · 글로벌"      },
    ],
  },
  {
    section: "정보",
    rows: [
      { Icon: Info, label: "WatchHub 정보", sub: "v1.0.0 · Pi Network 앱" },
    ],
  },
] as const;

export default function ProfilePage() {
  const { restoredPurchases } = usePiAuth();
  const owned = restoredPurchases?.length ?? 0;

  const stats = [
    { label: "시청",   value: String(owned * 3 + 8), Icon: PlayCircle  },
    { label: "소유",   value: String(owned),          Icon: Film        },
    { label: "찜",     value: "5",                    Icon: Bookmark    },
    { label: "이번 주", value: String(owned + 2),     Icon: TrendingUp  },
  ] as const;

  /* Mock Pi balance derived from purchases */
  const piBalance = (10.5 - owned * 0.75).toFixed(2);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-4 pt-5 pb-4 border-b border-border/20">
        <h1 className="text-[22px] font-black text-foreground">프로필</h1>
      </header>

      <div className="px-4 pt-4 space-y-4">

        {/* User identity card */}
        <div className="bg-surface border border-border rounded-2xl p-4 flex items-center gap-4">
          <div className="relative flex-none">
            <div className="w-[56px] h-[56px] rounded-full bg-primary/10 border-2 border-primary/22 flex items-center justify-center ring-2 ring-primary/8 ring-offset-2 ring-offset-background">
              <UserCircle2 size={30} className="text-primary" />
            </div>
            <span className="absolute bottom-0 right-0 w-[15px] h-[15px] bg-emerald-400 border-2 border-background rounded-full flex items-center justify-center">
              <BadgeCheck size={8} className="text-background" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold text-[15px] leading-tight">Pi 파이오니어</p>
            <p className="text-muted-foreground text-[10.5px] mt-[3px]">Pi Network 인증 사용자</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="flex items-center gap-[3px] bg-emerald-500/10 border border-emerald-500/18 rounded-full px-2 py-[3px]">
                <BadgeCheck size={9} className="text-emerald-400" />
                <span className="text-emerald-400 text-[8px] font-bold">KYC 인증</span>
              </span>
              <span className="flex items-center gap-[3px] bg-pi-gold/10 border border-pi-gold/18 rounded-full px-2 py-[3px]">
                <Zap size={9} className="text-pi-gold" />
                <span className="text-pi-gold text-[8px] font-bold">GCV 활성화</span>
              </span>
            </div>
          </div>

          <span aria-hidden="true" className="text-pi-gold text-[38px] font-black leading-none select-none flex-none">π</span>
        </div>

        {/* Pi wallet widget */}
        <div className="bg-primary/8 border border-primary/16 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wallet size={14} className="text-primary" />
              <span className="text-foreground text-[12.5px] font-bold">Pi 지갑 잔액</span>
            </div>
            <button className="flex items-center gap-1 text-primary text-[11px] font-semibold active:opacity-70">
              관리
              <ArrowUpRight size={11} />
            </button>
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-pi-gold text-[28px] font-black leading-none">π</span>
            <span className="text-foreground text-[28px] font-black leading-none">{piBalance}</span>
          </div>
          <p className="text-muted-foreground text-[10.5px]">GCV 기반 · 실시간 업데이트</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="bg-surface border border-border rounded-xl py-3 flex flex-col items-center gap-[5px]">
              <Icon size={12} className="text-primary" />
              <span className="text-foreground text-[20px] font-black leading-none">{value}</span>
              <span className="text-muted-foreground text-[8.5px] font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Pi callout */}
        <div className="bg-surface border border-border rounded-2xl px-4 py-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span aria-hidden="true" className="text-pi-gold font-black text-[18px] leading-none select-none">π</span>
            <span className="text-foreground text-[13px] font-bold">WatchHub &times; Pi Network</span>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            모든 구매는 GCV(글로벌 합의 가치) 기반 Pi 소액결제를 사용합니다.
            법정화폐 없음, 구독 없음 — 진정한 Web3 엔터테인먼트.
          </p>
        </div>

        {/* Menu sections */}
        {MENU.map(({ section, rows }) => (
          <div key={section}>
            <p className="text-muted-foreground text-[8.5px] font-bold uppercase tracking-[0.15em] mb-2 px-0.5">
              {section}
            </p>
            <div className="bg-surface border border-border rounded-2xl overflow-hidden divide-y divide-border/32">
              {rows.map(({ Icon, label, sub }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-surface-raised transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-surface-raised flex items-center justify-center flex-none">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-[13px] font-semibold leading-tight">{label}</p>
                    <p className="text-muted-foreground text-[10px] mt-[2px] truncate">{sub}</p>
                  </div>
                  <ChevronRight size={13} className="text-muted-foreground/38 flex-none" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="w-full flex items-center justify-center gap-2 bg-destructive/8 border border-destructive/14 text-destructive rounded-2xl py-4 text-[13px] font-bold active:opacity-70 transition-opacity">
          <LogOut size={15} />
          로그아웃
        </button>

        <p className="text-center text-muted-foreground/28 text-[9px] pb-2">
          WatchHub · Pi Network 기반 · Made with App Studio
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
