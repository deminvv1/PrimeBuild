import type { Metadata } from 'next'
import ProektyClient from '@/components/ProektyClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

export const metadata: Metadata = {
  title: 'Проекты домов под ключ — BuildX',
  description: 'Каталог проектов домов под ключ в Московской области: Mini, Midi, Maxi. Реальная цена и метраж на каждом проекте.',
  alternates: { canonical: `${SITE_URL}/proekty` },
}

export default function ProektyPage() {
  return <ProektyClient />
}
