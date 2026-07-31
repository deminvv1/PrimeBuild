import type { Metadata } from 'next'
import Image from 'next/image'
import ContactSplit from '@/components/ContactSplit'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'О компании — BuildX',
  description: 'BuildX — строительная компания в Московской области. Строим современные дома под ключ с плоской кровлей и панорамным остеклением.',
  alternates: { canonical: `${SITE_URL}/o-kompanii` },
}

const STATS = [
  { num: '10+', label: 'домов построено' },
  { num: '6 мес', label: 'средний срок' },
  { num: '100%', label: 'сданы в срок' },
]

const PRINCIPLES = [
  {
    n: '01',
    title: 'Технадзор на объекте',
    desc: 'Независимый технический надзор контролирует соблюдение технологий строительства на каждом этапе — от фундамента до отделки.',
  },
  {
    n: '02',
    title: 'Фиксированная цена',
    desc: 'Цена договора — итоговая. Фиксируем стоимость до старта, и она не изменится без вашего согласия.',
  },
  {
    n: '03',
    title: 'Полная прозрачность',
    desc: 'Фото-отчёт раз в неделю. Вы видите что происходит на объекте в любой момент, даже не приезжая.',
  },
]

export default function OKompaniiPage() {
  return (
    <main style={{ paddingTop: 56, position: 'relative' }}>
      <SectionLines />
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'О компании' }]} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn>
          <div className="page-hero-pad" style={{ padding: '72px 60px 56px' }}>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.08,
              margin: '0 0 24px', maxWidth: 700, textTransform: 'uppercase',
            }}>
              Строим дома,<br />которым доверяют
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0, maxWidth: 520,
            }}>
              Строительная компания в Московской области. Специализируемся на современных домах
              с плоской кровлей, монолитным каркасом и панорамным остеклением.
            </p>
          </div>
        </FadeIn>

        {/* Цифры */}
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
        <FadeIn delay={150}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 24px' }}>
            {STATS.map(({ num, label }, i) => (
              <div key={label} className="stat-cell" style={{
                padding: '40px 44px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 38, fontWeight: 900, color: '#C9A96E', lineHeight: 1, marginBottom: 10 }}>
                  {num}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── КТО МЫ ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn delay={100}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', padding: '50px 60px', gap: 80 }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(26px, 3vw, 40px)',
                fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15,
                margin: '0 0 28px', textTransform: 'uppercase',
              }}>
                Кто мы
              </h2>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 10, overflow: 'hidden' }}>
                <Image
                  src="/images/quiz/contact.jpg"
                  alt="О компании BuildX"
                  fill
                  sizes="30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 70 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                Мы основали компанию с одной целью — строить качественные современные дома
                по честной цене. За это время построили 10+ объектов в Московской области.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                Наша команда специализируется на домах с плоской кровлей, монолитным каркасом
                и панорамным остеклением. Работаем только по Московской области.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                Указываем реальную стоимость без занижений. Срок строительства — 6 месяцев,
                и мы его соблюдаем: на каждом объекте работает независимый технадзор.
              </p>
            </div>
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
      </section>

      {/* ── ПРИНЦИПЫ ── */}
      <section style={{ position: 'relative' }}>

        <div style={{ padding: '0 24px', position: 'relative' }}>
          <AnimatedLine length="100%" delay={100} />
          <VerticalRevealLine left="33.33%" delay={200} color="rgba(255,255,255,0.12)" className="principles-vline" />
          <VerticalRevealLine left="66.66%" delay={250} color="rgba(255,255,255,0.12)" className="principles-vline" />
        </div>

        <div className="principles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 24px' }}>
          {PRINCIPLES.map(({ n, title, desc }) => (
            <div key={n} style={{ padding: '48px 40px' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: '#C9A96E', marginBottom: 16 }}>
                {n}
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 800, color: 'rgba(255,255,255,0.92)', margin: '0 0 12px', lineHeight: 1.25 }}>
                {title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── ДОКУМЕНТЫ И ГАРАНТИИ ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn>
          <div style={{ padding: '56px 60px' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15,
              margin: '0 0 16px', textTransform: 'uppercase',
            }}>
              Документы и гарантии
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 620, margin: '0 0 32px' }}>
              Работаем по договору строительного подряда с фиксированной ценой и гарантией 6 месяцев
              на все выполненные работы. Учредительные документы и сертификаты — по запросу.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Договор подряда', 'Гарантия 6 месяцев', 'Технадзор'].map((label) => (
                <span key={label} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.16)',
                  padding: '10px 18px', borderRadius: 999,
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
      </section>

      {/* ── ФОРМА ── */}
      <section style={{ position: 'relative' }}>
        <ContactSplit
          source="o-kompanii"
          photo="/images/projects/alpha-1.webp"
          quoteText={"Строим дома,\nкоторым доверяют"}
          title="Обсудим ваш проект?"
        />
      </section>

      <style>{`
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 56px 44px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-cell:nth-child(1), .stat-cell:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.07); }
          .principles-grid { grid-template-columns: 1fr !important; }
          .principles-vline { display: none !important; }
        }
        @media (max-width: 480px) {
          .stat-cell { padding: 20px 12px !important; }
        }
      `}</style>
    </main>
  )
}
