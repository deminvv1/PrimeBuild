const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: 'BuildX',
  url: SITE_URL,
  telephone: '+7-985-933-01-21',
  email: 'Mail@vvsamohin.ru',
  description: 'Строительная компания в Московской области. Строим дома под ключ за 6 месяцев с фиксированной ценой в договоре и независимым технадзором.',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Московская область',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Московская область',
    addressCountry: 'RU',
  },
  priceRange: '₽₽₽',
}

export function breadcrumbJsonLd(items: { name: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }
}
