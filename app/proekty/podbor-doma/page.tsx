import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'
import PodborDomaClient from '@/components/PodborDomaClient'
import FullscreenGallery from '@/components/FullscreenGallery'
import FadeIn from '@/components/FadeIn'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import { INTERIOR_GALLERY, configFromSearchParams } from '@/data/houseConfigurator'
import { FINISH_OPTIONS } from '@/data/finishOptions'
import ComplectationSection from '@/components/ComplectationSection'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

export const metadata: Metadata = {
  title: 'Подбор дома — BuildX',
  description: 'Соберите свою планировку дома: этажность, спальни, мастер-бедрум, СПА-зона, гараж — и узнайте ориентировочную стоимость.',
  alternates: { canonical: `${SITE_URL}/proekty/podbor-doma` },
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

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PodborDomaPage({ searchParams }: Props) {
  const sp = await searchParams
  const initialConfig = configFromSearchParams(sp)
  return (
    <main style={{ paddingTop: 56 }}>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Проекты', href: '/proekty' }, { label: 'Подбор дома' }]} />

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
        initialConfig={initialConfig}
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

        {/* ── КОМПЛЕКТАЦИЯ ── */}
        <section style={{ position: 'relative' }}>
          <SectionLines delay={200} threshold={0.1} />
          <FadeIn>
            <ComplectationSection />
          </FadeIn>
          <div style={{ padding: '0 24px' }}>
            <AnimatedLine length="100%" delay={200} />
          </div>
          <div style={{ height: 64 }} />
        </section>

        {/* ── FINISH OPTIONS ── */}
        <section style={{ position: 'relative' }}>
          <SectionLines delay={200} threshold={0.1} />
          <FadeIn>
            <div className="page-hero-pad" style={{ padding: '0 60px 40px' }}>
              <h2 style={H2}>Варианты отделки</h2>
            </div>
          </FadeIn>
          <div style={{ padding: '0 24px', position: 'relative' }}>
            <AnimatedLine length="100%" delay={0} threshold={0.1} />
            <VerticalRevealLine left="50%" delay={150} color="rgba(255,255,255,0.18)" threshold={0.1} className="pg-vline" />
            <FadeIn delay={150} threshold={0.1}>
            <div className="pg-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: 24, padding: 20 }}>
              {FINISH_OPTIONS.map(({ name, priceNote, img, isPremium, includes }) => (
                <div key={name}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/2', overflow: 'hidden', background: '#2c2c2c', borderRadius: 10 }}>
                    <Image src={img} alt={name} fill sizes="(max-width:800px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '28px 12px 40px' }}>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 800, color: 'rgba(255,255,255,0.92)', marginBottom: 4 }}>
                      {name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: isPremium ? '#C9A96E' : 'rgba(255,255,255,0.35)', marginBottom: 24 }}>
                      {priceNote}
                    </p>
                    <div style={isPremium ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' } : {}}>
                      {includes.map((item) => (
                        <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                          <span style={{ color: isPremium ? '#C9A96E' : 'rgba(255,255,255,0.5)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </FadeIn>
            <AnimatedLine length="100%" delay={200} threshold={0.1} />
          </div>
        </section>
      </PodborDomaClient>

      <style>{`
        @media(max-width:700px){
          .pg-grid-2{grid-template-columns:1fr!important;row-gap:0!important;}
          .pg-grid-2>*:nth-child(2){position:relative!important;margin-top:20px!important;padding-top:20px!important;}
          .pg-grid-2>*:nth-child(2)::before{content:'';position:absolute;top:0;left:-20px;right:-20px;height:1px;background:rgba(255,255,255,0.14);}
          .pg-vline{display:none!important;}
        }
      `}</style>
    </main>
  )
}
