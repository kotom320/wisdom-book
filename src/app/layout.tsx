import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif-kr",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wisdom-book-stvc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "지혜의 서 | 오늘의 한 구절",
    template: "%s | 지혜의 서",
  },
  description:
    "종교색 없이, 고전의 지혜를 현대의 언어로. 매일 한 구절씩 전하는 마음의 양식.",
  keywords: ["지혜의 서", "오늘의 명언", "고전", "마음 다스리기", "좋은 글귀"],
  openGraph: {
    title: "지혜의 서",
    description: "고전의 지혜를 현대의 언어로. 오늘의 한 구절.",
    url: siteUrl,
    siteName: "지혜의 서",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "지혜의 서",
    description: "고전의 지혜를 현대의 언어로. 오늘의 한 구절.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
