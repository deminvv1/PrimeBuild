import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getProject } from '@/data/projects'
import ContactForm from '@/components/ContactForm'
import ProjectCard from '@/components/ProjectCard'

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
    title: `${project.name} — ${project.area} м², ${project.floors} эт. | PrimeBuild`,
    description: project.shortDesc,
    alternates: { canonical: `${SITE_URL}/proekty/${slug}` },
  }
}

const S = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const related = projects.filter(p => p.slug !== slug && p.category === project.category).slice(0, 3)

  return (
    <main style={{ paddingTop: 72 }}>

      {/* Breadcrumb */}
      <div style={{ ...S, paddingTop: 24, paddingBottom: 8 }}>
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[{ label: 'Главная', href: '/' }, { label: 'Проекты', href: '/proekty' }, { label: project.name, href: '' }].map(({ label, href }, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ color: 'rgba(0,0,0,0.2)' }}>/</span>}
              {href ? (
                <Link href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.45)' }}>{label}</Link>
              ) : (
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Gallery */}
      <section style={{ padding: '16px 0 0' }}>
        <div style={S}>
          {project.images.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: project.images.length > 1 ? '2fr 1fr' : '1fr', gap: 8, borderRadius: 10, overflow: 'hidden' }}>
              {project.images.map((src, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: i === 0 ? '16/9' : '4/3', background: '#ededea' }}>
                  <Image src={src} alt={`${project.name} фото ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ height: 400, background: '#f2f1ee', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.25)' }}>Фотографии появятся после съёмки</span>
            </div>
          )}
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '56px 0 80px' }}>
        <div style={{ ...S, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 64 }} className="project-grid">
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <span style={{
                background: '#1a1a1a', color: '#fff',
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '1px',
                padding: '4px 10px', borderRadius: 3,
              }}>
                {project.category.toUpperCase()}
              </span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>
              {project.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(26,26,26,0.58)', lineHeight: 1.7, marginBottom: 40 }}>
              {project.shortDesc}
            </p>

            {/* Characteristics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, marginBottom: 48 }}>
              {[
                { label: 'Площадь', value: `${project.area} м²` },
                { label: 'Этажей', value: project.floors },
                { label: 'Срок', value: project.buildTime },
                { label: 'Цена от', value: `${(project.priceFrom / 1_000_000).toFixed(1)} млн ₽` },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: '#242424', padding: '16px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(26,26,26,0.38)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: '#C9A96E' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Finish options */}
            {project.finish.length > 1 && (
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 24 }}>Варианты отделки</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {project.finish.map(f => (
                    <div key={f} style={{ background: '#fff', padding: '24px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.08)' }}>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: '#C9A96E', marginBottom: 12 }}>
                        {f === 'comfort' ? 'Комфорт' : 'Бизнес'}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(26,26,26,0.55)', lineHeight: 1.6, marginBottom: 16 }}>
                        {f === 'comfort' ? project.comfortDesc : project.businessDesc}
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {(f === 'comfort' ? project.comfortIncludes : project.businessIncludes).map(item => (
                          <li key={item} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#1a1a1a', display: 'flex', gap: 8 }}>
                            <span style={{ color: '#C9A96E', flexShrink: 0 }}>✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Floor plan */}
            {project.floorPlan && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Планировка</h2>
                <div style={{ position: 'relative', background: '#242424', borderRadius: 10, overflow: 'hidden', maxWidth: 500, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Image src={project.floorPlan} alt={`Планировка ${project.name}`} width={500} height={400} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 90, alignSelf: 'start' }}>
            <div style={{ background: '#242424', borderRadius: 12, padding: '32px 28px', border: '1px solid rgba(0,0,0,0.07)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.4)', marginBottom: 4 }}>Цена от</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 800, color: '#C9A96E', marginBottom: 8 }}>
                {(project.priceFrom / 1_000_000).toFixed(1)} млн ₽
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.38)', marginBottom: 28, lineHeight: 1.5 }}>
                Окончательная цена — после расчёта сметы. Без скрытых доплат.
              </p>
              <ContactForm source={`project:${project.slug}`} buttonLabel="Узнать точную цену" />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '80px 0', background: '#242424' }}>
          <div style={S}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 32 }}>
              Похожие проекты
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {related.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        </section>
      )}

      <style>{`@media(max-width:900px){.project-grid{grid-template-columns:1fr!important;}}`}</style>
    </main>
  )
}
