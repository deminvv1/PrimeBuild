export function digitsOnly(v: string): string {
  return (v || '').replace(/\D/g, '')
}

/** Форматирует ввод по мере набора в вид +7 (999) 999-99-99. 8 → 7 автоматически. */
export function formatRuPhone(val: string): string {
  let d = digitsOnly(val)
  if (d[0] === '8') d = '7' + d.slice(1)
  if (d[0] === '9') d = '7' + d
  if (d.length > 11) d = d.slice(0, 11)
  if (d[0] !== '7') return '+7'
  const p = d.slice(1)
  let out = '+7'
  if (p.length > 0) out += ' (' + p.slice(0, 3)
  if (p.length >= 3) out += ')'
  if (p.length > 3) out += ' ' + p.slice(3, 6)
  if (p.length > 6) out += '-' + p.slice(6, 8)
  if (p.length > 8) out += '-' + p.slice(8, 10)
  return out
}

/** +7, всего 11 цифр: +7 (999) 999-99-99 */
export function isValidRuPhone(v: string): boolean {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(v)
}
