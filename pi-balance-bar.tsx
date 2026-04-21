"use client";

import { Wallet, ChevronRight } from "lucide-react";
import Link from "next/link";

export function PiBalanceBar() {
  return (
    <Link
      href="/profile"
      className="flex items-center justify-between bg-surface-raised border border-pi-gold/16 rounded-2xl px-4 py-3 mx-4 mb-5 active:opacity-80 transition-opacity"
      aria-label="Pi 지갑 잔액 보기"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-pi-gold/14 border border-pi-gold/22 flex items-center justify-center">
          <Wallet size={15} className="text-pi-gold" />
        </div>
        <div>
          <p className="text-[9.5px] font-semibold text-muted-foreground uppercase tracking-[0.1em]">
            Pi 잔액
          </p>
          <div className="flex items-baseline gap-[3px]">
            <span className="text-pi-gold font-black text-[16px] leading-none">π</span>
            <span className="text-foreground font-bold text-[16px] leading-none">10.5000</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-muted-foreground/48 text-[9px] font-semibold">충전하기</span>
        <ChevronRight size={13} className="text-muted-foreground/42" />
      </div>
    </Link>
  );
}
