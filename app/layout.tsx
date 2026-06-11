import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KIMITE STUDIO | AI 시네마틱 영상 제작",
  description: "AI로 만드는 영화 같은 영상. 브랜드 필름, 광고, 뮤직비디오, 추모영상 전문. KIMITE STUDIO — 압도적인 비주얼 스토리텔링.",
  metadataBase: new URL("https://kimite.kr"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "KIMITE STUDIO | AI Cinematic Video Production",
    description: "AI로 빚어내는 영화 같은 순간들. 광고·브랜드 필름·뮤직비디오·추모영상까지.",
    images: [{ url: "/images/works/og.jpg" }],
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#F8F8FA]">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
