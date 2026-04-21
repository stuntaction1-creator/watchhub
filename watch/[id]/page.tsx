"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Heart,
  Share2,
  Star,
  Clock,
  Tv2,
  BookmarkPlus,
  Lock,
  CheckCircle2,
  AlertCircle,
  Ticket,
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { ContentCard } from "@/components/content-card";
import { CONTENT_DATA } from "@/lib/content-data";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { PRODUCT_CONFIG } from "@/lib/product-config";

const PREMIUM_TICKET_PRODUCT_KEY = "watchhub-premium-ticket";

type Tab = "info" | "episodes" | "related";

export default function WatchPage() {
  const params = useParams();
  const id     = params?.id as string;
  const item   = CONTENT_DATA.find((c) => c.id === id) ?? CONTENT_DATA[0];

  const related = CONTENT_DATA.filter(
    (c) => c.id !== item.id && c.category === item.category,
  ).slice(0, 8);

  const { sdk, products, restoredPurchases } = usePiAuth();

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_69c2190e0d848126f002753e,
  ) ?? null;

  const amount = product?.price_in_pi ?? null;

  // Seed ticket count from restored purchases
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    if (restoredPurchases) {
      const record = restoredPurchases.find(
        (r) => r.productId === PREMIUM_TICKET_PRODUCT_KEY,
      );
      if (record) setTicketCount(record.quantity);
    }
  }, [restoredPurchases]);

  const [tab,        setTab]        = useState<Tab>("info");
  const [liked,      setLiked]      = useState(false);
  const [saved,      setSaved]      = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [payError,   setPayError]   = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState(false);

  // purchased = legacy item purchase OR has a premium ticket
  const [purchased, setPurchased] = useState(false);

  const hasTicket = ticketCount > 0;

  async function handlePremiumTicketPurchase() {
    if (!sdk || !product) return;
    setPurchasing(true);
    setPayError(null);
    setPaySuccess(false);
    try {
      const result = await sdk.makePurchase(PREMIUM_TICKET_PRODUCT_KEY);
      if (result.ok) {
        setTicketCount((prev) => prev + 1);
        setPaySuccess(true);
        setPurchased(true);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "purchase_cancelled") {
        setPayError("결제가 취소되었습니다.");
      } else if (code === "product_not_found") {
        setPayError("상품을 찾을 수 없습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        setPayError("결제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } finally {
      setPurchasing(false);
    }
  }

  async function handleWatch() {
    if (!sdk || ticketCount <= 0) return;
    // Consume 1 ticket on watch
    try {
      await sdk.state.consume(PREMIUM_TICKET_PRODUCT_KEY, 1);
      setTicketCount((prev) => Math.max(0, prev - 1));
    } catch {
      // Non-blocking — still allow playback
    }
  }

  return (
    <div className="min-h-screen bg-background pb-28">

      {/* Banner */}
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: item.color }} />
        <Image
          src={item.banner}
          alt={item.titleKo}
          fill
          className="object-cover opacity-90"
          priority
          sizes="100vw"
          crossOrigin="anonymous"
        />

        {/* Scrims */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/58 to-transparent pointer-events-none" />

        {/* Back */}
        <Link
          href="/"
          aria-label="뒤로 가기"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-black/62 backdrop-blur-sm border border-white/12 flex items-center justify-center active:opacity-75 transition-opacity"
        >
          <ArrowLeft size={17} className="text-white" />
        </Link>

        {/* Share */}
        <button
          aria-label="공유"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/62 backdrop-blur-sm border border-white/12 flex items-center justify-center active:opacity-75 transition-opacity"
        >
          <Share2 size={15} className="text-white" />
        </button>

        {/* Center overlay */}
        {purchased || hasTicket ? (
          <button
            aria-label="재생"
            onClick={handleWatch}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-16 h-16 rounded-full bg-primary shadow-2xl shadow-primary/48 flex items-center justify-center active:scale-95 transition-transform">
              <Play size={24} fill="white" className="text-white ml-1" />
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-2.5">
            <div className="w-14 h-14 rounded-full bg-black/58 border border-white/10 flex items-center justify-center">
              <Lock size={20} className="text-white/35" />
            </div>
            <span className="text-white/45 text-[11px] font-medium bg-black/42 backdrop-blur-sm px-3.5 py-[5px] rounded-full">
              Pi로 결제하여 잠금 해제
            </span>
          </div>
        )}
      </div>

      {/* Title + meta */}
      <div className="px-4 pt-5 pb-0">
        {/* Genre + tag pills */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-[7.5px] font-bold uppercase tracking-widest text-primary border border-primary/22 bg-primary/8 rounded-full px-[10px] py-[5px]">
            {item.genre}
          </span>
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[7.5px] font-medium text-muted-foreground border border-border bg-surface-raised rounded-full px-[10px] py-[5px]">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-[25px] font-black text-foreground leading-tight tracking-tight mb-[3px]">
          {item.titleKo}
        </h1>
        <p className="text-muted-foreground/48 text-[11px] font-medium mb-3">{item.title}</p>

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <div className="flex items-center gap-[3px]">
            <Star size={10} className="text-accent fill-accent" />
            <span className="text-accent text-[11.5px] font-bold">{item.rating}</span>
          </div>
          <span className="text-border text-[10px]">&middot;</span>
          <span className="text-muted-foreground text-[11.5px]">{item.year}</span>
          <span className="text-border text-[10px]">&middot;</span>
          <div className="flex items-center gap-1">
            <Clock size={9.5} className="text-muted-foreground" />
            <span className="text-muted-foreground text-[11.5px]">{item.duration}</span>
          </div>
          {item.episodes && (
            <>
              <span className="text-border text-[10px]">&middot;</span>
              <div className="flex items-center gap-1">
                <Tv2 size={9.5} className="text-muted-foreground" />
                <span className="text-muted-foreground text-[11.5px]">{item.episodes}부작</span>
              </div>
            </>
          )}
        </div>

        {/* Quick action row */}
        <div className="flex items-center gap-5 mb-5 pb-4 border-b border-border/22">
          <button
            onClick={() => setLiked((v) => !v)}
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
            aria-label={liked ? "좋아요 취소" : "좋아요"}
            aria-pressed={liked}
          >
            <Heart size={21} className={liked ? "text-rose-400" : "text-muted-foreground"} fill={liked ? "currentColor" : "none"} />
            <span className={`text-[9px] font-semibold ${liked ? "text-rose-400" : "text-muted-foreground"}`}>좋아요</span>
          </button>
          <button
            onClick={() => setSaved((v) => !v)}
            className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
            aria-label={saved ? "찜 취소" : "찜하기"}
            aria-pressed={saved}
          >
            <BookmarkPlus size={21} className={saved ? "text-primary" : "text-muted-foreground"} fill={saved ? "currentColor" : "none"} />
            <span className={`text-[9px] font-semibold ${saved ? "text-primary" : "text-muted-foreground"}`}>찜하기</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform" aria-label="공유">
            <Share2 size={21} className="text-muted-foreground" />
            <span className="text-[9px] font-semibold text-muted-foreground">공유</span>
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 px-4 mb-5 border-b border-border/22" role="tablist" aria-label="콘텐츠 탭">
        {(["info", "episodes", "related"] as Tab[]).map((t) => {
          const labels: Record<Tab, string> = { info: "정보", episodes: "에피소드", related: "관련" };
          return (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-[12px] font-bold text-center transition-colors relative ${
                tab === t ? "text-foreground" : "text-muted-foreground/48"
              }`}
            >
              {labels[t]}
              {tab === t && (
                <span className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-primary rounded-full" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="px-4">

        {/* ─ Info tab ─ */}
        {tab === "info" && (
          <div className="space-y-5">
            <p className="text-muted-foreground text-[12.5px] leading-relaxed">{item.description}</p>

            {item.cast && item.cast.length > 0 && (
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">출연진</p>
                <p className="text-foreground text-[11.5px] leading-relaxed">{item.cast.join("  ·  ")}</p>
              </div>
            )}

            {/* Purchase / Unlocked */}
            {(purchased || hasTicket) && paySuccess ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/16 rounded-2xl px-4 py-4">
                <CheckCircle2 size={22} className="text-emerald-400 flex-none" />
                <div>
                  <p className="text-emerald-400 text-[14px] font-bold leading-tight">결제 성공!</p>
                  <p className="text-muted-foreground text-[11px] mt-[3px]">프리미엄 티켓이 추가되었습니다 · 남은 티켓: {ticketCount}장</p>
                </div>
              </div>
            ) : null}

            {/* Premium Ticket payment section — shown below synopsis always */}
            <div className="bg-surface border border-border rounded-2xl p-4 mt-2">
              {/* Header row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-3">
                  <div className="w-9 h-9 rounded-xl bg-pi-gold/10 border border-pi-gold/18 flex items-center justify-center flex-none">
                    <Ticket size={16} className="text-pi-gold" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground text-[14px] font-bold leading-tight truncate">
                      {product?.name ?? "WatchHub Premium Ticket"}
                    </p>
                    <p className="text-muted-foreground text-[10.5px] mt-[2px] leading-snug line-clamp-2">
                      {product?.description ?? "Unlock premium Web3 cinematic content on WatchHub."}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-[2px] bg-pi-gold/10 border border-pi-gold/18 rounded-xl px-2.5 py-1.5 flex-none">
                  <span className="text-pi-gold text-[15px] font-black leading-none">π</span>
                  <span className="text-pi-gold text-[13px] font-black leading-none">
                    {amount !== null ? amount.toFixed(5) : "—"}
                  </span>
                </div>
              </div>

              {/* Ticket balance badge */}
              {ticketCount > 0 && (
                <div className="flex items-center gap-2 bg-emerald-500/8 border border-emerald-500/16 rounded-xl px-3 py-2 mb-3">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-none" />
                  <p className="text-emerald-400 text-[11px] font-semibold">보유 중인 프리미엄 티켓: {ticketCount}장</p>
                </div>
              )}

              {/* Error message */}
              {payError && (
                <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/16 rounded-xl px-3 py-2.5 mb-3">
                  <AlertCircle size={13} className="text-destructive flex-none" />
                  <p className="text-destructive text-[11px] font-medium">{payError}</p>
                </div>
              )}

              {/* Product unavailable notice */}
              {!product && products !== null && (
                <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-xl px-3 py-2.5 mb-3">
                  <AlertCircle size={13} className="text-muted-foreground flex-none" />
                  <p className="text-muted-foreground text-[11px]">상품 정보를 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</p>
                </div>
              )}

              {/* Pay with Pi button */}
              <button
                onClick={handlePremiumTicketPurchase}
                disabled={purchasing || !product || !sdk}
                className="w-full flex items-center justify-center gap-2 bg-pi-gold text-black rounded-xl py-[14px] text-[14px] font-bold disabled:opacity-50 active:scale-[0.98] transition-transform shadow-md shadow-pi-gold/20"
                aria-busy={purchasing}
              >
                {purchasing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/25 border-t-black rounded-full animate-spin" aria-hidden="true" />
                    결제 처리 중&hellip;
                  </>
                ) : (
                  <>
                    <span className="text-[16px] font-black leading-none">π</span>
                    Pay with Pi
                    {amount !== null && (
                      <span className="ml-1 text-[12px] font-semibold opacity-75">
                        ({amount.toFixed(5)} π)
                      </span>
                    )}
                  </>
                )}
              </button>

              <p className="text-muted-foreground text-[9.5px] text-center mt-2.5 leading-snug">
                GCV 준수 · Pi 전용 · 구독 없음 · 법정화폐 없음
              </p>
            </div>
          </div>
        )}

        {/* ─ Episodes tab ─ */}
        {tab === "episodes" && (
          <div>
            {!item.episodes ? (
              <p className="text-muted-foreground text-[12px] py-8 text-center">에피소드 정보 없음</p>
            ) : !purchased ? (
              <div className="flex flex-col items-center gap-4 py-10">
                <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center">
                  <Lock size={20} className="text-muted-foreground/50" />
                </div>
                <p className="text-foreground text-[14px] font-semibold">에피소드를 보려면 잠금을 해제하세요</p>
                <button
                  onClick={() => setTab("info")}
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-[12.5px] font-bold active:opacity-75"
                >
                  Pi로 잠금 해제
                </button>
              </div>
            ) : (
              <div className="space-y-2.5" aria-label="에피소드 목록">
                {Array.from({ length: item.episodes }, (_, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 bg-surface border border-border rounded-xl px-3.5 py-3 active:opacity-70 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/16 flex items-center justify-center flex-none">
                      <Play size={10} fill="currentColor" className="text-primary ml-px" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-foreground text-[12.5px] font-semibold leading-tight">
                        {i + 1}화 · {item.titleKo}
                      </p>
                      <p className="text-muted-foreground text-[10px] mt-[2px]">{item.duration}</p>
                    </div>
                    {i === 0 && (
                      <span className="text-[7.5px] font-bold text-primary bg-primary/10 border border-primary/18 rounded-full px-2 py-[3px] flex-none">
                        최신
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─ Related tab ─ */}
        {tab === "related" && (
          <div>
            {related.length === 0 ? (
              <p className="text-muted-foreground text-[12px] py-8 text-center">관련 콘텐츠 없음</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {related.map((r) => (
                  <ContentCard key={r.id} item={r} size="sm" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
