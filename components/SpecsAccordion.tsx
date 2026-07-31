'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { DescriptionSection } from '@/data/houseDescription'

function SectionBlock({ section }: { section: DescriptionSection }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#C9A96E',
          margin: '0 0 16px',
        }}
      >
        {section.title}
      </h2>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {section.items.map((item, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              marginBottom: 12,
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>—</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SpecsAccordion({ sections }: { sections: DescriptionSection[] }) {
  const [open, setOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(4000)
  const contentRef = useRef<HTMLDivElement>(null)

  // Первая секция видна сразу (не только за аккордеоном) — так у поисковиков
  // есть заведомо проиндексированный видимый текст, а не только скрытый до клика.
  const [firstSection, ...restSections] = sections

  useLayoutEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight)
  }, [])

  return (
    <div style={{ maxWidth: 760 }}>
      {firstSection && <SectionBlock section={firstSection} />}

      {restSections.length > 0 && (
        <>
          <div
            style={{
              maxHeight: open ? contentHeight : 0,
              opacity: open ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.6s cubic-bezier(0.65,0,0.35,1), opacity 0.5s ease',
            }}
          >
            <div ref={contentRef}>
              {restSections.map((section) => (
                <SectionBlock key={section.title} section={section} />
              ))}
            </div>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.3px',
              color: '#C9A96E',
              padding: 0,
            }}
          >
            {open ? 'Свернуть' : 'Показать всю комплектацию'}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
