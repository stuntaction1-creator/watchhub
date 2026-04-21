"use client";

import { useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { ContentItem } from "@/lib/content-data";
import { usePurchase } from "@/lib/pi-payment";

interface PiPaymentModalProps {
  item: ContentItem;
  onSuccess: () => void;
  onClose: () => void;
}

type Phase = "confirm" | "processing" | "success" | "error";

export function PiPaymentModal({ item, onSuccess, onClose }: PiPaymentModalProps) {
  const { makePurchase } = usePurchase();
  const [phase, setPhase] = useState<Phase>("confirm");
  const [errMsg, setErrMsg] = useState("");

  const handlePay = async () => {
    setPhase("processing");
    try {
      await makePurchase(item.id);
      setPhase("success");
      setTimeout(onSuccess, 1_600);
    } catch (e: unknown) {
      setErrMsg(e instanceof Error ? e.message : "결제에 실패했습니다.");
      setPhase("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Pi 결제"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/72 backdrop-blur-sm"
        onClick={phase === "processing" ? undefined : onClose}
      />

      {/* Sheet */}
      <div className="relative bg-background border-t border-border rounded-t-[28px] px-5 pt-6 pb-10 animate-in slide-in-from-bottom-4 duration-300">
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-[3.5px] rounded-full bg-border/62" aria-hidden="true" />

        {/* Close */}
        {phase !== "processing" && (
          <button
            onClick={onClose}
            aria-label="닫기"
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-surface-raised active:opacity-70"
          >
            <X size={15} className="text-foreground" />
          </button>
        )}

        {/* ── Confirm phase ── */}
        {phase === "confirm" && (
          <>
            <h2 className="text-foreground text-[17px] font-black mb-5">결제 확인</h2>

            {/* Item summary */}
            <div className="flex items-center gap-3 bg-surface-raised border border-border rounded-2xl px-4 py-3.5 mb-5">
              <div className="w-10 h-14 rounded-[10px] overflow-hidden flex-none" style={{ backgroundColor: item.color }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.thumbnail} alt={item.titleKo} className="w-full h-full object-cover" crossOrigin="anonymous" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-[13px] font-bold line-clamp-2 text-pretty mb-1">
                  {item.titleKo}
                </p>
                <p className="text-muted-foreground text-[10px]">{item.genre} · {item.year}</p>
              </div>
              <div className="flex-none text-right">
                <div className="flex items-baseline gap-[2px]">
                  <span className="text-pi-gold font-black text-[18px] leading-none">π</span>
                  <span className="text-foreground font-bold text-[18px] leading-none">{item.priceInPi}</span>
                </div>
                <p className="text-muted-foreground/42 text-[9px] mt-0.5">GCV 기준</p>
              </div>
            </div>

            {/* GCV note */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-muted-foreground text-[12px]">결제 방식</span>
              <div className="flex items-center gap-1.5">
                <span className="text-pi-gold font-black text-[14px] leading-none">π</span>
                <span className="text-foreground font-bold text-[13px]">Pi Network · GCV</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-[14.5px] transition-opacity shadow-lg shadow-primary/22 active:opacity-80"
            >
              {`π ${item.priceInPi} 결제하기`}
            </button>
          </>
        )}

        {/* ── Processing phase ── */}
        {phase === "processing" && (
          <div className="flex flex-col items-center py-8 gap-4">
            <Loader2 size={44} className="text-primary animate-spin" />
            <p className="text-foreground text-[15px] font-bold">Pi Network 결제 중…</p>
            <p className="text-muted-foreground text-[11.5px] text-center leading-relaxed">
              Pi SDK와 통신 중입니다.
              <br />
              잠시만 기다려 주세요.
            </p>
          </div>
        )}

        {/* ── Success phase ── */}
        {phase === "success" && (
          <div className="flex flex-col items-center py-8 gap-4">
            <CheckCircle size={52} className="text-green-500" />
            <p className="text-foreground text-[16px] font-black">결제 완료!</p>
            <p className="text-muted-foreground text-[11.5px] text-center leading-relaxed">
              {item.titleKo}를 이제 시청하실 수 있습니다.
            </p>
          </div>
        )}

        {/* ── Error phase ── */}
        {phase === "error" && (
          <div className="flex flex-col items-center py-8 gap-4">
            <AlertCircle size={48} className="text-destructive" />
            <p className="text-foreground text-[16px] font-black">결제 실패</p>
            <p className="text-muted-foreground text-[11.5px] text-center leading-relaxed">{errMsg}</p>
            <button
              onClick={() => setPhase("confirm")}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-[13px] active:opacity-80"
            >
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
