import type { Metadata } from 'next'
import Image from 'next/image'
import MaxLeadForm from '@/components/MaxLeadForm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

const TITLE = 'Переход в MAX — BuildX'
const DESC = 'Оставьте номер телефона — менеджер свяжется с вами и пригласит в чат BuildX в MAX.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/max` },
  robots: { index: false, follow: false },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/max` },
  twitter: { title: TITLE, description: DESC },
}

/** Мессенджер MAX: толстое кольцо-пузырь с хвостиком снизу слева (как в Header). */
function MaxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11.5C22 16.75 17.75 21 12.5 21c-1.03 0-2.03-.16-2.96-.47-.9 1.02-2.1 1.93-3.9 2.4-.5.13-1.2.2-1.62.13-.4-.07-.5-.5-.22-.78.9-.9 1.42-1.94 1.36-3.4A9.47 9.47 0 0 1 3 11.5C3 6.25 7.25 2 12.5 2S22 6.25 22 11.5Zm-9.5 4.9a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8Z"
      />
    </svg>
  )
}

export default function MaxPage() {
  return (
    <main style={{
      paddingTop: 56, minHeight: '100vh', background: '#1a1a1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ padding: '80px 24px', width: '100%', maxWidth: 420, textAlign: 'center' }}>

        {/* MAX + логотип */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34, borderRadius: '50%', background: '#7C5CFC', flexShrink: 0,
            }}>
              <MaxIcon />
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: '#fff' }}>
              MAX
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
            Менеджер свяжется с вами, после чего вы перейдёте в MAX
          </p>

          <MaxLeadForm />
        </div>
      </div>
    </main>
  )
}
