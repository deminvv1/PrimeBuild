'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'
import {
  HouseConfig,
  calculatePrice,
  formatPrice,
  getBedroomsRange,
  getCatalogEntry,
  getPlanImages,
} from '@/data/houseConfigurator'

const GOLD_SHIMMER: React.CSSProperties = {
  background: 'linear-gradient(105deg, #b8924a 0%, #C9A96E 28%, #f5e4aa 50%, #C9A96E 72%, #b8924a 100%)',
  backgroundSize: '250% 100%',
  animation: 'btn-gold-shimmer 3.5s linear infinite',
}

const LABEL: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-sans)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 14,
}

function OptionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="opt-group" style={{ paddingBottom: 28, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <span style={LABEL}>{label}</span>
      {children}
    </div>
  )
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 600,
        color: active ? '#1a1a1a' : 'rgba(255,255,255,0.7)',
        background: active ? '#C9A96E' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${active ? '#C9A96E' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 999,
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  )
}

function ToggleRow({
  title,
  desc,
  value,
  onChange,
}: {
  title: string
  desc: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        width: '100%',
        background: 'none',
        border: 'none',
        padding: '14px 0',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
          {title}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
          {desc}
        </p>
      </div>
      <span
        style={{
          flexShrink: 0,
          width: 44,
          height: 26,
          borderRadius: 999,
          background: value ? '#C9A96E' : 'rgba(255,255,255,0.12)',
          position: 'relative',
          transition: 'background 0.25s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: value ? 21 : 3,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: value ? '#1a1a1a' : '#fff',
            transition: 'left 0.25s ease',
          }}
        />
      </span>
    </button>
  )
}

interface Props {
  config: HouseConfig
  onChange: (config: HouseConfig) => void
}

export default function HouseConfigurator({ config, onChange }: Props) {
  const [planIndex, setPlanIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const price = useMemo(() => calculatePrice(config), [config])
  const entry = useMemo(() => getCatalogEntry(config), [config])
  const plans = useMemo(() => getPlanImages(config), [config])
  const bedroomsRange = useMemo(() => getBedroomsRange(config.floors), [config.floors])

  const set = <K extends keyof HouseConfig>(key: K, value: HouseConfig[K]) => {
    let next: HouseConfig = { ...config, [key]: value }
    if (key === 'floors') {
      const range = getBedroomsRange(value as 1 | 2)
      next = { ...next, bedrooms: Math.min(Math.max(next.bedrooms, range.min), range.max) }
    }
    setPlanIndex(0)
    onChange(next)
  }

  const activePlan = plans[Math.min(planIndex, plans.length - 1)]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        position: 'relative',
      }}
      className="konstruktor-grid"
    >
      {/* ── ЛЕВАЯ КОЛОНКА: ОПЦИИ ── */}
      <div style={{ padding: '48px 60px 48px 60px' }} className="konstruktor-left">
        <OptionGroup label="Количество этажей">
          <div style={{ display: 'flex', gap: 12 }}>
            <PillButton active={config.floors === 1} onClick={() => set('floors', 1)}>1 этаж</PillButton>
            <PillButton active={config.floors === 2} onClick={() => set('floors', 2)}>2 этажа</PillButton>
          </div>
        </OptionGroup>

        <OptionGroup label="Количество спален">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              onClick={() => set('bedrooms', Math.max(bedroomsRange.min, config.bedrooms - 1))}
              style={stepperBtnSt}
              aria-label="Меньше спален"
            >
              −
            </button>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: '#fff', minWidth: 24, textAlign: 'center' }}>
              {config.bedrooms}
            </span>
            <button
              onClick={() => set('bedrooms', Math.min(bedroomsRange.max, config.bedrooms + 1))}
              style={stepperBtnSt}
              aria-label="Больше спален"
            >
              +
            </button>
          </div>
        </OptionGroup>

        <OptionGroup label="Комплектация">
          <div style={{ display: 'flex', gap: 12 }}>
            <PillButton active={config.furniture} onClick={() => set('furniture', true)}>С мебелью</PillButton>
            <PillButton active={!config.furniture} onClick={() => set('furniture', false)}>Без мебели</PillButton>
          </div>
        </OptionGroup>

        <OptionGroup label="Дополнительные комплектации">
          <ToggleRow
            title="СПА-зона"
            desc="Бассейн, сауна или хаммам на отдельной площади"
            value={config.spa}
            onChange={(v) => set('spa', v)}
          />
          <ToggleRow
            title="Гараж"
            desc="Закрытый гараж на 1–2 машины"
            value={config.garage}
            onChange={(v) => set('garage', v)}
          />
        </OptionGroup>

        <div>
          <span style={LABEL}>Уже включено в планировку</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Мастер-спальня с собственной ванной и гардеробной',
              'Гостевые спальни с гардеробной',
              'Навес над террасой',
              'Навес на 2 машины',
              'Хозяйственный блок',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                <span style={{ color: '#C9A96E', flexShrink: 0, marginTop: 1 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── ПРАВАЯ КОЛОНКА: ПЛАНИРОВКА + ЦЕНА ── */}
      <div style={{ position: 'sticky', top: 80, alignSelf: 'start', padding: '48px 60px 64px 48px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }} className="konstruktor-right">
        <div style={{ maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
        <div
          onClick={() => activePlan?.src && setLightboxOpen(true)}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '6/5',
            background: '#f5f3ef',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: plans.length > 1 ? 12 : 32,
            cursor: activePlan?.src ? 'zoom-in' : 'default',
          }}
        >
          {activePlan?.src ? (
            <Image src={activePlan.src} alt={activePlan.label} fill sizes="50vw" style={{ objectFit: 'contain' }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(26,26,26,0.35)', textAlign: 'center' }}>
                {activePlan?.label}
              </span>
            </div>
          )}
        </div>

        {lightboxOpen && activePlan?.src && (
          <ImageLightbox images={[{ src: activePlan.src, alt: activePlan.label }]} index={0} onIndexChange={() => {}} onClose={() => setLightboxOpen(false)} />
        )}

        {plans.length > 1 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
            {plans.map((p, i) => (
              <button
                key={i}
                onClick={() => setPlanIndex(i)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 999,
                  border: `1px solid ${i === planIndex ? '#C9A96E' : 'rgba(255,255,255,0.12)'}`,
                  background: i === planIndex ? 'rgba(201,169,110,0.12)' : 'transparent',
                  color: i === planIndex ? '#C9A96E' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <span style={{ ...LABEL, marginBottom: 8 }}>Стоимость · {entry.area} м²</span>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 800, color: '#fff', margin: 0 }}>
              от {formatPrice(price)} ₽
            </p>
          </div>
        </div>

        <button
          onClick={() => document.getElementById('podbor-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          style={{
            ...GOLD_SHIMMER,
            width: '100%',
            color: '#1a1a1a',
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            padding: '18px 0',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
          }}
          className="btn-glow-gold"
        >
          Получить точный расчёт
        </button>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 14 }}>
          Ориентировочная цена — уточняется архитектором
        </p>
        </div>
      </div>

      <style>{`
        /* левый край строго до рамки SectionLines (offset 24px), правый — до центральной вертикальной линии */
        .opt-group { margin-left: -36px; margin-right: -60px; padding-left: 36px; padding-right: 60px; }
        @media (max-width: 900px) {
          .konstruktor-grid { grid-template-columns: 1fr !important; }
          .konstruktor-vline { display: none !important; }
          .konstruktor-left { padding: 32px 44px !important; }
          .konstruktor-right { position: static !important; padding: 0 44px 40px !important; }
          .opt-group { margin-left: -44px !important; margin-right: -44px !important; padding-left: 44px !important; padding-right: 44px !important; }
        }
      `}</style>
    </div>
  )
}

const stepperBtnSt: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.06)',
  color: '#fff',
  fontSize: 18,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
