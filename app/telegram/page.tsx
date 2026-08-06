import type { Metadata } from 'next'
import Image from 'next/image'
import TelegramLeadForm from '@/components/TelegramLeadForm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

const TITLE = 'Переход в Telegram — BuildX'
const DESC = 'Оставьте номер телефона — менеджер свяжется с вами и пригласит в Telegram-чат BuildX.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/telegram` },
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/telegram` },
  twitter: { title: TITLE, description: DESC },
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export default function TelegramPage() {
  return (
    <main style={{
      paddingTop: 56, minHeight: '100vh', background: '#1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ padding: '80px 24px', width: '100%', maxWidth: 420, textAlign: 'center' }}>

        {/* Telegram + логотип */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34, borderRadius: '50%', background: '#29A9EA', flexShrink: 0,
            }}>
              <TelegramIcon />
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: '#fff' }}>
              Telegram
            </span>
          </div>
          <span style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.15)' }} />
          <Image src="/images/logo.svg" alt="BuildX" width={120} height={28} style={{ objectFit: 'contain' }} />
        </div>

        {/* Карточка */}
        <div style={{
          background: '#242424', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16, padding: '36px 28px', textAlign: 'left',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 800,
            color: '#fff', textAlign: 'center', margin: '0 0 10px',
          }}>
            Введите номер телефона
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.45)',
            textAlign: 'center', lineHeight: 1.6, margin: '0 0 28px',
          }}>
            Менеджер свяжется с вами, после чего вы перейдёте в Telegram
          </p>

          <TelegramLeadForm />
        </div>
      </div>
    </main>
  )
}
