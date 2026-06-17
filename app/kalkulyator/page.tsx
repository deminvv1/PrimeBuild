import type { Metadata } from 'next'
import QuizCalculator from '@/components/QuizCalculator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'Калькулятор стоимости дома — PrimeBuild',
  description: 'Рассчитайте стоимость дома под ключ в Московской области за 3 минуты.',
  alternates: { canonical: `${SITE_URL}/kalkulyator` },
}

export default function KalkulyatorPage() {
  return (
    <main style={{ paddingTop: 72 }}>
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
            Калькулятор
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 12 }}>
            Узнайте стоимость своего дома
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(26,26,26,0.52)', marginBottom: 56, lineHeight: 1.6 }}>
            Ответьте на 4 вопроса — наш менеджер подготовит персональный расчёт и свяжется с вами в течение 2 часов.
          </p>
          <div style={{ background: '#fff', borderRadius: 12, padding: '40px 40px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <QuizCalculator />
          </div>
        </div>
      </section>
    </main>
  )
}
