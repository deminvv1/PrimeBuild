/**
 * Русское склонение существительного по числу: 1 спальня, 2 спальни, 5 спален.
 * Правило: 11–14 всегда "many", иначе смотрим на последнюю цифру
 * (1 → one, 2–4 → few, 0/5–9 → many).
 */
export function pluralizeRu(count: number, one: string, few: string, many: string): string {
  const abs = Math.abs(count) % 100
  const last = abs % 10
  if (abs > 10 && abs < 20) return many
  if (last === 1) return one
  if (last >= 2 && last <= 4) return few
  return many
}

export function bedroomsWord(count: number): string {
  return pluralizeRu(count, 'спальня', 'спальни', 'спален')
}
