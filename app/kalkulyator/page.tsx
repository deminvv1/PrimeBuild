import type { Metadata } from 'next'
import QuizCalculator from '@/components/QuizCalculator'
import Breadcrumb from '@/components/Breadcrumb'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'Калькулятор стоимости дома — BuildX',
  description: 'Рассчитайте стоимость дома под ключ в Московской области за 3 минуты.',
  alternates: { canonical: `${SITE_URL}/kalkulyator` },
}

export default function KalkulyatorPage() {
  return (
    <main style={{ paddingTop: 56 }}>
      <Breadcrumb items={[{ label: 'Главная', href: '/' }, { label: 'Калькулятор' }]} />
      <QuizCalculator />
    </main>
  )
}
