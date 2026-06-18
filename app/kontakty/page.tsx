import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import Breadcrumb from '@/components/Breadcrumb'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

const PHONE = 'TODO: +7 (XXX) XXX-XX-XX'
const PHONE_HREF = 'tel:+7XXXXXXXXXX'
const EMAIL = 'TODO: info@company.ru'
const WORKING_HOURS = 'Пн–Пт 9:00–19:00, Сб 10:00–16:00'

export const metadata: Metadata = {
  title: 'Контакты — PrimeBuild',
  description: 'Контакты строительной компании. Телефон, email, режим работы. Московская область.',
  alternates: { canonical: `${SITE_URL}/kontakty` },
}

export default function KontaktyPage() {
  return (
    <main style={{ paddingTop: 56 }}>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]} />
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64,
        }}>
          {/* Info */}
          <div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 40 }}>
              Свяжитесь с нами
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', marginBottom: 6 }}>
                  Телефон
                </p>
                <a href={PHONE_HREF} style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 700, color: '#1a1a1a' }}>
                  {PHONE}
                </a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', marginBottom: 6 }}>
                  Email
                </p>
                <a href={`mailto:${EMAIL}`} style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: '#1a1a1a' }}>
                  {EMAIL}
                </a>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', marginBottom: 6 }}>
                  Режим работы
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#1a1a1a', margin: 0 }}>{WORKING_HOURS}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', marginBottom: 6 }}>
                  Регион работы
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#1a1a1a', margin: '0 0 4px' }}>Московская область</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.45)', margin: 0 }}>
                  Встречи по договорённости
                </p>
              </div>
              <div style={{ background: '#242424', borderRadius: 8, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.3)' }}>
                  TODO: Яндекс.Карты embed
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 32 }}>
              Оставить заявку
            </h2>
            <ContactForm source="kontakty" />
          </div>
        </div>
      </section>
    </main>
  )
}
