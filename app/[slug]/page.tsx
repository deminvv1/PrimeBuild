import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'
import ContactSplit from '@/components/ContactSplit'
import { ALL_SEO_PAGES, getSeoPage, SEO_IMAGE_META } from '@/data/seoPages'
import { DETAILED_SECTIONS } from '@/data/houseDescription'
import SpecsAccordion from '@/components/SpecsAccordion'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ALL_SEO_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSeoPage(slug)
  if (!page) return {}

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `${SITE_URL}/${page.slug}` },
  }
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params
  const page = getSeoPage(slug)
  if (!page) notFound()

  return (
    <main style={{ paddingTop: 56, position: 'relative' }}>
      <SectionLines />
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: page.label }]} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn>
          <div className="page-hero-pad" style={{ padding: '72px 60px 56px' }}>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(26px, 4.5vw, 56px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1,
              margin: '0 0 24px', maxWidth: 760, textTransform: 'uppercase',
            }}>
              {page.h1}
            </h1>
            {page.intro.map((p, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-sans)', fontSize: 16,
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 620,
              }}>
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>
      </section>

      {/* ── ФОТО (masonry) ── */}
      <section style={{ position: 'relative' }}>
        <VerticalRevealLine left="50%" delay={150} color="rgba(255,255,255,0.18)" className="seo-vline" />
        <FadeIn delay={100}>
          <div className="seo-masonry" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 48, padding: '32px 60px 64px' }}>
            {page.images.map((src, i) => {
              const meta = SEO_IMAGE_META[src]
              return (
                <div key={src} className="seo-masonry-item" style={{ marginTop: i % 2 === 1 ? 56 : 0 }}>
                  <div style={{
                    position: 'relative', aspectRatio: i % 2 === 0 ? '4/3' : '16/11',
                    overflow: 'hidden', borderRadius: 16, background: '#2c2c2c', marginBottom: 20,
                  }}>
                    <Image
                      src={src}
                      alt={meta ? `${meta.title} — ${page.label}` : page.label}
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {meta && (
                    <>
                      <h3 style={{
                        fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700,
                        color: 'rgba(255,255,255,0.9)', margin: '0 0 8px',
                      }}>
                        {meta.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: 380,
                      }}>
                        {meta.desc}
                      </p>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </FadeIn>
        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── ПОЛНАЯ КОМПЛЕКТАЦИЯ (только на странице "дом под ключ с мебелью") ── */}
      {page.slug === 'dom-pod-klyuch-s-mebeliyu' && (
        <section style={{ position: 'relative' }}>
          <div className="page-hero-pad" style={{ padding: '64px 60px' }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E',
              margin: '0 0 12px',
            }}>
              Что входит в дом
            </p>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.15,
              margin: '0 0 24px', textTransform: 'uppercase',
            }}>
              Комплектация под ключ
            </h2>
            <SpecsAccordion sections={DETAILED_SECTIONS} />
          </div>
          <div style={{ padding: '0 24px' }}>
            <AnimatedLine length="100%" delay={100} />
          </div>
        </section>
      )}

      {/* ── ФОРМА ── */}
      <section style={{ position: 'relative' }}>
        <ContactSplit
          source={`seo-${page.slug}`}
          title="Обсудим ваш проект?"
          quoteText={page.h1}
        />
      </section>

      <style>{`
        @media (max-width: 700px) {
          .seo-masonry { grid-template-columns: 1fr !important; padding-left: 44px !important; padding-right: 44px !important; }
          .seo-masonry-item { margin-top: 0 !important; }
          .seo-vline { display: none !important; }
        }
      `}</style>
    </main>
  )
}
