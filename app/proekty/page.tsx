'use client'

import { useState, useMemo } from 'react'
import ProjectCard from '@/components/ProjectCard'
import Breadcrumb from '@/components/Breadcrumb'
import { projects } from '@/data/projects'
import { ProjectCategory, ProjectFinish } from '@/lib/types'

const CATEGORIES: { value: '' | ProjectCategory; label: string }[] = [
  { value: '', label: 'Все' },
  { value: 'mini', label: 'Mini' },
  { value: 'midi', label: 'Midi' },
  { value: 'maxi', label: 'Maxi' },
]

const FINISHES: { value: '' | ProjectFinish; label: string }[] = [
  { value: '', label: 'Все' },
  { value: 'comfort', label: 'Комфорт' },
  { value: 'business', label: 'Бизнес' },
]

const BtnSt = (active: boolean): React.CSSProperties => ({
  background: active ? '#C9A96E' : 'rgba(255,255,255,0.06)',
  border: `1px solid ${active ? '#C9A96E' : 'rgba(255,255,255,0.12)'}`,
  color: active ? '#1a1a1a' : 'rgba(255,255,255,0.65)',
  fontFamily: 'var(--font-sans)',
  fontSize: 13,
  fontWeight: active ? 700 : 400,
  padding: '7px 18px',
  borderRadius: 999,
  cursor: 'pointer',
  transition: 'all 0.15s',
})

export default function ProektyPage() {
  const [cat, setCat] = useState<'' | ProjectCategory>('')
  const [fin, setFin] = useState<'' | ProjectFinish>('')

  const filtered = useMemo(() => projects.filter(p => {
    if (cat && p.category !== cat) return false
    if (fin && !p.finish.includes(fin)) return false
    return true
  }), [cat, fin])

  return (
    <main style={{ paddingTop: 56, background: '#242424', minHeight: '100vh' }}>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Проекты' }]} />

      {/* ── HERO ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 48px' }}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'rgba(255,255,255,0.92)', marginBottom: 12 }}>
          Наши проекты
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: 48, lineHeight: 1.6, maxWidth: 600 }}>
          Современные дома под ключ в Московской области — Mini, Midi, Maxi.
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: "space-between" }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Размер</span>
            {CATEGORIES.map(({ value, label }) => (
              <button key={label} onClick={() => setCat(value)} style={BtnSt(cat === value)}>
                {label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Отделка</span>
            {FINISHES.map(({ value, label }) => (
              <button key={label} onClick={() => setFin(value)} style={BtnSt(fin === value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div style={{ padding: '0 24px 80px' }}>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {filtered.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.35)', paddingTop: 40 }}>
            Проекты не найдены. Попробуйте изменить фильтры.
          </p>
        )}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .proekty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
