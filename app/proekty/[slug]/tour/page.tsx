import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { projects, getProject } from '@/data/projects'
import Breadcrumb from '@/components/Breadcrumb'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `Румтур — ${project.name} | PrimeBuild`,
  }
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <main style={{ background: '#0f0f0f', minHeight: '100vh', paddingTop: 56, display: 'flex', flexDirection: 'column' }}>

      <Breadcrumb items={[
        { label: 'Главная', href: '/' },
        { label: 'Проекты', href: '/proekty' },
        { label: project.name, href: `/proekty/${slug}` },
        { label: 'Виртуальный тур' },
      ]} />

      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '60px 24px 80px',
      }}>
        {/* 360° иконка */}
        <div style={{
          width: 96, height: 96,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 40,
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 }}>
          {project.name}
        </p>

        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.1, marginBottom: 20, maxWidth: 540 }}>
          Виртуальный тур в разработке
        </h1>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 56, maxWidth: 420 }}>
          Мы снимаем 360° тур по этому проекту. Скоро вы сможете виртуально пройти по каждой комнате.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href={`/proekty/${slug}`} style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            color: '#1a1a1a', background: '#C9A96E',
            padding: '14px 32px', borderRadius: 999,
            letterSpacing: '0.5px',
          }}>
            ← Вернуться к проекту
          </Link>
          <Link href="/proekty" style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            color: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '14px 32px', borderRadius: 999,
            letterSpacing: '0.5px',
          }}>
            Все проекты
          </Link>
        </div>
      </div>
    </main>
  )
}
