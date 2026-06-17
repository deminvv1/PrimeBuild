const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: 'PrimeBuild',
  url: SITE_URL,
  telephone: 'TODO: +7 (XXX) XXX-XX-XX',
  email: 'TODO: info@company.ru',
  description: 'TODO: Описание компании',
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

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}
