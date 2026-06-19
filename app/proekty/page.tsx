'use client'

import { useState, useMemo } from 'react'
import ProjectCard from '@/components/ProjectCard'
import Breadcrumb from '@/components/Breadcrumb'
import { projects } from '@/data/projects'
import { ProjectCategory, ProjectFinish } from '@/lib/types'
import AnimatedLine from '@/components/AnimatedLine'
import VerticalRevealLine from '@/components/VerticalRevealLine'
import SectionLines from '@/components/SectionLines'
import FadeIn from '@/components/FadeIn'

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
    <main style={{ paddingTop: 56, minHeight: '100vh', position: 'relative' }}>
      <SectionLines />
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Проекты' }]} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn>
          <div style={{ padding: '64px 60px 40px' }}>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', marginBottom: 14,
              textTransform: 'uppercase', lineHeight: 1.1,
            }}>
              Наши проекты
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 16,
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, maxWidth: 560, margin: 0,
            }}>
              Современные дома под ключ в Московской области — Mini, Midi, Maxi.
            </p>
          </div>
        </FadeIn>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={100} />
        </div>

        {/* Фильтры */}
        <FadeIn delay={120}>
          <div style={{
            padding: '28px 60px 28px',
            display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: 11,
                color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1px',
              }}>Размер</span>
              {CATEGORIES.map(({ value, label }) => (
                <button key={label} onClick={() => setCat(value)} style={BtnSt(cat === value)}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: 11,
                color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '1px',
              }}>Отделка</span>
              {FINISHES.map(({ value, label }) => (
                <button key={label} onClick={() => setFin(value)} style={BtnSt(fin === value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <div style={{ padding: '0 24px' }}>
          <AnimatedLine length="100%" delay={200} />
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ position: 'relative' }}>
        <FadeIn delay={100}>
          <div style={{ padding: '20px 24px 80px', position: 'relative' }}>
            {filtered.length > 0 ? (
              <>
                <VerticalRevealLine left="50%" delay={200} color="rgba(255,255,255,0.18)" />
                {Array.from({ length: Math.ceil(filtered.length / 2) }, (_, rowIdx) => {
                  const row = filtered.slice(rowIdx * 2, rowIdx * 2 + 2)
                  return (
                    <div key={rowIdx}>
                      {rowIdx > 0 && (
                        <AnimatedLine length="100%" delay={rowIdx * 80} color="rgba(255,255,255,0.18)" />
                      )}
                      <div className="proekty-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        columnGap: 16,
                        padding: '16px 20px',
                      }}>
                        {row.map(p => <ProjectCard key={p.slug} project={p} />)}
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.35)', paddingTop: 40 }}>
                Проекты не найдены. Попробуйте изменить фильтры.
              </p>
            )}
          </div>
        </FadeIn>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .proekty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
