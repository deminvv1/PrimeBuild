import type { Metadata } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'
import { Manrope, Unbounded, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Preloader from '@/components/Preloader'
import PageTransition from '@/components/PageTransition'
import CookieBanner from '@/components/CookieBanner'
import BackToTop from '@/components/BackToTop'
import UtmCapture from '@/components/UtmCapture'
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'
const GA4_ID   = process.env.GA4_ID ?? ''
const YM_ID    = process.env.YANDEX_METRIKA_ID ?? ''
const VK_PIXEL_ID = process.env.VK_PIXEL_ID ?? ''
const GOOGLE_VERIFICATION = process.env.GOOGLE_VERIFICATION ?? ''
const YANDEX_VERIFICATION = process.env.YANDEX_VERIFICATION ?? ''

const SITE_TITLE = 'BuildX — Строительство домов в Московской области'
const SITE_DESC  = 'Строительство домов под ключ в Московской области. Срок 6 месяцев. Чистовая отделка под ключ. Честная цена, независимый технадзор.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Без template: каждая страница уже сама дописывает "— BuildX" в свой title,
  // шаблон здесь дублировал бы суффикс ("Контакты — BuildX | BuildX").
  title: { default: SITE_TITLE, template: '%s' },
  description: SITE_DESC,
  keywords: ['строительство домов', 'дома под ключ', 'московская область', 'дом с отделкой'],
  authors: [{ name: 'BuildX' }],
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: SITE_URL },
  verification: {
    ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
    ...(YANDEX_VERIFICATION ? { yandex: YANDEX_VERIFICATION } : {}),
  },
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
    icon: [
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
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
        <Suspense fallback={null}>
          <UtmCapture />
        </Suspense>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <BackToTop />

        {/* Яндекс.Метрика */}
        {YM_ID.length > 0 && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}","ym");ym(${YM_ID},"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
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

        {/* VK Пиксель (ретаргетинг ВКонтакте/myTarget) */}
        {VK_PIXEL_ID.length > 0 && (
          <Script id="vk-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("${VK_PIXEL_ID}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();`,
          }} />
        )}
      </body>
    </html>
  )
}
