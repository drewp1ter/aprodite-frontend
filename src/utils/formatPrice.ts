export function formatPrice(price: string): string {
  return parseInt(price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })
}