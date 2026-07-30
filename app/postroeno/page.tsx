import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'
import ContactSplit from '@/components/ContactSplit'
import ZoomableImage from '@/components/ZoomableImage'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'Построено — реализованный объект | BuildX',
  description: 'Реальные фото сданного объекта BuildX: одноэтажный дом с плоской кровлей, панорамным остеклением, закрытым бассейном и премиальной отделкой.',
  alternates: { canonical: `${SITE_URL}/postroeno` },
}

interface GalleryPhoto {
  src: string
  alt: string
  ratio: string
}

const GALLERY: GalleryPhoto[] = [
  { src: '/images/postroeno/facade-summer-1.webp', alt: 'Фасад дома летом', ratio: '4/3' },
  { src: '/images/postroeno/facade-summer-2.webp', alt: 'Фасад дома, вид сбоку', ratio: '4/3' },
  { src: '/images/postroeno/pool-1.webp', alt: 'Закрытый бассейн с панорамным остеклением', ratio: '4/3' },
  { src: '/images/postroeno/bathroom-teal-tub.webp', alt: 'Ванная комната с отдельностоящей ванной', ratio: '4/5' },
  { src: '/images/postroeno/corridor-sunset.webp', alt: 'Коридор с панорамным окном', ratio: '4/3' },
  { src: '/images/postroeno/bathroom-marble.webp', alt: 'Ванная комната, мраморная отделка', ratio: '4/3' },
  { src: '/images/postroeno/facade-spring.webp', alt: 'Фасад дома весной', ratio: '4/3' },
  { src: '/images/postroeno/pool-2.webp', alt: 'Бассейн, вид от входа', ratio: '4/3' },
  { src: '/images/postroeno/bathroom-travertine.webp', alt: 'Ванная комната, отделка травертином', ratio: '4/3' },
  { src: '/images/postroeno/facade-pool-corner.webp', alt: 'Угол дома со стороны бассейна', ratio: '4/3' },
  { src: '/images/postroeno/facade-backyard.webp', alt: 'Дом со стороны заднего двора', ratio: '4/3' },
  { src: '/images/postroeno/facade-winter.webp', alt: 'Фасад дома зимой', ratio: '4/3' },
  { src: '/images/postroeno/facade-gate.webp', alt: 'Дом со стороны въезда', ratio: '4/3' },
]

export default function PostroenoPage() {
  return (
    <main style={{ paddingTop: 56, position: 'relative' }}>
      <SectionLines />
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Построено' }]} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn>
          <div style={{ padding: '72px 60px 56px' }}>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.08,
              margin: '0 0 20px', textTransform: 'uppercase',
            }}>
              Реализованный объект
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.7, margin: 0, maxWidth: 620,
            }}>
              Одноэтажный дом с плоской кровлей и панорамным остеклением: закрытый бассейн,
              премиальная отделка ванных комнат травертином и мрамором, гараж на несколько машин.
              Ниже — реальные фото объекта, без рендеров.
            </p>
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ ── */}
      <section style={{ position: 'relative' }}>
        {/* Позиции линий рассчитаны под padding 60px и gap 24px 3-колоночной сетки —
            33.33%/66.66% не совпадают с реальными границами колонок при ненулевых отступах. */}
        <VerticalRevealLine left="calc(72px + (100% - 168px) / 3)" delay={150} color="rgba(255,255,255,0.18)" className="postroeno-vline" />
        <VerticalRevealLine left="calc(96px + (100% - 168px) * 2 / 3)" delay={200} color="rgba(255,255,255,0.18)" className="postroeno-vline" />
        <FadeIn delay={100}>
          <div className="postroeno-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '32px 60px 64px' }}>
            {GALLERY.map((photo, i) => (
              <div
                key={photo.src}
                className="postroeno-item"
                style={{ marginTop: i % 3 === 1 ? 40 : i % 3 === 2 ? 20 : 0 }}
              >
                <div
                  className="postroeno-float"
                  style={{
                    position: 'relative', aspectRatio: photo.ratio, overflow: 'hidden', borderRadius: 16, background: '#2c2c2c',
                    animationDelay: `${(i * 0.45) % 3.6}s`,
                  }}
                >
                  <ZoomableImage src={photo.src} alt={photo.alt} sizes="(max-width: 900px) 100vw, 33vw" objectFit="cover" />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── ФОРМА ── */}
      <section style={{ position: 'relative' }}>
        <ContactSplit
          source="postroeno"
          title="Обсудим ваш проект?"
          quoteText={'Строим дома,\nкоторым доверяют'}
        />
      </section>

      <style>{`
        @keyframes postroeno-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .postroeno-float {
          animation: postroeno-float 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .postroeno-float { animation: none; }
        }
        @media (max-width: 900px) {
          .postroeno-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .postroeno-item { margin-top: 0 !important; }
        }
        @media (max-width: 560px) {
          .postroeno-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .postroeno-vline { display: none !important; }
        }
      `}</style>
    </main>
  )
}
