import type { Metadata } from 'next'
import Script from 'next/script'
import { Manrope, Unbounded, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Preloader from '@/components/Preloader'
import PageTransition from '@/components/PageTransition'
import CookieBanner from '@/components/CookieBanner'
import BackToTop from '@/components/BackToTop'
import { orgJsonLd } from '@/lib/jsonLd'
import Footer from '@/components/Footer'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'
const GA4_ID   = process.env.GA4_ID ?? ''
const YM_ID    = process.env.YANDEX_METRIKA_ID ?? ''

const SITE_TITLE = 'BuildX — Строительство домов в Московской области'
const SITE_DESC  = 'Строительство домов под ключ в Московской области. Срок 6 месяцев. Отделка Комфорт и Бизнес. Честная цена, независимый технадзор.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | BuildX` },
  description: SITE_DESC,
  keywords: ['строительство домов', 'дома под ключ', 'московская область', 'дом с отделкой'],
  authors: [{ name: 'BuildX' }],
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website', locale: 'ru_RU',
    url: SITE_URL, siteName: 'BuildX',
    title: SITE_TITLE, description: SITE_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  icons: {
    icon: [{ url: '/images/favicon.svg', type: 'image/svg+xml' }],
    apple: '/images/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${unbounded.variable} ${mono.variable}`} style={{ position: 'relative' }}>
        <Preloader />
        <PageTransition />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <BackToTop />

        {/* Яндекс.Метрика */}
        {YM_ID.length > 0 && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
            }} />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element -- пиксель-счётчик в noscript, next/image тут неприменим */}
              <div><img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: 'absolute', left: '-9999px' }} alt="" /></div>
            </noscript>
          </>
        )}

        {/* Google Analytics 4 */}
        {GA4_ID.length > 0 && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA4_ID}')`,
            }} />
          </>
        )}
      </body>
    </html>
  )
}
