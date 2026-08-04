import type { Metadata } from 'next'
import Image from 'next/image'
import ContactSplit from '@/components/ContactSplit'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

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

      {/* ── ПОЧЕМУ ВЫБИРАЮТ НАС ── */}
      <section style={{ background: '#242424', position: 'relative' }}>
        <SectionLines delay={200} />
        <FadeIn>
          <div style={{ padding: '56px 60px 40px' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15,
              margin: 0, textTransform: 'uppercase', maxWidth: 560,
            }}>
              Почему выбирают нас
            </h2>
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={0} />
        </div>
        <FadeIn delay={150}>
        {/* Без вертикального padding — сетка касается верхнего и нижнего AnimatedLine */}
        <div style={{ padding: '0 24px' }}>
          <div className="mosaic-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr 1.15fr',
            gridTemplateRows: '300px 300px',
            position: 'relative',
          }}>
            {/* Вертикальная линия col1|col2 — соединяется с внешними горизонтальными */}
            <VerticalRevealLine left="34.85%" delay={100} color="rgba(255,255,255,0.18)" className="mosaic-line" />
            {/* Вертикальная линия col2|col3 */}
            <VerticalRevealLine left="65.15%" delay={150} color="rgba(255,255,255,0.18)" className="mosaic-line" />
            {/* Горизонтальная линия между строками (col2+col3) */}
            <div className="mosaic-line" style={{ position: 'absolute', top: 300, left: '34.85%', right: 0, zIndex: 1 }}>
              <AnimatedLine length="100%" delay={200} color="rgba(255,255,255,0.18)" />
            </div>

            {/* ── Фото большое слева: padding только справа и сверху/снизу чтобы линии были видны ── */}
            <div className="mosaic-photo" style={{ gridRow: '1 / 3', padding: '20px 20px 20px 20px' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 10 }}>
                <Image
                  src="/images/projects/gamma-2.jpg"
                  alt="Почему выбирают BuildX"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* ── Текст 1 ── */}
            <div className="mosaic-text" style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 800,
                color: 'rgba(255,255,255,0.92)', lineHeight: 1.2, marginBottom: 16,
              }}>
                Гарантия 6 месяцев
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0,
              }}>
                Строим точно в срок и даём гарантию на все выполненные работы — без переносов и задержек.
              </p>
            </div>

            {/* ── Текст 2 ── */}
            <div className="mosaic-text" style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 800,
                color: 'rgba(255,255,255,0.92)', lineHeight: 1.2, marginBottom: 16,
              }}>
                Технадзор на каждом этапе
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0,
              }}>
                Независимый технический надзор контролирует качество работ и соблюдение технологий на всех этапах стройки.
              </p>
            </div>

            {/* ── Текст 3 ── */}
            <div className="mosaic-text" style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 800,
                color: 'rgba(255,255,255,0.92)', lineHeight: 1.2, marginBottom: 16,
              }}>
                Честная цена
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0,
              }}>
                Фиксируем реальную стоимость в договоре — без заниженных цен и доплат по ходу строительства.
              </p>
            </div>

            {/* ── Фото правый нижний: padding слева и сверху/снизу ── */}
            <div className="mosaic-photo" style={{ padding: '20px 20px 20px 20px' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 10 }}>
                <Image
                  src="/images/quiz/premium.jpg"
                  alt="Отделка"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={300} />
        </div>
        <div style={{ height: 20 }} />
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
        @media (max-width: 700px) {
          .mosaic-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .mosaic-photo { grid-row: auto !important; height: 260px; padding: 0 !important; margin: 44px 20px !important; }
          .mosaic-line { display: none !important; }
          .mosaic-text { padding: 28px 24px !important; }
        }
      `}</style>
    </main>
  )
}
