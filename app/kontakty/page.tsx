import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'
import ContactSplit from '@/components/ContactSplit'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

const PHONE = '+7 (985) 933-01-21'
const PHONE_HREF = 'tel:+79859330121'
const EMAIL = 'Mail@vvsamohin.ru'
const WORKING_HOURS = 'Пн–Пт 9:00–19:00, Сб 10:00–16:00'

export const metadata: Metadata = {
  title: 'Контакты — BuildX',
  description: 'Контакты строительной компании BuildX. Телефон, email, режим работы. Московская область.',
  alternates: { canonical: `${SITE_URL}/kontakty` },
}

const CONTACTS = [
  {
    label: 'Телефон',
    value: PHONE,
    href: PHONE_HREF,
    size: 20,
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
          <div className="page-hero-pad" style={{ padding: '72px 60px 56px' }}>
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
              Перезвоним в течение 15 минут в рабочее время и ответим на все вопросы.
            </p>
          </div>
        </FadeIn>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
      </section>

      {/* ── КОНТАКТНАЯ ИНФОРМАЦИЯ ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn delay={100}>
          <div className="contacts-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '0 24px' }}>
            {CONTACTS.map(({ label, value, href, note, size }, i) => (
              <div key={label} className="contact-cell" style={{
                padding: '40px 40px',
                borderRight: i < CONTACTS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600,
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)', margin: '0 0 12px',
                }}>
                  {label}
                </p>
                {href ? (
                  <a href={href} style={{
                    fontFamily: 'var(--font-sans)', fontSize: size,
                    fontWeight: 700, color: 'rgba(255,255,255,0.88)',
                    textDecoration: 'none', lineHeight: 1.25, display: 'block',
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
            ))}
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── ФОРМА (split) ── */}
      <section style={{ position: 'relative' }}>
        <ContactSplit
          source="kontakty"
          photo="/images/projects/gamma-1.jpg"
          quoteText={"Ваш дом в Московской\nобласти под ключ"}
          title="Оставить заявку"
        />
      </section>

      <style>{`
        @media (max-width: 860px) {
          .contacts-info { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-cell { padding: 40px 20px !important; }
        }
        @media (max-width: 500px) {
          .contacts-info { grid-template-columns: 1fr !important; }
          .contact-cell { border-right: none !important; }
          .contact-cell:not(:first-child) { border-top: 1px solid rgba(255,255,255,0.07); }
        }
      `}</style>
    </main>
  )
}
