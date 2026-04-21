"use client";

import { usePiAuth } from "@/contexts/pi-auth-context";

export function AuthLoadingScreen() {
  const { authMessage, hasError, reinitialize } = usePiAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-8 select-none">

      {/* Layered Pi spinner */}
      <div className="relative w-28 h-28 mb-10" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-border/30" />
        <div className="absolute inset-[5px] rounded-full border border-primary/12" />
        {!hasError && (
          <div
            className="absolute inset-[-5px] rounded-full border-[3px] border-transparent border-t-primary animate-spin"
            style={{ animationDuration: "1.1s" }}
          />
        )}
        {hasError && (
          <div className="absolute inset-[-5px] rounded-full border-[3px] border-destructive/28" />
        )}
        <div className="absolute inset-[12px] rounded-full bg-primary/8 border border-primary/16 flex items-center justify-center">
          <span
            className="text-pi-gold font-black leading-none select-none"
            style={{ fontSize: "2.6rem" }}
          >
            π
          </span>
        </div>
      </div>

      {/* Brand */}
      <h1 className="text-[40px] font-black tracking-[-0.025em] leading-none text-foreground mb-1.5">
        Watch<span className="text-primary">Hub</span>
      </h1>
      <p className="text-muted-foreground text-[9px] font-bold tracking-[0.22em] uppercase mb-2">
        종합 영상 스트리밍 앱
      </p>
      <p className="text-muted-foreground/42 text-[8px] font-semibold tracking-[0.14em] uppercase mb-12">
        Web3 Entertainment &middot; Pi Network
      </p>

      {/* Status */}
      <div className="text-center max-w-[240px] space-y-2 mb-8">
        <p className="text-foreground text-[14px] font-semibold">
          {hasError ? "연결 실패" : "Pi Network 연결 중"}
        </p>
        <p className={`text-[12px] leading-relaxed ${hasError ? "text-destructive" : "text-muted-foreground"}`}>
          {authMessage}
        </p>
      </div>

      {hasError && (
        <button
          onClick={reinitialize}
          className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-bold text-[13px] active:opacity-75 transition-opacity shadow-lg shadow-primary/20"
        >
          다시 연결하기
        </button>
      )}

      <p className="absolute bottom-8 left-0 right-0 text-center text-muted-foreground/28 text-[9px] px-6 leading-relaxed">
        GCV 기반 소액결제 &middot; 법정화폐 불필요
        <br />
        구독 없음 &middot; 진정한 Web3 엔터테인먼트
      </p>
    </div>
  );
}
