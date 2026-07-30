'use client'

import Image from 'next/image'
import ContactForm from './ContactForm'

interface Props {
  source: string
  photo?: string
  quoteText?: string
  quoteAuthor?: string
  title?: string
  subtitle?: string
  buttonLabel?: string
  configSummary?: string
}

export default function ContactSplit({
  source,
  photo = '/images/projects/gamma-1.jpg',
  quoteText = 'Строим дома,\nкоторым доверяют',
  quoteAuthor = 'BuildX — Московская область',
  title = 'Оставить заявку',
  subtitle = 'Расскажите о своём участке и пожеланиях — ответим на вопросы и подберём подходящий проект.',
  buttonLabel = 'Отправить заявку',
  configSummary,
}: Props) {
  return (
    <>
      <div className="csplit-root" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '86vh' }}>

        {/* ── Фото слева ── */}
        <div style={{ padding: '15px 0 15px 44px' }}>
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 12 }}>
            <Image
              src={photo}
              alt=""
              fill
              sizes="50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)',
            }} />
            {/* text at bottom */}
            <div style={{ position: 'absolute', bottom: 44, left: 44, right: 44 }}>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(18px, 2vw, 26px)',
                fontWeight: 700, color: 'rgba(255,255,255,0.92)', lineHeight: 1.25,
                margin: '0 0 12px', whiteSpace: 'pre-line',
              }}>
                {quoteText}
              </p>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 13,
                color: 'rgba(255,255,255,0.42)', margin: 0, letterSpacing: '0.3px',
              }}>
                {quoteAuthor}
              </p>
            </div>
          </div>
        </div>

        {/* ── Форма справа ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '64px 56px',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E',
            margin: '0 0 20px',
          }}>
            Бесплатная консультация
          </p>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 2.5vw, 34px)',
            fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15,
            margin: '0 0 14px', textTransform: 'uppercase',
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 15,
            color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, margin: '0 0 40px',
          }}>
            {subtitle}
          </p>
          <ContactForm source={source} dark buttonLabel={buttonLabel} configSummary={configSummary} />
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .csplit-root {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .csplit-root > div:first-child {
            min-height: 320px;
          }
          .csplit-root > div:last-child {
            padding: 48px 24px !important;
          }
        }
      `}</style>
    </>
  )
}
