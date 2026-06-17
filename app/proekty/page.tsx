'use client'

import { useState, useMemo } from 'react'
import ProjectCard from '@/components/ProjectCard'
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

export default function ProektyPage() {
  const [cat, setCat] = useState<'' | ProjectCategory>('')
  const [fin, setFin] = useState<'' | ProjectFinish>('')

  const filtered = useMemo(() => projects.filter(p => {
    if (cat && p.category !== cat) return false
    if (fin && !p.finish.includes(fin)) return false
    return true
  }), [cat, fin])

  return (
    <main style={{ paddingTop: 72 }}>
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
            Портфолио
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 12 }}>
            Наши проекты
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(26,26,26,0.52)', marginBottom: 48, lineHeight: 1.6, maxWidth: 600 }}>
            Современные дома с плоской кровлей и панорамным остеклением. Строительство под ключ в Московской области.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 44 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Размер:</span>
              {CATEGORIES.map(({ value, label }) => (
                <button key={label} onClick={() => setCat(value)} style={{
                  background: cat === value ? '#1a1a1a' : '#fff',
                  border: `1px solid ${cat === value ? '#1a1a1a' : 'rgba(0,0,0,0.14)'}`,
                  color: cat === value ? '#fff' : 'rgba(26,26,26,0.7)',
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: cat === value ? 700 : 400,
                  padding: '7px 18px', borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Отделка:</span>
              {FINISHES.map(({ value, label }) => (
                <button key={label} onClick={() => setFin(value)} style={{
                  background: fin === value ? '#1a1a1a' : '#fff',
                  border: `1px solid ${fin === value ? '#1a1a1a' : 'rgba(0,0,0,0.14)'}`,
                  color: fin === value ? '#fff' : 'rgba(26,26,26,0.7)',
                  fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: fin === value ? 700 : 400,
                  padding: '7px 18px', borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {filtered.length > 0 ? (
          <div style={{ padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {filtered.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(26,26,26,0.4)', padding: '40px 0' }}>
              Проекты не найдены. Попробуйте изменить фильтры.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
