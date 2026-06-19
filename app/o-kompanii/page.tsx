import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'О компании — PrimeBuild',
  description: 'PrimeBuild — строительная компания в Московской области. Строим современные дома под ключ с плоской кровлей и панорамным остеклением.',
  alternates: { canonical: `${SITE_URL}/o-kompanii` },
}

const STATS = [
  { num: 'TODO+', label: 'домов построено' },
  { num: 'TODO', label: 'лет на рынке' },
  { num: '6 мес', label: 'средний срок' },
  { num: '100%', label: 'сданы в срок' },
]

const PRINCIPLES = [
  {
    n: '01',
    title: 'Собственная бригада',
    desc: 'Не перепродаём подрядчикам. Все работы выполняет наша постоянная команда — с контролем качества на каждом этапе.',
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
          <div style={{ padding: '72px 60px 56px' }}>
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
              TODO: Строительная компания в Московской области. Специализируемся на современных домах
              с плоской кровлей, монолитным каркасом и панорамным остеклением.
            </p>
          </div>
        </FadeIn>

        {/* Цифры */}
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
        <FadeIn delay={150}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '0 24px' }}>
            {STATS.map(({ num, label }, i) => (
              <div key={label} style={{
                padding: '40px 44px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
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
                  alt="О компании PrimeBuild"
                  fill
                  sizes="30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 70 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                TODO: Мы основали компанию с одной целью — строить качественные современные дома
                по честной цене. За это время построили TODO объектов в Московской области.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                TODO: Наша команда специализируется на домах с плоской кровлей, монолитным каркасом
                и панорамным остеклением. Работаем только по Московской области.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
                TODO: Цена ниже рынка — не маркетинговый ход. Это результат отлаженных процессов
                и собственной бригады без посредников.
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
          <VerticalRevealLine left="33.33%" delay={200} color="rgba(255,255,255,0.12)" />
          <VerticalRevealLine left="66.66%" delay={250} color="rgba(255,255,255,0.12)" />
        </div>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── ФОРМА ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn delay={100}>
          <div style={{ padding: '80px 24px 96px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: '0 0 40px',
              maxWidth: 560, textAlign: 'center',
            }}>
              Расскажите о своём участке и пожеланиях — ответим на вопросы и подберём подходящий проект.
            </p>
            <div style={{ width: '100%', maxWidth: 580 }}>
              <ContactForm source="o-kompanii" dark buttonLabel="Отправить заявку" />
            </div>
          </div>
        </FadeIn>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 56px 24px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .principles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
