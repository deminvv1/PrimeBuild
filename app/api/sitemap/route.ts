import { NextResponse } from 'next/server'
import { projects } from '@/data/projects'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const revalidate = 0

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0]

  const staticPages = [
    { path: '',              changeFreq: 'weekly' },
    { path: '/proekty',     changeFreq: 'weekly' },
    { path: '/kalkulyator', changeFreq: 'monthly' },
    { path: '/o-kompanii',  changeFreq: 'monthly' },
    { path: '/otzyvy',      changeFreq: 'weekly' },
    { path: '/kontakty',    changeFreq: 'monthly' },
  ]

  const projectPages = projects.map(p => ({
    path: `/proekty/${p.slug}`,
    changeFreq: 'monthly',
  }))

  const allPages = [...staticPages, ...projectPages]

  const urls = allPages.map(({ path, changeFreq }) => {
    const loc = path ? `${SITE_URL}${path}` : SITE_URL
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
  </url>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
