import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getProject } from '@/data/projects'
import { bedroomsWord } from '@/lib/pluralize'
import ContactForm from '@/components/ContactForm'
import ProjectCard from '@/components/ProjectCard'
import ProjectHeroMedia from '@/components/ProjectHeroMedia'
import ZoomableImage from '@/components/ZoomableImage'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'
  return {
    title: `${project.name} — ${project.area} м², ${project.floors} эт. | BuildX`,
    description: project.shortDesc,
    alternates: { canonical: `${SITE_URL}/proekty/${slug}` },
  }
}

const CAT: Record<string, string> = { mini: 'Mini', midi: 'Midi', maxi: 'Maxi' }

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const related = projects.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <main style={{ background: '#1a1a1a', paddingTop: 56 }}>

      {/* ══ БЛОК 1: HERO ВИДЕО ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'calc(100vh - 72px)', minHeight: 560, overflow: 'hidden' }}>

        <ProjectHeroMedia
          video={project.video}
          image={project.images[0]}
          alt={project.name}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15,15,15,0.97) 0%, rgba(15,15,15,0.45) 45%, rgba(15,15,15,0.1) 100%)',
        }} />

        {/* Breadcrumb — top */}
        <nav style={{ position: 'absolute', top: 28, left: 60, zIndex: 2, display: 'flex', gap: 8, alignItems: 'center' }}>
          {[
            { label: 'Главная', href: '/' },
            { label: 'Проекты', href: '/proekty' },
            { label: project.name, href: '' },
          ].map(({ label, href }, i) => (
            <span key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>/</span>}
              {href
                ? <Link href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{label}</Link>
                : <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{label}</span>
              }
            </span>
          ))}
        </nav>

        {/* Project info — bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 60px 56px', zIndex: 2 }}>
          <span style={{
            display: 'inline-block', marginBottom: 20,
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.85)', padding: '6px 14px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            {CAT[project.category]}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(40px, 6vw, 88px)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.0, margin: '0 0 16px',
            letterSpacing: '-1px',
          }}>
            {project.name}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 700, color: '#C9A96E', margin: 0 }}>
            от {(project.priceFrom / 1_000_000).toFixed(1)} млн ₽
          </p>
        </div>
      </section>

      {/* ══ БЛОК 2: STATS + РУМТУР ══════════════════════════════════════ */}
      <section style={{
        background: '#0f0f0f',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {[
              { label: 'Площадь', value: `${project.area} м²` },
              { label: 'Этажей', value: String(project.floors) },
              { label: 'Срок строительства', value: project.buildTime },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: '#fff' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Room tour button */}
          <Link href={`/proekty/${slug}/tour`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.5px', color: '#fff',
            border: '1px solid rgba(255,255,255,0.22)',
            padding: '13px 28px', borderRadius: 999,
            transition: 'border-color 0.2s',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            Продолжить румтур
          </Link>
        </div>
      </section>

      {/* ══ БЛОК 3: ИНФОРМАЦИЯ ══════════════════════════════════════════ */}
      <section style={{ background: '#242424', padding: '80px 60px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 80, maxWidth: 1200, margin: '0 auto' }} className="proj-grid">

          {/* ── LEFT ── */}
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 56 }}>
              {project.shortDesc}
            </p>

            {/* Gallery (доп. фото) */}
            {project.images.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 64 }}>
                {project.images.slice(1).map((src, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 8, background: '#2c2c2c' }}>
                    <ZoomableImage src={src} alt={`${project.name} ${i + 2}`} sizes="(max-width:900px) 50vw, 30vw" objectFit="cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Планировка */}
            {project.floorPlan && (
              <div style={{ marginBottom: 56 }}>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>
                  Планировка
                </h2>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 10, overflow: 'hidden', background: '#2c2c2c' }}>
                  <ZoomableImage src={project.floorPlan} alt={`Планировка ${project.name}`} sizes="(max-width:900px) 100vw, 60vw" />
                </div>
              </div>
            )}

            {/* Параметры дома */}
            <div style={{ marginBottom: 56 }}>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>
                Параметры
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  `${project.area} м² общей площади`,
                  `${project.floors === 1 ? 'Один этаж' : 'Два этажа'}`,
                  `${project.bedrooms} ${bedroomsWord(project.bedrooms)}`,
                  project.garage ? 'Закрытый гараж на 1–2 машины' : 'Без гаража',
                  project.spa ? 'СПА-зона с сауной и хаммамом' : null,
                  `Срок строительства — ${project.buildTime}`,
                ].filter((x): x is string => Boolean(x)).map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                    <span style={{ color: '#C9A96E', flexShrink: 0, marginTop: 1 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA в конструктор */}
            <div style={{ marginBottom: 56, background: '#2c2c2c', borderRadius: 10, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: 8 }}>
                Хотите изменить комплектацию?
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 20 }}>
                Добавьте или уберите спальни, СПА-зону, гараж — соберите свой вариант в конструкторе.
              </p>
              <Link href="/podbor-doma" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.5px', color: '#C9A96E',
                borderBottom: '1px solid rgba(201,169,110,0.4)', paddingBottom: 2,
              }}>
                Открыть конструктор →
              </Link>
            </div>

            {/* Back link */}
            <Link href="/proekty" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2 }}>
              ← Все проекты
            </Link>
          </div>

          {/* ── RIGHT (sticky) ── */}
          <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '36px 32px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>
                Цена от
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 38, fontWeight: 800, color: '#C9A96E', lineHeight: 1, marginBottom: 8 }}>
                {(project.priceFrom / 1_000_000).toFixed(1)} млн ₽
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.25)', marginBottom: 32, lineHeight: 1.5 }}>
                Окончательная цена — после расчёта сметы.<br />Без скрытых доплат.
              </p>
              <ContactForm source={`project:${project.slug}`} buttonLabel="Узнать точную цену" dark />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ПОХОЖИЕ ПРОЕКТЫ ═════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section style={{ background: '#1a1a1a', padding: '80px 60px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 32 }}>
            Другие проекты
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {related.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </section>
      )}

    </main>
  )
}
