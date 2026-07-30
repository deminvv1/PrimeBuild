import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import PodborDomaClient from '@/components/PodborDomaClient'
import FullscreenGallery from '@/components/FullscreenGallery'
import ExpandableDescription from '@/components/ExpandableDescription'
import FadeIn from '@/components/FadeIn'
import AnimatedLine from '@/components/AnimatedLine'
import SectionLines from '@/components/SectionLines'
import { INTERIOR_GALLERY } from '@/data/houseConfigurator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'Подбор дома — BuildX',
  description: 'Соберите свою планировку дома: этажность, спальни, мастер-бедрум, СПА-зона, гараж — и узнайте ориентировочную стоимость.',
  alternates: { canonical: `${SITE_URL}/podbor-doma` },
}

const LABEL: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--font-sans)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#C9A96E',
  marginBottom: 12,
}
const H2: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 800,
  color: 'rgba(255,255,255,0.92)',
  lineHeight: 1.15,
  margin: 0,
  textTransform: 'uppercase',
}

export default function PodborDomaPage() {
  return (
    <main style={{ paddingTop: 56 }}>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Подбор дома' }]} />

      {/* ── INTRO ── */}
      <section className="page-hero-pad" style={{ padding: '24px 60px 40px' }}>
        <FadeIn>
          <p style={LABEL}>Конструктор комплектации</p>
          <h1 style={{ ...H2, fontSize: 'clamp(30px, 4.5vw, 48px)', maxWidth: 760 }}>
            Соберите дом под свои задачи
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.7, marginTop: 20 }}>
            Без типовых планировок — вы сами определяете этажность, набор спален и дополнительные зоны.
            Планировка и цена справа обновляются сразу при изменении параметров.
          </p>
        </FadeIn>
      </section>

      <div style={{ padding: '0 24px' }}>
        <AnimatedLine length="100%" delay={0} />
      </div>

      {/* ── CONFIGURATOR + EXTERIOR + INTERIOR + КОМПЛЕКТАЦИЯ + CONTACT (общее состояние конфигурации) ── */}
      <PodborDomaClient
        exteriorHeading={
          <div className="page-hero-pad" style={{ padding: '64px 60px 32px' }}>
            <p style={LABEL}>Устраивает вариант?</p>
            <h2 style={H2}>Экстерьер вашего дома</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>
              Листайте стрелками, чтобы посмотреть визуализацию со всех сторон
            </p>
          </div>
        }
        contactProps={{
          source: 'podbor-doma',
          photo: '/images/projects/gamma-1.jpg',
          quoteText: 'Получите точную смету\nпо вашей комплектации',
          title: 'Оставьте заявку — архитектор свяжется с вами',
        }}
      >
        {/* ── INTERIOR ── */}
        <section style={{ position: 'relative' }}>
          <div className="page-hero-pad" style={{ padding: '64px 60px 32px' }}>
            <p style={LABEL}>Внутреннее пространство</p>
            <h2 style={H2}>Интерьер вашего дома</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>
              Примерная визуализация интерьеров в выбранной комплектации
            </p>
          </div>
          <FullscreenGallery images={INTERIOR_GALLERY} />
        </section>

        {/* ── DESCRIPTION ── */}
        <section style={{ position: 'relative' }}>
          <SectionLines delay={200} threshold={0.05} />
          <div style={{ padding: '0 24px' }}>
            <AnimatedLine length="100%" delay={0} />
          </div>
          <div className="page-hero-pad" style={{ padding: '64px 60px' }}>
            <p style={LABEL}>Что входит в дом</p>
            <h2 style={{ ...H2, marginBottom: 24 }}>Комплектация под ключ</h2>
            <ExpandableDescription />
          </div>
          <div style={{ padding: '0 24px' }}>
            <AnimatedLine length="100%" delay={200} />
          </div>
        </section>
      </PodborDomaClient>
    </main>
  )
}
