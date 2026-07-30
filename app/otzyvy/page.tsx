import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'Отзывы клиентов — BuildX',
  description: 'Отзывы о строительстве домов под ключ в Московской области.',
  alternates: { canonical: `${SITE_URL}/otzyvy` },
}

const REVIEWS: { name: string; text: string; date: string; rating: number; photo?: string }[] = []

export default function OtzyvyPage() {
  return (
    <main style={{ paddingTop: 56 }}>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Отзывы' }]} />
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
            Отзывы
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>
            Что говорят клиенты
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(26,26,26,0.5)', marginBottom: 56, maxWidth: 560, lineHeight: 1.6 }}>
            Реальные отзывы от людей, которые уже живут в домах нашего строительства.
          </p>

          {REVIEWS.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, padding: '28px 24px' }}>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} style={{ fontSize: 16, color: si < r.rating ? '#C9A96E' : 'rgba(0,0,0,0.12)' }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a1a1a', lineHeight: 1.7, marginBottom: 20 }}>
                    «{r.text}»
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 16 }}>
                    {r.photo && (
                      <img src={r.photo} alt={r.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    )}
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{r.name}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.35)' }}>{r.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ background: '#242424', borderRadius: 12, padding: '48px 32px', maxWidth: 600, border: '1px solid rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                Отзывы появятся после первых проектов
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(26,26,26,0.55)', lineHeight: 1.7, marginBottom: 24 }}>
                Мы только запускаемся. Станьте одним из первых клиентов — получите приоритетные условия и будем благодарны за отзыв после сдачи.
              </p>
              <a href="/podbor-doma" style={{
                display: 'inline-block',
                background: '#1a1a1a', color: '#fff',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                letterSpacing: '1px', textTransform: 'uppercase',
                padding: '14px 28px', borderRadius: 999,
              }}>
                Подобрать дом
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
