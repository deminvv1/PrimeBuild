'use client'

import { useState } from 'react'
import { COMPLECTATION_SHORT, COMPLECTATION_FINISH, COMPLECTATION_FURNITURE } from '@/data/complectation'

const H2: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(28px, 4vw, 40px)',
  fontWeight: 800,
  color: 'rgba(255,255,255,0.92)',
  lineHeight: 1.15,
  margin: 0,
  textTransform: 'uppercase',
}

const SUBHEAD: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#C9A96E',
  margin: '0 0 20px',
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item) => (
        <li key={item} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
          <span style={{ color: '#C9A96E', flexShrink: 0, marginTop: 1 }}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ComplectationSection() {
  const [open, setOpen] = useState(false)

  return (
    <div className="page-hero-pad" style={{ padding: '64px 60px 40px' }}>
      <h2 style={{ ...H2, marginBottom: 20 }}>Комплектация</h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: 760, margin: '0 0 20px' }}>
        {COMPLECTATION_SHORT}
      </p>

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
          letterSpacing: '0.5px', color: '#C9A96E',
          borderBottom: '1px solid rgba(201,169,110,0.4)', paddingBottom: 2,
        }}
        aria-expanded={open}
      >
        {open ? 'Скрыть подробное описание' : 'Показать подробное описание'}
        <span style={{ display: 'inline-block', transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>

      {open && (
        <div style={{ marginTop: 32, maxWidth: 760 }}>
          <p style={SUBHEAD}>Чистовая отделка</p>
          <List items={COMPLECTATION_FINISH} />
          <p style={SUBHEAD}>Мебель включает</p>
          <List items={COMPLECTATION_FURNITURE} />
        </div>
      )}
    </div>
  )
}
