import type { Metadata } from 'next'
import ProektyClient from '@/components/ProektyClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://build-x.pro'

const TITLE = 'Проекты домов под ключ — BuildX'
const DESC = 'Каталог проектов домов под ключ в Московской области: Mini, Midi, Maxi. Реальная цена и метраж на каждом проекте.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/proekty` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/proekty` },
  twitter: { title: TITLE, description: DESC },
}

export default function ProektyPage() {
  return <ProektyClient />
}
