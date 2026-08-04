'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/lib/types'
import { configToQuery } from '@/data/houseConfigurator'

const CATEGORY_LABEL: Record<string, string> = { mini: 'Mini', midi: 'Midi', maxi: 'Maxi' }

interface Props {
  project: Project
  /** Вместо страницы проекта — сразу в конструктор с его параметрами (этажи/спальни/гараж/спа). */
  toConfigurator?: boolean
}

export default function ProjectCard({ project, toConfigurator }: Props) {
  const [hovered, setHovered] = useState(false)
  const href = toConfigurator
    ? `/proekty/podbor-doma?${configToQuery(project)}`
    : `/proekty/${project.slug}`

  const specs = (
    <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
      {[
        { label: 'Площадь', value: `${project.area} м²` },
        { label: 'Спальни', value: String(project.bedrooms) },
        { label: 'Этажей', value: String(project.floors) },
      ].map(({ label, value }) => (
        <div key={label}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            {label}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: '#fff', marginTop: 2 }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )

  const priceRow = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 800, color: '#C9A96E' }}>
          {(project.priceFrom / 1_000_000).toFixed(1)} млн ₽
        </span>
      </div>
      {(project.garage || project.spa) && (
        <div style={{ display: 'flex', gap: 5 }}>
          {project.garage && (
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '3px 8px', borderRadius: 999,
            }}>
              Гараж
            </span>
          )}
          {project.spa && (
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '3px 8px', borderRadius: 999,
            }}>
              СПА
            </span>
          )}
        </div>
      )}
    </div>
  )

  return (
    <Link
      href={href}
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pc-image-box" style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        borderRadius: 16,
        background: '#ededea',
        cursor: 'pointer',
      }}>
        {project.images[0] ? (
          <Image
            src={project.images[0]} alt={project.name} fill
            style={{ objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #f0efed, #e8e6e3)',
          }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.25)' }}>
              Фото проекта
            </span>
          </div>
        )}

        {/* Category badge — always visible */}
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 2,
          background: 'rgba(26,26,26,0.75)', backdropFilter: 'blur(6px)',
          color: '#fff',
          fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
          letterSpacing: '1.2px', textTransform: 'uppercase',
          padding: '5px 11px', borderRadius: 999,
        }}>
          {CATEGORY_LABEL[project.category]}
        </div>

        {/* Info overlay — только для десктопа (наведение мышью). На тач-устройствах
            скрыт совсем: если контента много, position:absolute + overflow:hidden
            не гарантирует обрезку (браузерный баг с composited-слоями у transform),
            плашка может вылезти поверх соседней карточки. Поэтому на мобильном
            текст рендерится ниже обычным блоком (см. pc-info-static). */}
        <div className="pc-overlay" style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2,
          background: 'linear-gradient(to top, rgba(15,14,13,0.95) 0%, rgba(15,14,13,0.7) 70%, transparent 100%)',
          padding: '40px 20px 20px',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700,
            color: '#fff', marginBottom: 4,
          }}>
            {project.name}
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.65)',
            marginBottom: 14, lineHeight: 1.5,
          }}>
            {project.shortDesc}
          </p>
          {specs}
          {priceRow}
        </div>
      </div>

      {/* Инфо-блок под фото — на тач-устройствах виден всегда (в обычном потоке,
          не может ничего перекрыть, карточка просто растягивается под контент). */}
      <div className="pc-info-static" style={{
        display: 'none',
        background: '#1a1a1a',
        borderRadius: 16,
        padding: '18px 20px',
        marginTop: 12,
      }}>
        <h3 style={{
          fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700,
          color: '#fff', marginBottom: 4,
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.65)',
          marginBottom: 14, lineHeight: 1.5,
        }}>
          {project.shortDesc}
        </p>
        {specs}
        {priceRow}
      </div>

      <style>{`
        @media (hover: none) {
          .pc-overlay { display: none !important; }
          .pc-info-static { display: block !important; margin-top: 0 !important; border-radius: 0 0 16px 16px !important; }
          .pc-image-box { border-radius: 16px 16px 0 0 !important; }
        }
      `}</style>
    </Link>
  )
}
