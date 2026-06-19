import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

const PHONE = 'TODO: +7 (XXX) XXX-XX-XX'
const PHONE_HREF = 'tel:+7XXXXXXXXXX'
const EMAIL = 'TODO: info@primebuild.ru'
const WORKING_HOURS = 'Пн–Пт 9:00–19:00, Сб 10:00–16:00'

export const metadata: Metadata = {
  title: 'Контакты — PrimeBuild',
  description: 'Контакты строительной компании PrimeBuild. Телефон, email, режим работы. Московская область.',
  alternates: { canonical: `${SITE_URL}/kontakty` },
}

const CONTACTS = [
  {
    label: 'Телефон',
    value: PHONE,
    href: PHONE_HREF,
    size: 28,
  },
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    size: 18,
  },
  {
    label: 'Режим работы',
    value: WORKING_HOURS,
    href: null,
    size: 16,
  },
  {
    label: 'Регион',
    value: 'Московская область',
    note: 'Встречи по договорённости',
    href: null,
    size: 16,
  },
]

export default function KontaktyPage() {
  return (
    <main style={{ paddingTop: 56, position: 'relative' }}>
      <SectionLines />
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn>
          <div style={{ padding: '72px 60px 56px' }}>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.08,
              margin: '0 0 20px', textTransform: 'uppercase',
            }}>
              Свяжитесь с нами
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, margin: 0, maxWidth: 460,
            }}>
              Перезвоним в течение 2 часов в рабочее время и ответим на все вопросы.
            </p>
          </div>
        </FadeIn>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
      </section>

      {/* ── ОСНОВНОЙ БЛОК ── */}
      <section style={{ position: 'relative' }}>
        <div style={{ padding: '0 24px', position: 'relative' }}>
          <VerticalRevealLine left="38%" delay={200} color="rgba(255,255,255,0.12)" />
        </div>

        <FadeIn delay={100}>
          <div className="contacts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', padding: '0 24px' }}>

            {/* ── Левая колонка: контакты ── */}
            <div style={{ paddingRight: 60 }}>
              {CONTACTS.map(({ label, value, href, note, size }, i) => (
                <div key={label}>
                  <div style={{ padding: '40px 0' }}>
                    <p style={{
                      fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.28)', margin: '0 0 10px',
                    }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} style={{
                        fontFamily: 'var(--font-sans)', fontSize: size,
                        fontWeight: 700, color: 'rgba(255,255,255,0.88)',
                        textDecoration: 'none', lineHeight: 1.2,
                        display: 'block',
                        transition: 'color 0.2s',
                      }}>
                        {value}
                      </a>
                    ) : (
                      <>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: size, fontWeight: 600, color: 'rgba(255,255,255,0.88)', margin: 0, lineHeight: 1.4 }}>
                          {value}
                        </p>
                        {note && (
                          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.32)', margin: '6px 0 0' }}>
                            {note}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  {i < CONTACTS.length - 1 && (
                    <AnimatedLine length="100%" delay={150 + i * 60} color="rgba(255,255,255,0.1)" />
                  )}
                </div>
              ))}
            </div>

            {/* ── Правая колонка: форма ── */}
            <div style={{ padding: '56px 0 56px 60px' }}>
              <ContactForm source="kontakty" dark buttonLabel="Отправить заявку" />
            </div>

          </div>
        </FadeIn>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 80 }} />
      </section>

      <style>{`
        @media (max-width: 860px) {
          .contacts-grid { grid-template-columns: 1fr !important; }
          .contacts-grid > div:first-child { padding-right: 0 !important; }
          .contacts-grid > div:last-child { padding: 40px 0 56px !important; border-top: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>
    </main>
  )
}
