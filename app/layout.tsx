import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';
import { officeJsonLd } from '@/lib/seo';
import './globals.css';

// 조선일보명조체 (단일 400). 원본 woff → woff2 변환본 셀프호스팅.
const chosun = localFont({
  src: './fonts/ChosunIlboMyungjo.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-chosun',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '법률사무소 진서 | 민고은 변호사 — 성폭력·스토킹·교제폭력 피해자 변호',
    template: '%s | 법률사무소 진서',
  },
  description:
    '성폭력, 성희롱, 스토킹, 교제폭력, 가정폭력 피해자를 조력합니다. 상담부터 마무리까지 민고은 변호사가 직접 담당합니다. 서울 강남 역삼역.',
  applicationName: '법률사무소 진서',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '법률사무소 진서',
    url: '/',
  },
  robots: { index: true, follow: true },
  // 네이버 서치어드바이저 / 구글 서치콘솔 소유확인 코드 발급 후 입력
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_NAVER_VERIFICATION
      ? { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: '#25342f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={chosun.variable}>
      <body>
        <JsonLd data={officeJsonLd()} />
        <a className="skip-link" href="#main">본문 바로가기</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
