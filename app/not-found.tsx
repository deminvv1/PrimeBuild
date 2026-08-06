import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Страница не найдена — BuildX',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, textAlign: 'center', padding: '0 24px' }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 72, fontWeight: 800, color: 'rgba(255,255,255,0.08)' }}>404</p>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 700, color: '#fff' }}>Страница не найдена</h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>Возможно, она была удалена или вы перешли по неверной ссылке.</p>
      <Link href="/" style={{
        marginTop: 8, background: '#C9A96E', color: '#111',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
        letterSpacing: '1px', textTransform: 'uppercase',
        padding: '14px 32px', borderRadius: 999,
      }}>
        На главную
      </Link>
    </main>
  )
}
