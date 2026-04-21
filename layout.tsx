import type React from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppWrapper } from "@/components/app-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Made with App Studio",
  description:
    "WatchHub — 종합 영상 스트리밍 앱. Pi Network로 드라마, 예능, 다큐멘터리를 즐기세요. GCV 기반 Pi 소액결제로 구독료 없이 이용 가능합니다.",
  keywords: [
    "WatchHub",
    "streaming",
    "Pi Network",
    "Web3",
    "dramas",
    "documentaries",
    "entertainment",
    "GCV",
    "K-drama",
    "종합 영상",
    "스트리밍",
    "피네트워크",
  ],
    generator: 'v0.app'
};

export const viewport: Viewport = {
  themeColor: "#0a0812",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-geist-sans: ${GeistSans.variable};
  --font-geist-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
