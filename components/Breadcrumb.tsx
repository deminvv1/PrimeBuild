import Link from 'next/link'
import { breadcrumbJsonLd } from '@/lib/jsonLd'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = breadcrumbJsonLd(items.map(({ label, href }) => ({ name: label, href })))

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <nav aria-label="breadcrumb" style={{
      // background: '#1a1a1a',
      // borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '14px clamp(24px, 5vw, 60px)',
    }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 8, listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
        {items.map(({ label, href }, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && (
              <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12, userSelect: 'none' }}>/</span>
            )}
            {href
              ? <Link href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.3px' }}>{label}</Link>
              : <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.3px' }}>{label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
    </>
  )
}
